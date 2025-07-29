-- Comprehensive Categories and Subcategories for Jobler Platform
-- This file contains extensive category data for better job classification

-- First, let's add more categories
INSERT INTO categories (name, description, icon) VALUES
-- Technology & Engineering
('Software Engineering', 'Software development and programming roles', '💻'),
('Data & Analytics', 'Data science, analytics, and business intelligence', '📊'),
('DevOps & Infrastructure', 'DevOps, cloud, and infrastructure management', '⚙️'),
('Cybersecurity', 'Information security and cybersecurity roles', '🔒'),
('AI & Machine Learning', 'Artificial intelligence and ML engineering', '🤖'),
('Mobile Development', 'iOS, Android, and cross-platform development', '📱'),
('Web Development', 'Frontend, backend, and full-stack web development', '🌐'),
('Game Development', 'Video game and interactive media development', '🎮'),
('Blockchain & Crypto', 'Blockchain, cryptocurrency, and Web3 development', '⛓️'),

-- Design & Creative
('UI/UX Design', 'User interface and user experience design', '🎨'),
('Graphic Design', 'Visual design and brand identity', '🖼️'),
('Product Design', 'Product design and design strategy', '📐'),
('Motion Graphics', 'Animation and motion design', '🎬'),
('Photography', 'Commercial and creative photography', '📸'),

-- Business & Strategy
('Product Management', 'Product strategy and management', '🚀'),
('Project Management', 'Project coordination and delivery', '📋'),
('Business Analysis', 'Business analysis and process improvement', '📈'),
('Strategy & Consulting', 'Business strategy and consulting', '💼'),
('Operations', 'Business operations and process management', '⚙️'),

-- Marketing & Sales
('Digital Marketing', 'Online marketing and digital campaigns', '📱'),
('Content Marketing', 'Content creation and marketing strategy', '✍️'),
('Social Media', 'Social media management and strategy', '📲'),
('SEO & SEM', 'Search engine optimization and marketing', '🔍'),
('Sales', 'Sales and business development', '💰'),
('Public Relations', 'PR and communications', '📢'),
('Brand Marketing', 'Brand strategy and marketing', '🏷️'),

-- Finance & Accounting
('Finance', 'Financial analysis and planning', '💰'),
('Accounting', 'Accounting and bookkeeping', '📊'),
('Investment', 'Investment analysis and portfolio management', '📈'),
('Risk Management', 'Financial and operational risk management', '⚠️'),

-- Human Resources
('Human Resources', 'HR management and people operations', '👥'),
('Talent Acquisition', 'Recruiting and talent sourcing', '🎯'),
('Learning & Development', 'Training and employee development', '📚'),

-- Customer & Support
('Customer Success', 'Customer success and account management', '🤝'),
('Customer Support', 'Customer service and technical support', '🎧'),
('Quality Assurance', 'QA testing and quality control', '✅'),

-- Healthcare & Life Sciences
('Healthcare', 'Medical and healthcare roles', '🏥'),
('Biotechnology', 'Biotech and life sciences', '🧬'),
('Pharmaceuticals', 'Pharmaceutical and drug development', '💊'),

-- Education & Training
('Education', 'Teaching and educational roles', '🎓'),
('Training & Development', 'Corporate training and development', '📖'),

-- Legal & Compliance
('Legal', 'Legal counsel and paralegal roles', '⚖️'),
('Compliance', 'Regulatory compliance and governance', '📋'),

-- Manufacturing & Engineering
('Manufacturing', 'Manufacturing and production roles', '🏭'),
('Mechanical Engineering', 'Mechanical and industrial engineering', '⚙️'),
('Electrical Engineering', 'Electrical and electronics engineering', '⚡'),
('Civil Engineering', 'Civil and construction engineering', '🏗️'),

-- Media & Communications
('Media & Entertainment', 'Media production and entertainment', '🎭'),
('Journalism', 'Journalism and news reporting', '📰'),
('Communications', 'Corporate communications and PR', '📡'),

