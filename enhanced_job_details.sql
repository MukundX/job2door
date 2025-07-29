-- Enhanced Job Details Schema and Data
-- This file adds dedicated columns for job details and populates them with logical content

-- Add new columns to jobs table for detailed job information
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS about_role TEXT;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS qualifications TEXT[];
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS responsibilities TEXT[];
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS attachments JSONB;

-- Update existing jobs with detailed content based on their categories and roles

-- Senior Frontend Developer (TechCorp)
UPDATE jobs SET 
  about_role = 'As a Senior Frontend Developer at TechCorp, you''ll focus on building user-friendly interfaces for our cutting-edge web applications. You''ll work with modern frameworks like React and TypeScript to create responsive, accessible, and performant user experiences. Your innovative solutions will enhance user engagement across multiple platforms and help drive our company''s digital transformation.',
  qualifications = ARRAY[
    'At least 3-5 years of relevant experience in frontend development or related roles',
    'Strong proficiency in React, TypeScript, JavaScript, and modern CSS frameworks',
    'Experience with state management libraries (Redux, Zustand) and testing frameworks',
    'Knowledge of responsive design principles and cross-browser compatibility',
    'Familiarity with version control systems (Git) and agile development methodologies'
  ],
  responsibilities = ARRAY[
    'Develop and maintain responsive web applications using React and TypeScript',
    'Collaborate with UX/UI designers to implement pixel-perfect designs',
    'Optimize application performance and ensure cross-browser compatibility',
    'Write clean, maintainable code and conduct code reviews',
    'Participate in agile development processes and sprint planning',
    'Mentor junior developers and contribute to technical documentation'
  ],
  attachments = '[
    {"name": "Frontend_Developer_Requirements.pdf", "size": "2.5 MB", "type": "PDF", "url": "/attachments/frontend-req.pdf"},
    {"name": "TechCorp_Benefits_Package.pdf", "size": "1.8 MB", "type": "PDF", "url": "/attachments/benefits.pdf"}
  ]'::jsonb
WHERE slug = 'senior-frontend-developer-techcorp';

-- Data Scientist (DataFlow)
UPDATE jobs SET 
  about_role = 'Join our Data Science team at DataFlow Systems to work on cutting-edge machine learning models and data analysis projects. You''ll be responsible for extracting insights from large datasets, building predictive models, and developing data-driven solutions that impact business decisions. This role offers the opportunity to work with the latest ML technologies and contribute to innovative data products.',
  qualifications = ARRAY[
    'At least 2-4 years of experience in data science, machine learning, or analytics',
    'Strong programming skills in Python, R, and SQL with experience in data manipulation',
    'Proficiency with ML frameworks like TensorFlow, PyTorch, or Scikit-learn',
    'Experience with data visualization tools (Tableau, Power BI, or matplotlib)',
    'Strong statistical knowledge and experience with A/B testing methodologies',
    'Master''s degree in Data Science, Statistics, Computer Science, or related field preferred'
  ],
  responsibilities = ARRAY[
    'Design and implement machine learning models for business applications',
    'Analyze large datasets to identify trends, patterns, and actionable insights',
    'Collaborate with engineering teams to deploy models into production',
    'Create data visualizations and reports for stakeholders',
    'Conduct A/B tests and statistical analysis to measure impact',
    'Stay current with latest developments in machine learning and data science'
  ],
  attachments = '[
    {"name": "Data_Science_Role_Overview.pdf", "size": "3.2 MB", "type": "PDF", "url": "/attachments/ds-overview.pdf"},
    {"name": "ML_Tech_Stack_Guide.pdf", "size": "2.1 MB", "type": "PDF", "url": "/attachments/ml-stack.pdf"}
  ]'::jsonb
WHERE slug = 'data-scientist-dataflow';

