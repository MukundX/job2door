# Jobler - Job Platform

A Next.js job platform with Google authentication, user onboarding, admin panel, and job management.

## Features

- 🔐 Google OAuth authentication
- 👤 User onboarding with profile setup
- 🏢 Company/Individual user types
- 👨‍💼 Admin panel for job management
- 📝 Rich job posting with status management
- 🎯 Public job listings
- 📱 Responsive design with Tailwind CSS

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Set up Supabase Database

Run these SQL commands in your Supabase SQL editor:

```sql
-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  google_avatar_url text,
  telegram_username text,
  linkedin_username text,
  twitter_username text,
  username text NOT NULL UNIQUE,
  user_type text CHECK (user_type IN ('individual', 'company', 'admin')) NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- Admins table
CREATE TABLE admins (
  id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  admin_username text NOT NULL UNIQUE,
  admin_password_hash text NOT NULL
);

-- Jobs table
CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  image_url text,
  tags text[],
  apply_link text,
  total_seats integer,
  deadline timestamp with time zone,
  status text CHECK (status IN ('public', 'unpublic')) DEFAULT 'unpublic',
  created_by uuid REFERENCES users(id),
  created_at timestamp with time zone DEFAULT timezone('utc', now()),
  updated_at timestamp with time zone DEFAULT timezone('utc', now())
);
```

### 4. Configure Google OAuth

1. Go to your Supabase project > Authentication > Providers
2. Enable Google provider
3. Add your Google OAuth credentials (Client ID and Secret)

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel
│   ├── dashboard/         # User dashboard
│   ├── job/[slug]/        # Dynamic job pages
│   ├── onboard/           # User onboarding
│   ├── p/                 # User profile
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── AuthProvider.tsx  # Authentication context
│   ├── LoadingSpinner.tsx
│   └── Navbar.tsx
└── lib/                  # Utility functions
    └── supabase.ts       # Supabase client
```

## Usage

1. **Landing Page**: Welcome page with Onboard/Dashboard button
2. **Onboarding**: Google auth → User type selection → Profile setup
3. **Dashboard**: View jobs (if any are posted)
4. **Admin Panel**: Create and manage jobs (admin only)
5. **Profile**: View and edit user information
6. **Job Pages**: Public job listings at `/job/{job-title}`

## Development

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Authentication**: Google OAuth via Supabase Auth
- **Styling**: Tailwind CSS with custom components

## TODO

- [ ] Implement actual Supabase database operations
- [ ] Add rich text editor for job descriptions
- [ ] Implement job status management
- [ ] Add image upload functionality
- [ ] Create username suggestion API
- [ ] Add admin password verification
- [ ] Implement job search and filtering
- [ ] Add email notifications
- [ ] Mobile responsiveness improvements