-- Retail & E-commerce
('Retail', 'Retail management and sales', '🛍️'),
('E-commerce', 'Online retail and e-commerce', '🛒'),
('Supply Chain', 'Logistics and supply chain management', '🚚'),

-- Non-Profit & Social Impact
('Non-Profit', 'Non-profit and social sector roles', '🤲'),
('Social Impact', 'Social impact and sustainability', '🌱'),

-- Real Estate & Construction
('Real Estate', 'Real estate and property management', '🏠'),
('Construction', 'Construction and building trades', '🔨'),

-- Transportation & Logistics
('Transportation', 'Transportation and mobility', '🚗'),
('Logistics', 'Logistics and warehouse management', '📦'),

-- Agriculture & Environment
('Agriculture', 'Agriculture and farming', '🌾'),
('Environmental', 'Environmental science and sustainability', '🌍')

ON CONFLICT (name) DO NOTHING;

-- Now let's add comprehensive subcategories
INSERT INTO subcategories (name, description, category_id) VALUES

-- Software Engineering subcategories
('Frontend Development', 'React, Vue, Angular, HTML/CSS', (SELECT id FROM categories WHERE name = 'Software Engineering')),
('Backend Development', 'Node.js, Python, Java, .NET', (SELECT id FROM categories WHERE name = 'Software Engineering')),
('Full Stack Development', 'End-to-end web development', (SELECT id FROM categories WHERE name = 'Software Engineering')),
('Software Architecture', 'System design and architecture', (SELECT id FROM categories WHERE name = 'Software Engineering')),
('API Development', 'REST, GraphQL, microservices', (SELECT id FROM categories WHERE name = 'Software Engineering')),
('Database Development', 'SQL, NoSQL, database design', (SELECT id FROM categories WHERE name = 'Software Engineering')),

-- Data & Analytics subcategories
('Data Science', 'Statistical analysis and modeling', (SELECT id FROM categories WHERE name = 'Data & Analytics')),
('Data Engineering', 'Data pipelines and infrastructure', (SELECT id FROM categories WHERE name = 'Data & Analytics')),
('Business Intelligence', 'BI tools and reporting', (SELECT id FROM categories WHERE name = 'Data & Analytics')),
('Data Analysis', 'Data analysis and insights', (SELECT id FROM categories WHERE name = 'Data & Analytics')),
('Big Data', 'Hadoop, Spark, distributed systems', (SELECT id FROM categories WHERE name = 'Data & Analytics')),
('Data Visualization', 'Tableau, Power BI, D3.js', (SELECT id FROM categories WHERE name = 'Data & Analytics')),

-- AI & Machine Learning subcategories
('Machine Learning Engineering', 'ML model development and deployment', (SELECT id FROM categories WHERE name = 'AI & Machine Learning')),
('Deep Learning', 'Neural networks and deep learning', (SELECT id FROM categories WHERE name = 'AI & Machine Learning')),
('Natural Language Processing', 'NLP and text processing', (SELECT id FROM categories WHERE name = 'AI & Machine Learning')),
('Computer Vision', 'Image and video processing', (SELECT id FROM categories WHERE name = 'AI & Machine Learning')),
('MLOps', 'ML operations and model management', (SELECT id FROM categories WHERE name = 'AI & Machine Learning')),
('Research Scientist', 'AI research and development', (SELECT id FROM categories WHERE name = 'AI & Machine Learning')),

-- DevOps & Infrastructure subcategories
('Cloud Engineering', 'AWS, Azure, GCP cloud platforms', (SELECT id FROM categories WHERE name = 'DevOps & Infrastructure')),
('DevOps Engineering', 'CI/CD, automation, deployment', (SELECT id FROM categories WHERE name = 'DevOps & Infrastructure')),
('Site Reliability Engineering', 'SRE and system reliability', (SELECT id FROM categories WHERE name = 'DevOps & Infrastructure')),
('Infrastructure Engineering', 'Server and network infrastructure', (SELECT id FROM categories WHERE name = 'DevOps & Infrastructure')),
('Platform Engineering', 'Developer platforms and tooling', (SELECT id FROM categories WHERE name = 'DevOps & Infrastructure')),
('Kubernetes', 'Container orchestration', (SELECT id FROM categories WHERE name = 'DevOps & Infrastructure')),