-- Cloud DevOps Engineer (CloudTech)
UPDATE jobs SET 
  about_role = 'As a Cloud DevOps Engineer at CloudTech Inc, you''ll focus on AWS, Kubernetes, and CI/CD pipeline management. You''ll be responsible for designing and maintaining scalable cloud infrastructure, automating deployment processes, and ensuring high availability of our services. This role is perfect for someone passionate about cloud technologies and infrastructure automation.',
  qualifications = ARRAY[
    'At least 3-6 years of experience in DevOps, cloud infrastructure, or system administration',
    'Strong experience with AWS services (EC2, S3, RDS, Lambda, CloudFormation)',
    'Proficiency with containerization technologies (Docker, Kubernetes)',
    'Experience with CI/CD tools (Jenkins, GitLab CI, GitHub Actions)',
    'Knowledge of Infrastructure as Code (Terraform, CloudFormation)',
    'Scripting skills in Python, Bash, or PowerShell'
  ],
  responsibilities = ARRAY[
    'Design and manage scalable cloud infrastructure on AWS',
    'Implement and maintain CI/CD pipelines for automated deployments',
    'Monitor system performance and implement optimization strategies',
    'Ensure security best practices and compliance requirements',
    'Collaborate with development teams to improve deployment processes',
    'Troubleshoot production issues and implement preventive measures'
  ],
  attachments = '[
    {"name": "DevOps_Infrastructure_Guide.pdf", "size": "4.1 MB", "type": "PDF", "url": "/attachments/devops-guide.pdf"},
    {"name": "AWS_Certification_Path.pdf", "size": "1.5 MB", "type": "PDF", "url": "/attachments/aws-cert.pdf"}
  ]'::jsonb
WHERE slug = 'devops-engineer-cloudtech';

-- Product Manager (InnovateLabs)
UPDATE jobs SET 
  about_role = 'Lead product strategy and management for innovative software products at InnovateLabs. You''ll be responsible for managing the entire product lifecycle from conception to launch, working closely with engineering, design, and marketing teams. This role requires strong analytical skills and the ability to translate market needs into successful product features.',
  qualifications = ARRAY[
    'At least 4-7 years of experience in product management or related roles',
    'Strong analytical skills with experience in product metrics and KPIs',
    'Experience with agile development methodologies and product management tools',
    'Excellent communication and stakeholder management skills',
    'Background in technology products with understanding of software development',
    'MBA or relevant advanced degree preferred'
  ],
  responsibilities = ARRAY[
    'Define product vision, strategy, and roadmap based on market research',
    'Collaborate with engineering teams to prioritize features and manage backlogs',
    'Conduct user research and analyze product metrics to drive decisions',
    'Work with marketing teams to develop go-to-market strategies',
    'Manage stakeholder relationships and communicate product updates',
    'Lead cross-functional teams to deliver products on time and within scope'
  ],
  attachments = '[
    {"name": "Product_Management_Framework.pdf", "size": "2.8 MB", "type": "PDF", "url": "/attachments/pm-framework.pdf"},
    {"name": "Innovation_Strategy_2024.pdf", "size": "3.5 MB", "type": "PDF", "url": "/attachments/innovation-strategy.pdf"}
  ]'::jsonb
WHERE slug = 'product-manager-innovatelabs';

-- Full Stack Developer (StartupHub)
UPDATE jobs SET 
  about_role = 'Join our dynamic team at StartupHub as a Full Stack Developer working with startups in our incubator program. You''ll have the opportunity to work on diverse projects, from MVP development to scaling applications. This role offers exposure to various technologies and the chance to make a significant impact on emerging businesses.',
  qualifications = ARRAY[
    'At least 2-5 years of experience in full-stack web development',
    'Proficiency in React, Node.js, and modern JavaScript/TypeScript',
    'Experience with databases (MongoDB, PostgreSQL) and API development',
    'Knowledge of cloud platforms and deployment strategies',
    'Understanding of software development best practices and testing',
    'Startup experience or entrepreneurial mindset preferred'
  ],
  responsibilities = ARRAY[
    'Develop end-to-end web applications using React and Node.js',
    'Design and implement RESTful APIs and database schemas',
    'Collaborate with startup founders to understand and implement requirements',
    'Participate in code reviews and maintain high code quality standards',
    'Deploy and maintain applications on cloud platforms',
    'Mentor other developers and contribute to technical decision-making'
  ],
  attachments = '[
    {"name": "Startup_Tech_Stack_Overview.pdf", "size": "2.3 MB", "type": "PDF", "url": "/attachments/startup-stack.pdf"},
    {"name": "Incubator_Program_Benefits.pdf", "size": "1.9 MB", "type": "PDF", "url": "/attachments/incubator-benefits.pdf"}
  ]'::jsonb
WHERE slug = 'fullstack-developer-startuphub';

