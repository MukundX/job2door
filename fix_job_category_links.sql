-- Fix Job-Category Linking Migration Script
-- This script ensures all existing jobs are properly linked to the new category system

-- First, let's clear any existing job_categories relationships to start fresh
DELETE FROM job_categories;

-- Now let's link existing jobs based on their current category and subcategory fields
-- We'll map the old text-based categories to the new structured system

-- Link jobs with 'Engineering' category
INSERT INTO job_categories (job_id, category_id, subcategory_id)
SELECT 
    j.id as job_id,
    c.id as category_id,
    s.id as subcategory_id
FROM jobs j
JOIN categories c ON c.name = 'Software Engineering'
LEFT JOIN subcategories s ON s.category_id = c.id AND (
    (j.subcategory = 'Frontend' AND s.name = 'Frontend Development') OR
    (j.subcategory = 'Backend' AND s.name = 'Backend Development') OR
    (j.subcategory = 'Full Stack' AND s.name = 'Full Stack Development') OR
    (j.subcategory = 'DevOps' AND s.name = 'DevOps Engineering') OR
    (j.subcategory IS NULL AND s.name = 'Full Stack Development') -- Default for Engineering
)
WHERE j.category = 'Engineering'
ON CONFLICT (job_id, category_id, subcategory_id) DO NOTHING;

-- Link jobs with 'Data Science' category
INSERT INTO job_categories (job_id, category_id, subcategory_id)
SELECT 
    j.id as job_id,
    c.id as category_id,
    s.id as subcategory_id
FROM jobs j
JOIN categories c ON c.name = 'AI & Machine Learning'
LEFT JOIN subcategories s ON s.category_id = c.id AND (
    (j.subcategory = 'Machine Learning' AND s.name = 'Machine Learning Engineering') OR
    (j.subcategory = 'Data Analysis' AND s.name = 'Data Analysis') OR
    (j.subcategory IS NULL AND s.name = 'Machine Learning Engineering') -- Default for Data Science
)
WHERE j.category = 'Data Science'
ON CONFLICT (job_id, category_id, subcategory_id) DO NOTHING;

-- Link jobs with 'Product' category
INSERT INTO job_categories (job_id, category_id, subcategory_id)
SELECT 
    j.id as job_id,
    c.id as category_id,
    s.id as subcategory_id
FROM jobs j
JOIN categories c ON c.name = 'Product Management'
LEFT JOIN subcategories s ON s.category_id = c.id AND (
    (j.subcategory = 'Management' AND s.name = 'Product Strategy') OR
    (j.subcategory = 'Marketing' AND s.name = 'Product Marketing') OR
    (j.subcategory IS NULL AND s.name = 'Product Strategy') -- Default for Product
)
WHERE j.category = 'Product'
ON CONFLICT (job_id, category_id, subcategory_id) DO NOTHING;

-- Link jobs with 'Design' category
INSERT INTO job_categories (job_id, category_id, subcategory_id)
SELECT 
    j.id as job_id,
    c.id as category_id,
    s.id as subcategory_id
FROM jobs j
JOIN categories c ON c.name = 'UI/UX Design'
LEFT JOIN subcategories s ON s.category_id = c.id AND (
    (j.subcategory = 'UI Design' AND s.name = 'User Interface Design') OR
    (j.subcategory = 'UX Design' AND s.name = 'User Experience Design') OR
    (j.subcategory IS NULL AND s.name = 'User Experience Design') -- Default for Design
)
WHERE j.category = 'Design'
ON CONFLICT (job_id, category_id, subcategory_id) DO NOTHING;

-- Link jobs with 'Marketing' category
INSERT INTO job_categories (job_id, category_id, subcategory_id)
SELECT 
    j.id as job_id,
    c.id as category_id,
    s.id as subcategory_id
FROM jobs j
JOIN categories c ON c.name = 'Digital Marketing'
LEFT JOIN subcategories s ON s.category_id = c.id AND (
    (j.subcategory = 'Digital Marketing' AND s.name = 'Performance Marketing') OR
    (j.subcategory = 'Content Marketing' AND s.name = 'Content Marketing') OR
    (j.subcategory = 'SEO/SEM' AND s.name = 'SEO/SEM') OR
    (j.subcategory IS NULL AND s.name = 'Performance Marketing') -- Default for Marketing
)
WHERE j.category = 'Marketing'
ON CONFLICT (job_id, category_id, subcategory_id) DO NOTHING;