-- Mobile Development subcategories
('iOS Development', 'Swift, Objective-C, iOS apps', (SELECT id FROM categories WHERE name = 'Mobile Development')),
('Android Development', 'Kotlin, Java, Android apps', (SELECT id FROM categories WHERE name = 'Mobile Development')),
('React Native', 'Cross-platform React Native', (SELECT id FROM categories WHERE name = 'Mobile Development')),
('Flutter', 'Cross-platform Flutter development', (SELECT id FROM categories WHERE name = 'Mobile Development')),
('Mobile UI/UX', 'Mobile app design and UX', (SELECT id FROM categories WHERE name = 'Mobile Development')),

-- Cybersecurity subcategories
('Information Security', 'InfoSec and security analysis', (SELECT id FROM categories WHERE name = 'Cybersecurity')),
('Penetration Testing', 'Ethical hacking and pen testing', (SELECT id FROM categories WHERE name = 'Cybersecurity')),
('Security Engineering', 'Security architecture and engineering', (SELECT id FROM categories WHERE name = 'Cybersecurity')),
('Incident Response', 'Security incident management', (SELECT id FROM categories WHERE name = 'Cybersecurity')),
('Compliance & Governance', 'Security compliance and governance', (SELECT id FROM categories WHERE name = 'Cybersecurity')),

-- UI/UX Design subcategories
('User Experience Design', 'UX research and design', (SELECT id FROM categories WHERE name = 'UI/UX Design')),
('User Interface Design', 'UI design and visual design', (SELECT id FROM categories WHERE name = 'UI/UX Design')),
('Interaction Design', 'Interaction and motion design', (SELECT id FROM categories WHERE name = 'UI/UX Design')),
('Design Systems', 'Design system creation and management', (SELECT id FROM categories WHERE name = 'UI/UX Design')),
('Usability Testing', 'User testing and research', (SELECT id FROM categories WHERE name = 'UI/UX Design')),

-- Product Management subcategories
('Product Strategy', 'Product vision and strategy', (SELECT id FROM categories WHERE name = 'Product Management')),
('Product Marketing', 'Go-to-market and product marketing', (SELECT id FROM categories WHERE name = 'Product Management')),
('Technical Product Management', 'Technical PM for engineering teams', (SELECT id FROM categories WHERE name = 'Product Management')),
('Growth Product Management', 'Growth and optimization focused PM', (SELECT id FROM categories WHERE name = 'Product Management')),
('Product Analytics', 'Product metrics and analytics', (SELECT id FROM categories WHERE name = 'Product Management')),

-- Digital Marketing subcategories
('Performance Marketing', 'Paid advertising and performance', (SELECT id FROM categories WHERE name = 'Digital Marketing')),
('Email Marketing', 'Email campaigns and automation', (SELECT id FROM categories WHERE name = 'Digital Marketing')),
('Marketing Automation', 'Marketing tech and automation', (SELECT id FROM categories WHERE name = 'Digital Marketing')),
('Growth Marketing', 'Growth hacking and experimentation', (SELECT id FROM categories WHERE name = 'Digital Marketing')),
('Affiliate Marketing', 'Affiliate and partnership marketing', (SELECT id FROM categories WHERE name = 'Digital Marketing')),

-- Sales subcategories
('Inside Sales', 'Inbound and inside sales', (SELECT id FROM categories WHERE name = 'Sales')),
('Field Sales', 'Outside and field sales', (SELECT id FROM categories WHERE name = 'Sales')),
('Sales Development', 'SDR and lead generation', (SELECT id FROM categories WHERE name = 'Sales')),
('Account Management', 'Customer and account management', (SELECT id FROM categories WHERE name = 'Sales')),
('Sales Engineering', 'Technical sales and pre-sales', (SELECT id FROM categories WHERE name = 'Sales')),
('Business Development', 'Partnerships and business development', (SELECT id FROM categories WHERE name = 'Sales')),