-- Senior ML Engineer (TechCorp)
UPDATE jobs SET 
  about_role = 'Join our AI team at TechCorp to build cutting-edge machine learning models and deploy them at scale. You''ll work on challenging problems involving natural language processing, computer vision, and predictive analytics. This role offers the opportunity to work with large datasets and implement ML solutions that serve millions of users.',
  qualifications = ARRAY[
    'At least 4-6 years of experience in machine learning engineering or related fields',
    'Strong programming skills in Python with experience in ML frameworks (TensorFlow, PyTorch)',
    'Experience with MLOps practices and model deployment in production',
    'Knowledge of distributed computing and big data technologies (Spark, Hadoop)',
    'Understanding of software engineering best practices and version control',
    'PhD in Machine Learning, Computer Science, or related field preferred'
  ],
  responsibilities = ARRAY[
    'Design and implement scalable machine learning systems and pipelines',
    'Optimize model performance and ensure efficient resource utilization',
    'Collaborate with data scientists to productionize research models',
    'Implement monitoring and alerting systems for ML models in production',
    'Research and evaluate new ML techniques and technologies',
    'Mentor junior engineers and contribute to technical architecture decisions'
  ],
  attachments = '[
    {"name": "ML_Engineering_Best_Practices.pdf", "size": "3.7 MB", "type": "PDF", "url": "/attachments/ml-best-practices.pdf"},
    {"name": "AI_Research_Opportunities.pdf", "size": "2.4 MB", "type": "PDF", "url": "/attachments/ai-research.pdf"}
  ]'::jsonb
WHERE slug = 'senior-ml-engineer-techcorp-2';

-- iOS Developer (InnovateLabs)
UPDATE jobs SET 
  about_role = 'Build amazing iOS applications using Swift and the latest iOS technologies at InnovateLabs. You''ll be responsible for developing user-friendly mobile applications that provide exceptional user experiences. This role involves working with cutting-edge iOS features and contributing to apps used by thousands of users.',
  qualifications = ARRAY[
    'At least 2-4 years of experience in iOS development with Swift',
    'Strong understanding of iOS SDK, Xcode, and Apple development guidelines',
    'Experience with UIKit, SwiftUI, and iOS design patterns (MVC, MVVM)',
    'Knowledge of Core Data, networking, and third-party library integration',
    'Understanding of App Store submission process and Apple review guidelines',
    'Experience with version control systems and collaborative development'
  ],
  responsibilities = ARRAY[
    'Develop and maintain high-quality iOS applications using Swift',
    'Implement user interfaces following Apple''s Human Interface Guidelines',
    'Integrate with backend APIs and handle data persistence',
    'Optimize app performance and ensure smooth user experiences',
    'Collaborate with designers to implement pixel-perfect UI/UX',
    'Participate in code reviews and maintain coding standards'
  ],
  attachments = '[
    {"name": "iOS_Development_Guidelines.pdf", "size": "2.1 MB", "type": "PDF", "url": "/attachments/ios-guidelines.pdf"},
    {"name": "Mobile_App_Architecture.pdf", "size": "1.7 MB", "type": "PDF", "url": "/attachments/mobile-architecture.pdf"}
  ]'::jsonb
WHERE slug = 'ios-developer-innovatelabs';

-- UX Designer (StartupHub)
UPDATE jobs SET 
  about_role = 'Design intuitive user experiences for our portfolio of startup products at StartupHub. You''ll work closely with founders and development teams to create user-centered designs that solve real problems. This role offers the opportunity to work on diverse projects and make a significant impact on user satisfaction and business success.',
  qualifications = ARRAY[
    'At least 3-5 years of experience in UX design or related fields',
    'Proficiency in design tools like Figma, Sketch, or Adobe Creative Suite',
    'Strong understanding of user research methodologies and usability testing',
    'Experience with prototyping and design system creation',
    'Knowledge of accessibility standards and inclusive design principles',
    'Portfolio demonstrating successful UX projects and design thinking process'
  ],
  responsibilities = ARRAY[
    'Conduct user research and analyze user behavior to inform design decisions',
    'Create wireframes, prototypes, and high-fidelity designs for web and mobile',
    'Develop and maintain design systems and style guides',
    'Collaborate with developers to ensure accurate implementation of designs',
    'Conduct usability testing and iterate based on user feedback',
    'Present design concepts and rationale to stakeholders and clients'
  ],
  attachments = '[
    {"name": "UX_Design_Process_Guide.pdf", "size": "3.1 MB", "type": "PDF", "url": "/attachments/ux-process.pdf"},
    {"name": "Design_System_Examples.pdf", "size": "4.2 MB", "type": "PDF", "url": "/attachments/design-systems.pdf"}
  ]'::jsonb
