import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useLeadForm } from './LeadFormContext';
import { supabase } from '@/lib/supabase';
import { PROJECT_TYPES, BUDGET_RANGES, STUDIO } from '@/lib/constants';
import { STUDIO_IMAGES } from '@/lib/images';

export function LeadModal() {
  const { isOpen, closeForm } = useLeadForm();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    location: '',
    project_type: '',
    budget: '',
    requirement: '',
    website: '', // honeypot
  });

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const reset = () => {
    setForm({
      full_name: '',
      phone: '',
      email: '',
      location: '',
      project_type: '',
      budget: '',
      requirement: '',
      website: '',
    });
    setSuccess(false);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.website) return;

    if (!form.full_name.trim() || !form.phone.trim()) {
      setError('Please provide your name and phone number.');
      return;
    }

    const phoneClean = form.phone.replace(/[^0-9+]/g, '');
    if (phoneClean.length < 10) {
      setError('Please provide a valid phone number.');
      return;
    }

    setSubmitting(true);
    try {
      const { error: dbError } = await supabase.from('leads').insert({
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        location: form.location.trim() || null,
        project_type: form.project_type || null,
        budget: form.budget || null,
        requirement: form.requirement.trim() || null,
      });

      if (dbError) throw dbError;
      setSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try calling us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    closeForm();
    setTimeout(reset, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-6"
        >
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto scrollbar-hide glass rounded-2xl md:grid md:grid-cols-2"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-ink-800/80 text-cream-300/70 hover:text-gold-400 hover:bg-ink-700 transition-colors"
              aria-label="Close form"
            >
              <X size={20} />
            </button>

            <div className="relative hidden md:block min-h-[400px]">
              <img
                src={STUDIO_IMAGES.exterior2}
                alt="Architectural project by Design Square & Associates"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-[10px] tracking-[0.3em] text-gold-400 uppercase mb-3">
                  {STUDIO.shortName}
                </p>
                <h3 className="font-serif text-3xl text-cream-100 leading-tight">
                  Planning Your Dream Home?
                </h3>
                <p className="text-sm text-cream-300/70 mt-3 leading-relaxed">
                  Tell us a little about your project and our team will get in
                  touch with you.
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {success ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <CheckCircle2 size={56} className="text-gold-400 mb-6" />
                  <h3 className="font-serif text-2xl text-cream-100 mb-3">
                    Thank You!
                  </h3>
                  <p className="text-sm text-cream-300/70 leading-relaxed max-w-xs">
                    Your enquiry has been received. Our team will contact you
                    soon to discuss your project.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-8 text-sm tracking-[0.2em] text-gold-400 hover:text-gold-300 uppercase transition-colors"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : (
                <>
                  <div className="md:hidden mb-4">
                    <p className="text-[10px] tracking-[0.3em] text-gold-400 uppercase mb-2">
                      {STUDIO.shortName}
                    </p>
                    <h3 className="font-serif text-2xl text-cream-100">
                      Planning Your Dream Home?
                    </h3>
                    <p className="text-sm text-cream-300/70 mt-2">
                      Tell us about your project and we&apos;ll get in touch.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Field label="Full Name" required>
                      <input
                        type="text"
                        value={form.full_name}
                        onChange={(e) => update('full_name', e.target.value)}
                        className="form-input"
                        placeholder="Your full name"
                        required
                      />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Mobile Number" required>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          className="form-input"
                          placeholder="+91 XXXXX XXXXX"
                          required
                        />
                      </Field>
                      <Field label="Email">
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          className="form-input"
                          placeholder="you@email.com"
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="City / Location">
                        <input
                          type="text"
                          value={form.location}
                          onChange={(e) => update('location', e.target.value)}
                          className="form-input"
                          placeholder="Your city"
                        />
                      </Field>
                      <Field label="Project Type">
                        <select
                          value={form.project_type}
                          onChange={(e) => update('project_type', e.target.value)}
                          className="form-input"
                        >
                          <option value="">Select type</option>
                          {PROJECT_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field label="Approximate Budget">
                      <select
                        value={form.budget}
                        onChange={(e) => update('budget', e.target.value)}
                        className="form-input"
                      >
                        <option value="">Select budget range</option>
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Project Requirement">
                      <textarea
                        value={form.requirement}
                        onChange={(e) => update('requirement', e.target.value)}
                        className="form-input min-h-[80px] resize-none"
                        placeholder="Tell us briefly about your project..."
                      />
                    </Field>

                    {/* Honeypot */}
                    <input
                      type="text"
                      name="website"
                      value={form.website}
                      onChange={(e) => update('website', e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {error && (
                      <p className="text-sm text-red-400">{error}</p>
                    )}

                    <p className="text-xs text-cream-300/50 leading-relaxed">
                      By submitting this form, you agree to be contacted
                      regarding your project enquiry.
                    </p>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full group flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-ink-950 font-medium text-sm tracking-[0.15em] uppercase py-4 rounded-lg transition-all disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit &amp; Connect
                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-full text-sm text-cream-300/50 hover:text-cream-300/80 tracking-[0.15em] uppercase py-2 transition-colors"
                    >
                      Continue Exploring
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs tracking-[0.1em] text-cream-300/60 uppercase mb-1.5">
        {label}
        {required && <span className="text-gold-400 ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}
