-- Add company column to jobs table
ALTER TABLE jobs ADD COLUMN company uuid REFERENCES job_company(id);

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  icon text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create subcategories table
CREATE TABLE subcategories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(name, category_id)
);

-- Create job_categories junction table (many-to-many relationship)
CREATE TABLE job_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  subcategory_id uuid REFERENCES subcategories(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(job_id, category_id, subcategory_id)
);

-- Remove old category and subcategory columns from jobs table (if they exist)
-- ALTER TABLE jobs DROP COLUMN IF EXISTS category;
-- ALTER TABLE jobs DROP COLUMN IF EXISTS subcategory;

-- Sample data for job_company table
INSERT INTO job_company (company_name, company_username, description, location, x, instagram, facebook, telegram) VALUES
('TechCorp Solutions', 'techcorp', 'Leading technology solutions provider', 'San Francisco, CA', '@techcorp', '@techcorp_official', 'techcorp', '@techcorp_channel'),
('InnovateLabs', 'innovatelabs', 'Innovation-driven software development company', 'New York, NY', '@innovatelabs', '@innovatelabs', 'innovatelabs', '@innovatelabs_team'),
('DataFlow Systems', 'dataflow', 'Big data and analytics solutions', 'Austin, TX', '@dataflow', '@dataflow_systems', 'dataflow', '@dataflow_updates'),
('CloudTech Inc', 'cloudtech', 'Cloud infrastructure and services', 'Seattle, WA', '@cloudtech', '@cloudtech_inc', 'cloudtech', '@cloudtech_news'),
('StartupHub', 'startuphub', 'Startup incubator and accelerator', 'Boston, MA', '@startuphub', '@startuphub_official', 'startuphub', '@startuphub_community');