-- Finance subcategories
('Financial Analysis', 'Financial modeling and analysis', (SELECT id FROM categories WHERE name = 'Finance')),
('Corporate Finance', 'Corporate financial management', (SELECT id FROM categories WHERE name = 'Finance')),
('Investment Banking', 'Investment banking and M&A', (SELECT id FROM categories WHERE name = 'Finance')),
('Financial Planning', 'FP&A and budgeting', (SELECT id FROM categories WHERE name = 'Finance')),
('Treasury', 'Treasury and cash management', (SELECT id FROM categories WHERE name = 'Finance')),

-- Human Resources subcategories
('HR Generalist', 'General HR and people operations', (SELECT id FROM categories WHERE name = 'Human Resources')),
('Compensation & Benefits', 'Comp, benefits, and total rewards', (SELECT id FROM categories WHERE name = 'Human Resources')),
('HR Business Partner', 'Strategic HR partnership', (SELECT id FROM categories WHERE name = 'Human Resources')),
('People Analytics', 'HR analytics and metrics', (SELECT id FROM categories WHERE name = 'Human Resources')),
('Employee Relations', 'Employee relations and engagement', (SELECT id FROM categories WHERE name = 'Human Resources')),

-- Customer Success subcategories
('Customer Success Management', 'CSM and account growth', (SELECT id FROM categories WHERE name = 'Customer Success')),
('Customer Onboarding', 'Customer onboarding and implementation', (SELECT id FROM categories WHERE name = 'Customer Success')),
('Customer Operations', 'Customer ops and process optimization', (SELECT id FROM categories WHERE name = 'Customer Success')),
('Customer Experience', 'CX design and optimization', (SELECT id FROM categories WHERE name = 'Customer Success')),

-- Quality Assurance subcategories
('Manual Testing', 'Manual QA and testing', (SELECT id FROM categories WHERE name = 'Quality Assurance')),
('Automation Testing', 'Test automation and frameworks', (SELECT id FROM categories WHERE name = 'Quality Assurance')),
('Performance Testing', 'Load and performance testing', (SELECT id FROM categories WHERE name = 'Quality Assurance')),
('Security Testing', 'Security and penetration testing', (SELECT id FROM categories WHERE name = 'Quality Assurance')),

-- Game Development subcategories
('Game Programming', 'Game engine and gameplay programming', (SELECT id FROM categories WHERE name = 'Game Development')),
('Game Design', 'Game mechanics and level design', (SELECT id FROM categories WHERE name = 'Game Development')),
('3D Modeling', '3D art and modeling for games', (SELECT id FROM categories WHERE name = 'Game Development')),
('Game Production', 'Game project management and production', (SELECT id FROM categories WHERE name = 'Game Development')),

-- Healthcare subcategories
('Nursing', 'Registered nurses and nursing roles', (SELECT id FROM categories WHERE name = 'Healthcare')),
('Medical Technology', 'Medical devices and health tech', (SELECT id FROM categories WHERE name = 'Healthcare')),
('Healthcare Administration', 'Healthcare management and admin', (SELECT id FROM categories WHERE name = 'Healthcare')),
('Clinical Research', 'Clinical trials and medical research', (SELECT id FROM categories WHERE name = 'Healthcare')),

-- Education subcategories
('K-12 Teaching', 'Elementary and secondary education', (SELECT id FROM categories WHERE name = 'Education')),
('Higher Education', 'University and college roles', (SELECT id FROM categories WHERE name = 'Education')),
('Educational Technology', 'EdTech and learning platforms', (SELECT id FROM categories WHERE name = 'Education')),
('Curriculum Development', 'Educational content and curriculum', (SELECT id FROM categories WHERE name = 'Education')),

