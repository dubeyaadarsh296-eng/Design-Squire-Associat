export interface Lead {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  location: string | null;
  project_type: string | null;
  budget: string | null;
  requirement: string | null;
  status: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  category: string | null;
  location: string | null;
  year: number | null;
  area: string | null;
  description: string | null;
  concept: string | null;
  image_url: string;
  gallery_urls: string[];
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface NewLead {
  full_name: string;
  phone: string;
  email?: string;
  location?: string;
  project_type?: string;
  budget?: string;
  requirement?: string;
}
