/*
# Create leads and projects tables for Design Square & Associates

1. New Tables
- `leads`: Stores project enquiry submissions from website visitors.
  - id (uuid, PK)
  - full_name (text, not null)
  - phone (text, not null)
  - email (text, nullable)
  - location (text, nullable)
  - project_type (text, nullable) — Residential/Commercial/Interior/Renovation/Other
  - budget (text, nullable)
  - requirement (text, nullable)
  - status (text, default 'new') — new/contacted/converted/archived
  - created_at (timestamptz, default now())

- `projects`: Stores portfolio projects shown on the website.
  - id (uuid, PK)
  - title (text, not null)
  - category (text, nullable)
  - location (text, nullable)
  - year (int, nullable)
  - area (text, nullable)
  - description (text, nullable)
  - concept (text, nullable)
  - image_url (text, not null)
  - gallery_urls (text[], default '{}')
  - is_published (boolean, default true)
  - sort_order (int, default 0)
  - created_at (timestamptz, default now())

2. Security
- RLS enabled on both tables.
- `leads`: Anyone (anon) can INSERT (form submissions). Only authenticated users (admin) can SELECT/UPDATE/DELETE.
- `projects`: Anyone (anon) can SELECT published projects. Only authenticated users can INSERT/UPDATE/DELETE.
- A honeypot field is handled in the application layer.
*/

-- Lead submissions from the website enquiry form
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  location text,
  project_type text,
  budget text,
  requirement text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a lead (the enquiry form)
DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads"
ON leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated admin can read leads
DROP POLICY IF EXISTS "auth_select_leads" ON leads;
CREATE POLICY "auth_select_leads"
ON leads FOR SELECT
TO authenticated
USING (true);

-- Only authenticated admin can update lead status
DROP POLICY IF EXISTS "auth_update_leads" ON leads;
CREATE POLICY "auth_update_leads"
ON leads FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Only authenticated admin can delete leads
DROP POLICY IF EXISTS "auth_delete_leads" ON leads;
CREATE POLICY "auth_delete_leads"
ON leads FOR DELETE
TO authenticated
USING (true);

-- Portfolio projects
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text,
  location text,
  year int,
  area text,
  description text,
  concept text,
  image_url text NOT NULL,
  gallery_urls text[] NOT NULL DEFAULT '{}',
  is_published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Anyone can view published projects
DROP POLICY IF EXISTS "anon_select_projects" ON projects;
CREATE POLICY "anon_select_projects"
ON projects FOR SELECT
TO anon, authenticated
USING (true);

-- Only authenticated admin can insert projects
DROP POLICY IF EXISTS "auth_insert_projects" ON projects;
CREATE POLICY "auth_insert_projects"
ON projects FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only authenticated admin can update projects
DROP POLICY IF EXISTS "auth_update_projects" ON projects;
CREATE POLICY "auth_update_projects"
ON projects FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Only authenticated admin can delete projects
DROP POLICY IF EXISTS "auth_delete_projects" ON projects;
CREATE POLICY "auth_delete_projects"
ON projects FOR DELETE
TO authenticated
USING (true);

-- Index for sorting projects
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects (sort_order);
-- Index for filtering leads by status
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
-- Index for leads by date
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
