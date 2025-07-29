# Database Setup Guide for Jobler Platform

This guide explains how to properly set up the database with categories, subcategories, and job linking for the Jobler job platform.

## 📋 Prerequisites

- Supabase project set up
- Access to Supabase SQL Editor or psql command line
- Existing `jobs` and `job_company` tables

## 🚀 Setup Steps

### Step 1: Run Basic Database Updates
First, run the basic database schema updates:

```sql
-- File: database_updates.sql
-- This creates the category system and basic sample data
```

Execute [`database_updates.sql`](database_updates.sql) in your Supabase SQL Editor.

### Step 2: Add Comprehensive Categories
Next, add the comprehensive category and subcategory data:

```sql
-- File: comprehensive_categories.sql
-- This adds 30+ categories and 100+ subcategories
```

Execute [`comprehensive_categories.sql`](comprehensive_categories.sql) in your Supabase SQL Editor.

### Step 3: Fix Job-Category Links
Finally, link all existing jobs to the new category system:

```sql
-- File: fix_job_category_links.sql
-- This links existing jobs to categories and adds sample jobs
```

Execute [`fix_job_category_links.sql`](fix_job_category_links.sql) in your Supabase SQL Editor.

## 🔍 Verification

After running all scripts, verify the setup:

### Check Categories
```sql
SELECT COUNT(*) as category_count FROM categories;
-- Should return 30+ categories
```

### Check Subcategories
```sql
SELECT COUNT(*) as subcategory_count FROM subcategories;
-- Should return 100+ subcategories
```

### Check Job-Category Links
```sql
SELECT COUNT(*) as linked_jobs FROM job_categories;
-- Should return the number of jobs linked to categories
```

### View Jobs with Categories
```sql
SELECT 
    j.title,
    c.name as category,
    s.name as subcategory,
    j.salary_min,
    j.salary_max
FROM jobs j
LEFT JOIN job_categories jc ON j.id = jc.job_id
LEFT JOIN categories c ON jc.category_id = c.id
LEFT JOIN subcategories s ON jc.subcategory_id = s.id
ORDER BY j.created_at DESC
LIMIT 10;
```

## 📊 Database Schema Overview

### Tables Created/Modified:

1. **`categories`** - Main job categories (Engineering, Design, Marketing, etc.)
2. **`subcategories`** - Specific subcategories linked to main categories
3. **`job_categories`** - Junction table linking jobs to categories (many-to-many)
4. **`jobs`** - Enhanced with salary fields and company references
5. **`job_company`** - Company information for jobs

### Key Relationships:

```
jobs ←→ job_categories ←→ categories
                    ↓
               subcategories
```

## 🎯 Features Enabled

After setup, your platform will have:

- ✅ **Category-based job filtering**
- ✅ **Subcategory selection**
- ✅ **Salary range filtering**
- ✅ **Work type filtering (remote/office)**
- ✅ **Job type filtering (fulltime/parttime/contract)**
- ✅ **Company profile linking**
- ✅ **Salary display in job cards**

## 🔧 Troubleshooting

### Categories Not Showing in Search
1. Check if categories table has data: `SELECT * FROM categories LIMIT 5;`
2. Verify Supabase RLS policies allow reading from categories table
3. Check browser console for any API errors

### Jobs Not Filtering by Category
1. Verify job_categories table has links: `SELECT * FROM job_categories LIMIT 5;`
2. Check if the search query includes proper joins
3. Ensure subcategories are linked to correct categories

### Salary Not Displaying
1. Check if jobs have salary_min/salary_max values: `SELECT title, salary_min, salary_max FROM jobs WHERE salary_min IS NOT NULL LIMIT 5;`
2. Verify JobCard component is updated with salary display logic

## 📝 Sample Data Included

The setup includes sample data for:
- **5 Companies** (TechCorp, InnovateLabs, DataFlow, CloudTech, StartupHub)
- **10+ Sample Jobs** with proper category links
- **30+ Categories** covering major job sectors
- **100+ Subcategories** for specific job roles

## 🚀 Next Steps

1. Run the SQL files in order
2. Test the search functionality at `/search`
3. Verify category filtering works
4. Check salary display in job cards
5. Test company profile links

Your Jobler platform is now ready with a comprehensive job categorization and search system!