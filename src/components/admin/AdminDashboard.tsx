import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  X,
  Loader2,
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Lead, Project } from '@/lib/types';
import { AdminLogin } from './AdminLogin';

type Tab = 'leads' | 'projects';

export function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);

  const checkAuth = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    setAuthed(!!data.session);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!authed) return;
    fetchData();
  }, [authed]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, projectsRes] = await Promise.all([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('projects').select('*').order('sort_order', { ascending: true }),
      ]);
      if (leadsRes.data) setLeads(leadsRes.data as Lead[]);
      if (projectsRes.data) setProjects(projectsRes.data as Project[]);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAuthed(false);
  };

  const updateLeadStatus = async (id: string, status: string) => {
    await supabase.from('leads').update({ status }).eq('id', id);
    setLeads((l) => l.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
    setSelectedLead((sl) => (sl?.id === id ? { ...sl, status } : sl));
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this lead?')) return;
    await supabase.from('leads').delete().eq('id', id);
    setLeads((l) => l.filter((lead) => lead.id !== id));
    setSelectedLead(null);
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await supabase.from('projects').delete().eq('id', id);
    setProjects((p) => p.filter((proj) => proj.id !== id));
  };

  const exportLeads = () => {
    const headers = ['Name', 'Phone', 'Email', 'Location', 'Project Type', 'Budget', 'Requirement', 'Status', 'Date'];
    const rows = leads.map((l) => [
      l.full_name,
      l.phone,
      l.email || '',
      l.location || '',
      l.project_type || '',
      l.budget || '',
      (l.requirement || '').replace(/"/g, '""'),
      l.status,
      new Date(l.created_at).toLocaleString(),
    ]);
    const csv = [
      headers.join(','),
      ...rows.map((r) => r.map((c) => `"${c}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />;

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  return (
    <div className="min-h-screen bg-ink-950">
      {/* Top bar */}
      <div className="glass sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-serif text-xl text-gradient-gold">DSA</span>
          <span className="text-xs tracking-[0.2em] uppercase text-cream-300/40 hidden sm:block">
            Admin Dashboard
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-xs tracking-[0.15em] uppercase text-cream-300/50 hover:text-gold-400 transition-colors hidden sm:block"
          >
            View Website
          </a>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-cream-300/50 hover:text-red-400 transition-colors"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <TabButton
            active={tab === 'leads'}
            onClick={() => setTab('leads')}
            icon={<LayoutDashboard size={16} />}
            label="Leads"
            badge={newLeadsCount}
          />
          <TabButton
            active={tab === 'projects'}
            onClick={() => setTab('projects')}
            icon={<FolderKanban size={16} />}
            label="Projects"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-gold-400" size={32} />
          </div>
        ) : tab === 'leads' ? (
          <LeadsView
            leads={leads}
            onSelect={setSelectedLead}
            onExport={exportLeads}
            onUpdateStatus={updateLeadStatus}
            onDelete={deleteLead}
          />
        ) : (
          <ProjectsView
            projects={projects}
            onAdd={() => {
              setEditingProject(null);
              setShowProjectForm(true);
            }}
            onEdit={(p) => {
              setEditingProject(p);
              setShowProjectForm(true);
            }}
            onDelete={deleteProject}
          />
        )}
      </div>

      {/* Lead detail modal */}
      <AnimatePresence>
        {selectedLead && (
          <LeadDetailModal
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
            onUpdateStatus={(s) => updateLeadStatus(selectedLead.id, s)}
            onDelete={() => deleteLead(selectedLead.id)}
          />
        )}
      </AnimatePresence>

      {/* Project form modal */}
      <AnimatePresence>
        {showProjectForm && (
          <ProjectFormModal
            project={editingProject}
            onClose={() => {
              setShowProjectForm(false);
              setEditingProject(null);
            }}
            onSaved={() => {
              setShowProjectForm(false);
              setEditingProject(null);
              fetchData();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm tracking-[0.1em] uppercase transition-all ${
        active
          ? 'bg-gold-500 text-ink-950 font-medium'
          : 'glass-light text-cream-300/60 hover:text-gold-400'
      }`}
    >
      {icon}
      {label}
      {badge !== undefined && badge > 0 && (
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded-full ${
            active ? 'bg-ink-950 text-gold-400' : 'bg-gold-500 text-ink-950'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-gold-500/20 text-gold-400',
  contacted: 'bg-blue-500/20 text-blue-400',
  converted: 'bg-green-500/20 text-green-400',
  archived: 'bg-gray-500/20 text-gray-400',
};

function LeadsView({
  leads,
  onSelect,
  onExport,
  onUpdateStatus,
  onDelete,
}: {
  leads: Lead[];
  onSelect: (l: Lead) => void;
  onExport: () => void;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  if (leads.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-cream-300/40 text-sm">No leads yet.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-cream-300/50">
          {leads.length} total enquiries
        </p>
        <button
          onClick={onExport}
          className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-gold-400 hover:text-gold-300 transition-colors border border-gold-500/30 px-4 py-2 rounded-lg"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>

      <div className="space-y-3">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="glass rounded-xl p-5 flex items-center gap-4 hover:border-gold-500/20 transition-all cursor-pointer"
            onClick={() => onSelect(lead)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-sm text-cream-100 font-medium truncate">
                  {lead.full_name}
                </h3>
                <span
                  className={`text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full ${STATUS_COLORS[lead.status] || STATUS_COLORS.new}`}
                >
                  {lead.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-cream-300/40">
                <span className="flex items-center gap-1">
                  <Phone size={12} />
                  {lead.phone}
                </span>
                {lead.project_type && (
                  <span className="flex items-center gap-1">
                    <FolderKanban size={12} />
                    {lead.project_type}
                  </span>
                )}
                {lead.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {lead.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(lead.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <ChevronRight size={18} className="text-cream-300/30 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

function LeadDetailModal({
  lead,
  onClose,
  onUpdateStatus,
  onDelete,
}: {
  lead: Lead;
  onClose: () => void;
  onUpdateStatus: (status: string) => void;
  onDelete: () => void;
}) {
  const statuses = ['new', 'contacted', 'converted', 'archived'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-ink-950/90 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg glass rounded-2xl p-6 md:p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-ink-800/80 text-cream-300/70 hover:text-gold-400 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="font-serif text-2xl text-cream-100 mb-1">{lead.full_name}</h2>
        <p className="text-xs tracking-[0.1em] uppercase text-gold-400/60 mb-6">
          {new Date(lead.created_at).toLocaleString()}
        </p>

        <div className="space-y-4">
          <DetailRow icon={<Phone size={14} />} label="Phone" value={lead.phone} href={`tel:${lead.phone}`} />
          {lead.email && <DetailRow icon={<Mail size={14} />} label="Email" value={lead.email} href={`mailto:${lead.email}`} />}
          {lead.location && <DetailRow icon={<MapPin size={14} />} label="Location" value={lead.location} />}
          {lead.project_type && <DetailRow icon={<FolderKanban size={14} />} label="Project Type" value={lead.project_type} />}
          {lead.budget && <DetailRow icon={<FolderKanban size={14} />} label="Budget" value={lead.budget} />}
          {lead.requirement && (
            <div>
              <p className="text-xs tracking-[0.1em] uppercase text-cream-300/40 mb-1">Requirement</p>
              <p className="text-sm text-cream-300/70 bg-ink-800/50 rounded-lg p-3 leading-relaxed">
                {lead.requirement}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-cream-300/10">
          <p className="text-xs tracking-[0.1em] uppercase text-cream-300/40 mb-2">Status</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => onUpdateStatus(s)}
                className={`text-xs tracking-[0.1em] uppercase px-3 py-1.5 rounded-full transition-all ${
                  lead.status === s
                    ? STATUS_COLORS[s]
                    : 'glass-light text-cream-300/40 hover:text-cream-300/70'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 text-xs tracking-[0.1em] uppercase text-red-400/60 hover:text-red-400 transition-colors"
          >
            <Trash2 size={14} />
            Delete Lead
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DetailRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="text-xs tracking-[0.1em] uppercase text-cream-300/40 flex items-center gap-1.5">
        {icon}
        {label}
      </span>
      <span className="text-sm text-cream-100">{value}</span>
    </>
  );
  return href ? (
    <a href={href} className="flex items-center justify-between hover:text-gold-400 transition-colors">
      {content}
    </a>
  ) : (
    <div className="flex items-center justify-between">{content}</div>
  );
}

function ProjectsView({
  projects,
  onAdd,
  onEdit,
  onDelete,
}: {
  projects: Project[];
  onAdd: () => void;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-cream-300/50">{projects.length} projects</p>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase bg-gold-500 text-ink-950 px-4 py-2 rounded-lg font-medium hover:bg-gold-400 transition-colors"
        >
          <Plus size={14} />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="glass rounded-xl overflow-hidden group">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={p.image_url}
                alt={p.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {!p.is_published && (
                <span className="absolute top-2 right-2 text-[10px] tracking-[0.1em] uppercase bg-ink-950/80 text-cream-300/60 px-2 py-1 rounded-full">
                  Draft
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-sm text-cream-100 font-medium">{p.title}</h3>
              <p className="text-xs text-cream-300/40 mt-1">{p.category}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => onEdit(p)}
                  className="flex items-center gap-1 text-xs text-cream-300/60 hover:text-gold-400 transition-colors"
                >
                  <Edit2 size={12} />
                  Edit
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="flex items-center gap-1 text-xs text-cream-300/60 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectFormModal({
  project,
  onClose,
  onSaved,
}: {
  project: Project | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title: project?.title || '',
    category: project?.category || '',
    location: project?.location || '',
    year: project?.year?.toString() || '',
    area: project?.area || '',
    description: project?.description || '',
    concept: project?.concept || '',
    image_url: project?.image_url || '',
    gallery_urls: project?.gallery_urls.join('\n') || '',
    is_published: project?.is_published ?? true,
    sort_order: project?.sort_order?.toString() || '0',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const gallery = form.gallery_urls
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const data = {
      title: form.title,
      category: form.category || null,
      location: form.location || null,
      year: form.year ? parseInt(form.year) : null,
      area: form.area || null,
      description: form.description || null,
      concept: form.concept || null,
      image_url: form.image_url,
      gallery_urls: gallery,
      is_published: form.is_published,
      sort_order: parseInt(form.sort_order) || 0,
    };

    try {
      if (project) {
        const { error } = await supabase
          .from('projects')
          .update(data)
          .eq('id', project.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert(data);
        if (error) throw error;
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-ink-950/90 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto scrollbar-hide glass rounded-2xl p-6 md:p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-ink-800/80 text-cream-300/70 hover:text-gold-400 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="font-serif text-2xl text-cream-100 mb-6">
          {project ? 'Edit Project' : 'Add Project'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <FormInput label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
            <FormInput label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
            <FormInput label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
            <FormInput label="Year" value={form.year} onChange={(v) => setForm({ ...form, year: v })} type="number" />
            <FormInput label="Area / Size" value={form.area} onChange={(v) => setForm({ ...form, area: v })} />
            <FormInput label="Sort Order" value={form.sort_order} onChange={(v) => setForm({ ...form, sort_order: v })} type="number" />
          </div>

          <FormInput label="Main Image URL" value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} required />
          <div>
            <label className="block text-xs tracking-[0.1em] text-cream-300/60 uppercase mb-1.5">
              Gallery URLs (one per line)
            </label>
            <textarea
              value={form.gallery_urls}
              onChange={(e) => setForm({ ...form, gallery_urls: e.target.value })}
              className="form-input min-h-[80px] resize-none"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.1em] text-cream-300/60 uppercase mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="form-input min-h-[80px] resize-none"
            />
          </div>
          <div>
            <label className="block text-xs tracking-[0.1em] text-cream-300/60 uppercase mb-1.5">
              Architectural Concept
            </label>
            <textarea
              value={form.concept}
              onChange={(e) => setForm({ ...form, concept: e.target.value })}
              className="form-input min-h-[60px] resize-none"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
              className="w-4 h-4 accent-gold-500"
            />
            <span className="text-sm text-cream-300/70">Published</span>
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-ink-950 font-medium text-sm tracking-[0.12em] uppercase py-3.5 rounded-lg transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : 'Save Project'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs tracking-[0.1em] text-cream-300/60 uppercase mb-1.5">
        {label}
        {required && <span className="text-gold-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input"
        required={required}
      />
    </div>
  );
}