-- Link jobs with 'Sales' category
INSERT INTO job_categories (job_id, category_id, subcategory_id)
SELECT 
    j.id as job_id,
    c.id as category_id,
    s.id as subcategory_id
FROM jobs j
JOIN categories c ON c.name = 'Sales'
LEFT JOIN subcategories s ON s.category_id = c.id AND (
    (j.subcategory = 'Inside Sales' AND s.name = 'Inside Sales') OR
    (j.subcategory = 'Field Sales' AND s.name = 'Field Sales') OR
    (j.subcategory = 'Business Development' AND s.name = 'Business Development') OR
    (j.subcategory IS NULL AND s.name = 'Inside Sales') -- Default for Sales
)
WHERE j.category = 'Sales'
ON CONFLICT (job_id, category_id, subcategory_id) DO NOTHING;

-- Link jobs with 'Operations' category
INSERT INTO job_categories (job_id, category_id, subcategory_id)
SELECT 
    j.id as job_id,
    c.id as category_id,
    s.id as subcategory_id
FROM jobs j
JOIN categories c ON c.name = 'Operations'
LEFT JOIN subcategories s ON s.category_id = c.id AND s.name = 'Business Operations'
WHERE j.category = 'Operations'
ON CONFLICT (job_id, category_id, subcategory_id) DO NOTHING;

-- Link jobs with 'Finance' category
INSERT INTO job_categories (job_id, category_id, subcategory_id)
SELECT 
    j.id as job_id,
    c.id as category_id,
    s.id as subcategory_id
FROM jobs j
JOIN categories c ON c.name = 'Finance'
LEFT JOIN subcategories s ON s.category_id = c.id AND s.name = 'Financial Analysis'
WHERE j.category = 'Finance'
ON CONFLICT (job_id, category_id, subcategory_id) DO NOTHING;

-- For jobs that don't have a category or have an unrecognized category, 
-- assign them to a default "Software Engineering" category
INSERT INTO job_categories (job_id, category_id, subcategory_id)
SELECT 
    j.id as job_id,
    c.id as category_id,
    s.id as subcategory_id
FROM jobs j
JOIN categories c ON c.name = 'Software Engineering'
JOIN subcategories s ON s.category_id = c.id AND s.name = 'Full Stack Development'
WHERE j.id NOT IN (SELECT job_id FROM job_categories)
ON CONFLICT (job_id, category_id, subcategory_id) DO NOTHING;