WHERE slug = 'ux-designer-startuphub';

-- Cybersecurity Analyst (CloudTech)
UPDATE jobs SET 
  about_role = 'Protect our cloud infrastructure and investigate security incidents as a Cybersecurity Analyst at CloudTech Inc. You''ll be responsible for monitoring security threats, implementing security measures, and responding to incidents. This role is crucial for maintaining the security and integrity of our systems and customer data.',
  qualifications = ARRAY[
    'At least 2-4 years of experience in cybersecurity or information security',
    'Knowledge of security frameworks (NIST, ISO 27001) and compliance requirements',
    'Experience with SIEM tools, threat analysis, and incident response',
    'Understanding of network security, encryption, and vulnerability assessment',
    'Relevant certifications (CISSP, CEH, Security+) preferred',
    'Strong analytical skills and attention to detail'
  ],
  responsibilities = ARRAY[
    'Monitor security events and analyze potential threats using SIEM tools',
    'Investigate security incidents and coordinate response efforts',
    'Conduct vulnerability assessments and penetration testing',
    'Develop and maintain security policies and procedures',
    'Collaborate with IT teams to implement security controls',
    'Provide security awareness training and education to employees'
  ],
  attachments = '[
    {"name": "Security_Incident_Response_Plan.pdf", "size": "2.9 MB", "type": "PDF", "url": "/attachments/incident-response.pdf"},
    {"name": "Cybersecurity_Framework.pdf", "size": "3.3 MB", "type": "PDF", "url": "/attachments/security-framework.pdf"}
  ]'::jsonb
WHERE slug = 'cybersecurity-analyst-cloudtech';

-- Digital Marketing Manager (DataFlow)
UPDATE jobs SET 
  about_role = 'Lead our digital marketing efforts and drive customer acquisition as a Digital Marketing Manager at DataFlow Systems. You''ll be responsible for developing and executing comprehensive digital marketing strategies across multiple channels. This role offers the opportunity to work with cutting-edge marketing technologies and data-driven approaches.',
  qualifications = ARRAY[
    'At least 3-6 years of experience in digital marketing or related roles',
    'Proficiency with Google Ads, Facebook Ads, and other advertising platforms',
    'Strong analytical skills with experience in Google Analytics and marketing metrics',
    'Knowledge of SEO, content marketing, and email marketing best practices',
    'Experience with marketing automation tools and CRM systems',
    'Bachelor''s degree in Marketing, Communications, or related field'
  ],
  responsibilities = ARRAY[
    'Develop and execute comprehensive digital marketing strategies',
    'Manage paid advertising campaigns across Google, Facebook, and other platforms',
    'Analyze campaign performance and optimize for ROI and conversion rates',
    'Create and manage content marketing initiatives and SEO strategies',
    'Collaborate with sales teams to align marketing and sales objectives',
    'Stay current with digital marketing trends and emerging technologies'
  ],
  attachments = '[
    {"name": "Digital_Marketing_Strategy_2024.pdf", "size": "2.6 MB", "type": "PDF", "url": "/attachments/marketing-strategy.pdf"},
    {"name": "Performance_Marketing_KPIs.pdf", "size": "1.4 MB", "type": "PDF", "url": "/attachments/marketing-kpis.pdf"}
  ]'::jsonb
WHERE slug = 'digital-marketing-manager-dataflow';

-- Verify the updates
SELECT 
  title,
  slug,
  CASE 
    WHEN about_role IS NOT NULL THEN 'Updated'
    ELSE 'Missing'
  END as about_role_status,
  CASE 
    WHEN qualifications IS NOT NULL THEN array_length(qualifications, 1)
    ELSE 0
  END as qualifications_count,
  CASE 
    WHEN responsibilities IS NOT NULL THEN array_length(responsibilities, 1)
    ELSE 0
  END as responsibilities_count,
  CASE 
    WHEN attachments IS NOT NULL THEN jsonb_array_length(attachments)
    ELSE 0
  END as attachments_count
FROM jobs 
WHERE slug IN (
  'senior-frontend-developer-techcorp',
  'data-scientist-dataflow',
  'devops-engineer-cloudtech',
  'product-manager-innovatelabs',
  'fullstack-developer-startuphub',
  'senior-ml-engineer-techcorp-2',
  'ios-developer-innovatelabs',
  'ux-designer-startuphub',
  'cybersecurity-analyst-cloudtech',
  'digital-marketing-manager-dataflow'
)
ORDER BY created_at DESC;