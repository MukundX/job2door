# Environment Setup for Jobler

## 1. Create `.env.local` file

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
```

## 2. Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to Settings > API
3. Copy the "Project URL" and "anon public" key
4. Add them to your `.env.local` file

## 3. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/auth/callback` (for development)
   - Copy the Client ID and Client Secret
   - Add them to your `.env.local` file

## 4. Set up Database Tables

Run these SQL commands in your Supabase SQL editor:

```sql
-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  name text NOT NULL,
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

## 5. Run the Application

```bash
npm run dev
```

The app will now use direct Google OAuth and store all user data in your custom database tables instead of Supabase auth. 