-- Now let's add some additional sample jobs with proper category links to test the system
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
    location,
    job_type,
    remoteOrOffice,
    experience,
    salary_min,
    salary_max,
    isPromotion
) VALUES
(
    'React Frontend Developer',
    'react-frontend-developer-techcorp-new',
    'Build modern React applications with TypeScript and Next.js.',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    ARRAY['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    'https://techcorp.com/careers/react-frontend',
    3,
    '2024-04-15',
    (SELECT id FROM auth.users LIMIT 1),
    (SELECT id FROM job_company WHERE company_username = 'techcorp' LIMIT 1),
    'San Francisco, CA',
    'fulltime',
    'remote',
    '2-4 years',
    70000,
    110000,
    false
),
(
    'Python Backend Engineer',
    'python-backend-engineer-dataflow-new',
    'Develop scalable backend services using Python, Django, and PostgreSQL.',
    'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
    ARRAY['Python', 'Django', 'PostgreSQL', 'Redis'],
    'https://dataflow.com/jobs/python-backend',
    2,
    '2024-04-20',
    (SELECT id FROM auth.users LIMIT 1),
    (SELECT id FROM job_company WHERE company_username = 'dataflow' LIMIT 1),
    'Austin, TX',
    'fulltime',
    'office',
    '3-5 years',
    85000,
    125000,
    true
),
(
    'Mobile App Developer',
    'mobile-app-developer-innovatelabs-new',
    'Create cross-platform mobile applications using React Native.',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
    ARRAY['React Native', 'JavaScript', 'iOS', 'Android'],
    'https://innovatelabs.com/jobs/mobile-developer',
    1,
    '2024-04-25',
    (SELECT id FROM auth.users LIMIT 1),
    (SELECT id FROM job_company WHERE company_username = 'innovatelabs' LIMIT 1),
    'New York, NY',
    'fulltime',
    'remote',
    '2-4 years',
    75000,
    115000,
    false
),
(
    'DevOps Engineer',
    'devops-engineer-cloudtech-new',
    'Manage cloud infrastructure and CI/CD pipelines using AWS and Kubernetes.',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
    ARRAY['AWS', 'Kubernetes', 'Docker', 'Terraform'],
    'https://cloudtech.com/careers/devops-new',
    2,
    '2024-05-01',
    (SELECT id FROM auth.users LIMIT 1),
    (SELECT id FROM job_company WHERE company_username = 'cloudtech' LIMIT 1),
    'Seattle, WA',
    'fulltime',
    'remote',
    '3-6 years',
    95000,
    140000,
    true
),
(
    'Product Designer',
    'product-designer-startuphub-new',
    'Design user-centered products and create design systems for startups.',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    ARRAY['Figma', 'Design Systems', 'User Research', 'Prototyping'],
    'https://startuphub.com/careers/product-designer',
    1,
    '2024-05-05',
    (SELECT id FROM auth.users LIMIT 1),
    (SELECT id FROM job_company WHERE company_username = 'startuphub' LIMIT 1),
    'Boston, MA',
    'fulltime',
    'remote',
    '3-5 years',
    80000,
    120000,
    false
);

-- Link the new jobs to proper categories
INSERT INTO job_categories (job_id, category_id, subcategory_id) VALUES
-- React Frontend Developer -> Software Engineering/Frontend Development
((SELECT id FROM jobs WHERE slug = 'react-frontend-developer-techcorp-new'), 
 (SELECT id FROM categories WHERE name = 'Software Engineering'), 
 (SELECT id FROM subcategories WHERE name = 'Frontend Development')),

-- Python Backend Engineer -> Software Engineering/Backend Development
((SELECT id FROM jobs WHERE slug = 'python-backend-engineer-dataflow-new'), 
 (SELECT id FROM categories WHERE name = 'Software Engineering'), 
 (SELECT id FROM subcategories WHERE name = 'Backend Development')),

-- Mobile App Developer -> Mobile Development/React Native
((SELECT id FROM jobs WHERE slug = 'mobile-app-developer-innovatelabs-new'), 
 (SELECT id FROM categories WHERE name = 'Mobile Development'), 
 (SELECT id FROM subcategories WHERE name = 'React Native')),

-- DevOps Engineer -> DevOps & Infrastructure/DevOps Engineering
((SELECT id FROM jobs WHERE slug = 'devops-engineer-cloudtech-new'), 
 (SELECT id FROM categories WHERE name = 'DevOps & Infrastructure'), 
 (SELECT id FROM subcategories WHERE name = 'DevOps Engineering')),

-- Product Designer -> UI/UX Design/Product Design
((SELECT id FROM jobs WHERE slug = 'product-designer-startuphub-new'), 
 (SELECT id FROM categories WHERE name = 'UI/UX Design'), 
 (SELECT id FROM subcategories WHERE name = 'Product Design'))

ON CONFLICT (job_id, category_id, subcategory_id) DO NOTHING;

-- Verify the links by showing a summary
SELECT 
    'Job-Category Links Summary' as info,
    COUNT(*) as total_links
FROM job_categories;

-- Show jobs with their linked categories
SELECT 
    j.title,
    j.slug,
    c.name as category,
    s.name as subcategory,
    j.salary_min,
    j.salary_max,
    j.job_type,
    j.remoteOrOffice
FROM jobs j
LEFT JOIN job_categories jc ON j.id = jc.job_id
LEFT JOIN categories c ON jc.category_id = c.id
LEFT JOIN subcategories s ON jc.subcategory_id = s.id
ORDER BY j.created_at DESC
LIMIT 20;