-- Legal subcategories
('Corporate Law', 'Corporate legal counsel', (SELECT id FROM categories WHERE name = 'Legal')),
('Intellectual Property', 'IP law and patent work', (SELECT id FROM categories WHERE name = 'Legal')),
('Employment Law', 'Labor and employment law', (SELECT id FROM categories WHERE name = 'Legal')),
('Litigation', 'Litigation and dispute resolution', (SELECT id FROM categories WHERE name = 'Legal')),

-- Manufacturing subcategories
('Production Management', 'Manufacturing and production oversight', (SELECT id FROM categories WHERE name = 'Manufacturing')),
('Quality Control', 'Manufacturing quality and inspection', (SELECT id FROM categories WHERE name = 'Manufacturing')),
('Process Engineering', 'Manufacturing process optimization', (SELECT id FROM categories WHERE name = 'Manufacturing')),
('Supply Chain Management', 'Manufacturing supply chain', (SELECT id FROM categories WHERE name = 'Manufacturing')),

-- Retail subcategories
('Store Management', 'Retail store operations', (SELECT id FROM categories WHERE name = 'Retail')),
('Merchandising', 'Product merchandising and buying', (SELECT id FROM categories WHERE name = 'Retail')),
('Visual Merchandising', 'Store display and visual design', (SELECT id FROM categories WHERE name = 'Retail')),
('Retail Analytics', 'Retail data and analytics', (SELECT id FROM categories WHERE name = 'Retail'))

ON CONFLICT (name, category_id) DO NOTHING;

-- Create some sample job-category relationships for the new categories
-- This will help test the search functionality

-- Link some existing jobs to the new category system
INSERT INTO job_categories (job_id, category_id, subcategory_id) VALUES
-- Frontend Developer -> Software Engineering/Frontend Development
((SELECT id FROM jobs WHERE title = 'Senior Frontend Developer' LIMIT 1), 
 (SELECT id FROM categories WHERE name = 'Software Engineering'), 
 (SELECT id FROM subcategories WHERE name = 'Frontend Development')),

-- Data Scientist -> AI & Machine Learning/Machine Learning Engineering
((SELECT id FROM jobs WHERE title = 'Data Scientist' LIMIT 1), 
 (SELECT id FROM categories WHERE name = 'AI & Machine Learning'), 
 (SELECT id FROM subcategories WHERE name = 'Machine Learning Engineering')),

-- DevOps Engineer -> DevOps & Infrastructure/DevOps Engineering
((SELECT id FROM jobs WHERE title = 'Cloud DevOps Engineer' LIMIT 1), 
 (SELECT id FROM categories WHERE name = 'DevOps & Infrastructure'), 
 (SELECT id FROM subcategories WHERE name = 'DevOps Engineering')),

-- Product Manager -> Product Management/Product Strategy
((SELECT id FROM jobs WHERE title = 'Product Manager' LIMIT 1), 
 (SELECT id FROM categories WHERE name = 'Product Management'), 
 (SELECT id FROM subcategories WHERE name = 'Product Strategy')),

-- Full Stack Developer -> Software Engineering/Full Stack Development
((SELECT id FROM jobs WHERE title = 'Full Stack Developer' LIMIT 1), 
 (SELECT id FROM categories WHERE name = 'Software Engineering'), 
 (SELECT id FROM subcategories WHERE name = 'Full Stack Development'))

ON CONFLICT (job_id, category_id, subcategory_id) DO NOTHING;