-- Sample jobs with company references
INSERT INTO jobs (
  title, 
  slug, 
  description, 
  image_url, 
  tags, 
  apply_link, 
  total_seats, 
  deadline, 
  created_by,
  company,
  category,
  subcategory,
  location,
  job_type,
  remoteOrOffice,
  experience,
  salary_min,
  salary_max,
  isPromotion
) VALUES
(
  'Senior Frontend Developer',
  'senior-frontend-developer-techcorp',
  'Join our team as a Senior Frontend Developer working with React, TypeScript, and modern web technologies.',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
  ARRAY['React', 'TypeScript', 'JavaScript', 'CSS'],
  'https://techcorp.com/careers/frontend-dev',
  2,
  '2024-02-15',
  (SELECT id FROM auth.users LIMIT 1),
  (SELECT id FROM job_company WHERE company_username = 'techcorp'),
  'Engineering',
  'Frontend',
  'San Francisco, CA',
  'fulltime',
  'remote',
  '3-5 years',
  80000,
  120000,
  true
),
(
  'Data Scientist',
  'data-scientist-dataflow',
  'Looking for a Data Scientist to work on machine learning models and data analysis projects.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
  ARRAY['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
  'https://dataflow.com/jobs/data-scientist',
  1,
  '2024-02-20',
  (SELECT id FROM auth.users LIMIT 1),
  (SELECT id FROM job_company WHERE company_username = 'dataflow'),
  'Data Science',
  'Machine Learning',
  'Austin, TX',
  'fulltime',
  'office',
  '2-4 years',
  90000,
  130000,
  false
),
(
  'Cloud DevOps Engineer',
  'devops-engineer-cloudtech',
  'DevOps Engineer position focusing on AWS, Kubernetes, and CI/CD pipeline management.',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
  ARRAY['AWS', 'Kubernetes', 'Docker', 'CI/CD'],
  'https://cloudtech.com/careers/devops',
  3,
  '2024-02-25',
  (SELECT id FROM auth.users LIMIT 1),
  (SELECT id FROM job_company WHERE company_username = 'cloudtech'),
  'Engineering',
  'DevOps',
  'Seattle, WA',
  'fulltime',
  'remote',
  '3-6 years',
  95000,
  140000,
  true
),
(
  'Product Manager',
  'product-manager-innovatelabs',
  'Product Manager role for managing innovative software products from conception to launch.',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
  ARRAY['Product Management', 'Agile', 'Strategy', 'Analytics'],
  'https://innovatelabs.com/jobs/product-manager',
  1,
  '2024-03-01',
  (SELECT id FROM auth.users LIMIT 1),
  (SELECT id FROM job_company WHERE company_username = 'innovatelabs'),
  'Product',
  'Management',
  'New York, NY',
  'fulltime',
  'office',
  '4-7 years',
  100000,
  150000,
  false
),
(
  'Full Stack Developer',
  'fullstack-developer-startuphub',
  'Full Stack Developer position working with startups in our incubator program.',
  'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400',
  ARRAY['React', 'Node.js', 'MongoDB', 'Express'],
  'https://startuphub.com/careers/fullstack',
  2,
  '2024-03-05',
  (SELECT id FROM auth.users LIMIT 1),
  (SELECT id FROM job_company WHERE company_username = 'startuphub'),
  'Engineering',
  'Full Stack',
  'Boston, MA',
  'fulltime',
  'remote',
  '2-5 years',
  70000,
  110000,
  true
);

-- Update existing jobs to have company references (if any exist)
-- This is optional and depends on your existing data
-- UPDATE jobs SET company = (SELECT id FROM job_company WHERE company_username = 'techcorp') WHERE company IS NULL LIMIT 5;
-- Insert sample categories
INSERT INTO categories (name, description, icon) VALUES
('Engineering', 'Software development and technical roles', '💻'),
('Design', 'UI/UX and creative design positions', '🎨'),
('Marketing', 'Digital marketing and growth roles', '📈'),
('Sales', 'Business development and sales positions', '💼'),
('Data Science', 'Analytics and data-driven roles', '📊'),
('Product', 'Product management and strategy', '🚀'),
('Operations', 'Business operations and management', '⚙️'),
('Finance', 'Financial and accounting positions', '💰');

-- Insert sample subcategories
INSERT INTO subcategories (name, description, category_id) VALUES
-- Engineering subcategories
('Frontend', 'Frontend development roles', (SELECT id FROM categories WHERE name = 'Engineering')),
('Backend', 'Backend development roles', (SELECT id FROM categories WHERE name = 'Engineering')),
('Full Stack', 'Full stack development roles', (SELECT id FROM categories WHERE name = 'Engineering')),
('DevOps', 'DevOps and infrastructure roles', (SELECT id FROM categories WHERE name = 'Engineering')),
('Mobile', 'Mobile app development', (SELECT id FROM categories WHERE name = 'Engineering')),
('QA', 'Quality assurance and testing', (SELECT id FROM categories WHERE name = 'Engineering')),

-- Design subcategories
('UI Design', 'User interface design', (SELECT id FROM categories WHERE name = 'Design')),
('UX Design', 'User experience design', (SELECT id FROM categories WHERE name = 'Design')),
('Graphic Design', 'Visual and graphic design', (SELECT id FROM categories WHERE name = 'Design')),
('Product Design', 'Product design and prototyping', (SELECT id FROM categories WHERE name = 'Design')),

-- Marketing subcategories
('Digital Marketing', 'Online marketing strategies', (SELECT id FROM categories WHERE name = 'Marketing')),
('Content Marketing', 'Content creation and strategy', (SELECT id FROM categories WHERE name = 'Marketing')),
('SEO/SEM', 'Search engine optimization', (SELECT id FROM categories WHERE name = 'Marketing')),
('Social Media', 'Social media management', (SELECT id FROM categories WHERE name = 'Marketing')),

-- Data Science subcategories
('Machine Learning', 'ML and AI development', (SELECT id FROM categories WHERE name = 'Data Science')),
('Data Analysis', 'Data analysis and insights', (SELECT id FROM categories WHERE name = 'Data Science')),
('Business Intelligence', 'BI and reporting', (SELECT id FROM categories WHERE name = 'Data Science')),

-- Product subcategories
('Product Management', 'Product strategy and management', (SELECT id FROM categories WHERE name = 'Product')),
('Product Marketing', 'Product marketing and positioning', (SELECT id FROM categories WHERE name = 'Product')),

-- Sales subcategories
('Inside Sales', 'Internal sales roles', (SELECT id FROM categories WHERE name = 'Sales')),
('Field Sales', 'External sales roles', (SELECT id FROM categories WHERE name = 'Sales')),
('Business Development', 'BD and partnerships', (SELECT id FROM categories WHERE name = 'Sales'));

-- Link existing jobs to categories (update the sample jobs)
INSERT INTO job_categories (job_id, category_id, subcategory_id) VALUES
-- Senior Frontend Developer -> Engineering/Frontend
((SELECT id FROM jobs WHERE slug = 'senior-frontend-developer-techcorp'), 
 (SELECT id FROM categories WHERE name = 'Engineering'), 
 (SELECT id FROM subcategories WHERE name = 'Frontend')),

-- Data Scientist -> Data Science/Machine Learning
((SELECT id FROM jobs WHERE slug = 'data-scientist-dataflow'), 
 (SELECT id FROM categories WHERE name = 'Data Science'), 
 (SELECT id FROM subcategories WHERE name = 'Machine Learning')),

-- DevOps Engineer -> Engineering/DevOps
((SELECT id FROM jobs WHERE slug = 'devops-engineer-cloudtech'), 
 (SELECT id FROM categories WHERE name = 'Engineering'), 
 (SELECT id FROM subcategories WHERE name = 'DevOps')),

-- Product Manager -> Product/Product Management
((SELECT id FROM jobs WHERE slug = 'product-manager-innovatelabs'), 
 (SELECT id FROM categories WHERE name = 'Product'), 
 (SELECT id FROM subcategories WHERE name = 'Product Management')),

-- Full Stack Developer -> Engineering/Full Stack
((SELECT id FROM jobs WHERE slug = 'fullstack-developer-startuphub'), 
 (SELECT id FROM categories WHERE name = 'Engineering'), 
 (SELECT id FROM subcategories WHERE name = 'Full Stack'));