-- Add some additional sample jobs with the new categories
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
  'Senior Machine Learning Engineer',
  'senior-ml-engineer-techcorp-2',
  'Join our AI team to build cutting-edge machine learning models and deploy them at scale.',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
  ARRAY['Python', 'TensorFlow', 'PyTorch', 'MLOps'],
  'https://techcorp.com/careers/ml-engineer',
  1,
  '2024-03-15',
  (SELECT id FROM auth.users LIMIT 1),
  (SELECT id FROM job_company WHERE company_username = 'techcorp'),
  'San Francisco, CA',
  'fulltime',
  'remote',
  '4-6 years',
  120000,
  180000,
  true
),
(
  'iOS Developer',
  'ios-developer-innovatelabs',
  'Build amazing iOS applications using Swift and the latest iOS technologies.',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
  ARRAY['Swift', 'iOS', 'Xcode', 'UIKit'],
  'https://innovatelabs.com/jobs/ios-developer',
  2,
  '2024-03-20',
  (SELECT id FROM auth.users LIMIT 1),
  (SELECT id FROM job_company WHERE company_username = 'innovatelabs'),
  'New York, NY',
  'fulltime',
  'office',
  '2-4 years',
  85000,
  125000,
  false
),
(
  'UX Designer',
  'ux-designer-startuphub',
  'Design intuitive user experiences for our portfolio of startup products.',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
  ARRAY['Figma', 'User Research', 'Prototyping', 'Design Systems'],
  'https://startuphub.com/careers/ux-designer',
  1,
  '2024-03-25',
  (SELECT id FROM auth.users LIMIT 1),
  (SELECT id FROM job_company WHERE company_username = 'startuphub'),
  'Boston, MA',
  'fulltime',
  'remote',
  '3-5 years',
  75000,
  115000,
  false
),
(
  'Cybersecurity Analyst',
  'cybersecurity-analyst-cloudtech',
  'Protect our cloud infrastructure and investigate security incidents.',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
  ARRAY['Security', 'Incident Response', 'SIEM', 'Threat Analysis'],
  'https://cloudtech.com/careers/security-analyst',
  2,
  '2024-04-01',
  (SELECT id FROM auth.users LIMIT 1),
  (SELECT id FROM job_company WHERE company_username = 'cloudtech'),
  'Seattle, WA',
  'fulltime',
  'office',
  '2-4 years',
  90000,
  130000,
  true
),
(
  'Digital Marketing Manager',
  'digital-marketing-manager-dataflow',
  'Lead our digital marketing efforts and drive customer acquisition.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
  ARRAY['Google Ads', 'Facebook Ads', 'Analytics', 'SEO'],
  'https://dataflow.com/jobs/marketing-manager',
  1,
  '2024-04-05',
  (SELECT id FROM auth.users LIMIT 1),
  (SELECT id FROM job_company WHERE company_username = 'dataflow'),
  'Austin, TX',
  'fulltime',
  'remote',
  '3-6 years',
  70000,
  105000,
  false
);

-- Link the new jobs to categories
INSERT INTO job_categories (job_id, category_id, subcategory_id) VALUES
-- ML Engineer -> AI & Machine Learning/Machine Learning Engineering
((SELECT id FROM jobs WHERE slug = 'senior-ml-engineer-techcorp-2'), 
 (SELECT id FROM categories WHERE name = 'AI & Machine Learning'), 
 (SELECT id FROM subcategories WHERE name = 'Machine Learning Engineering')),

-- iOS Developer -> Mobile Development/iOS Development
((SELECT id FROM jobs WHERE slug = 'ios-developer-innovatelabs'), 
 (SELECT id FROM categories WHERE name = 'Mobile Development'), 
 (SELECT id FROM subcategories WHERE name = 'iOS Development')),

-- UX Designer -> UI/UX Design/User Experience Design
((SELECT id FROM jobs WHERE slug = 'ux-designer-startuphub'), 
 (SELECT id FROM categories WHERE name = 'UI/UX Design'), 
 (SELECT id FROM subcategories WHERE name = 'User Experience Design')),

-- Cybersecurity Analyst -> Cybersecurity/Information Security
((SELECT id FROM jobs WHERE slug = 'cybersecurity-analyst-cloudtech'), 
 (SELECT id FROM categories WHERE name = 'Cybersecurity'), 
 (SELECT id FROM subcategories WHERE name = 'Information Security')),

-- Digital Marketing Manager -> Digital Marketing/Performance Marketing
((SELECT id FROM jobs WHERE slug = 'digital-marketing-manager-dataflow'), 
 (SELECT id FROM categories WHERE name = 'Digital Marketing'), 
 (SELECT id FROM subcategories WHERE name = 'Performance Marketing'))

ON CONFLICT (job_id, category_id, subcategory_id) DO NOTHING;