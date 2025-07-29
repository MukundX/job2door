# Quick Setup Guide for Jobler

## Step 1: Create Environment File

Create a `.env.local` file in the root directory with your actual credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
```

## Step 2: Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to Settings > API
3. Copy the "Project URL" and "anon public" key
4. Replace the placeholders in `.env.local`

## Step 3: Get Google OAuth Credentials

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
   - Replace the placeholders in `.env.local`

## Step 4: Set up Database Tables

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

## Step 5: Test the Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000/onboard

3. Click "Continue with Google"

4. You should be redirected to Google OAuth and then back to the onboarding flow

## Troubleshooting

### If you get a 404 on /auth/callback:
- Check that your `.env.local` file exists and has the correct values
- Verify that Google OAuth redirect URI matches exactly: `http://localhost:3000/auth/callback`
- Check the browser console and server logs for detailed error messages

### If Google OAuth fails:
- Verify your Google Client ID and Secret are correct
- Make sure Google+ API is enabled in Google Cloud Console
- Check that the redirect URI is authorized in your Google OAuth credentials

### If database operations fail:
- Verify your Supabase URL and anon key are correct
- Make sure the database tables are created in Supabase
- Check the server logs for database connection errors

## Expected Flow

1. User clicks "Continue with Google" on `/onboard`
2. User is redirected to Google OAuth consent screen
3. After consent, Google redirects to `/auth/callback?code=...`
4. Callback exchanges code for user info
5. User is redirected to `/onboard?step=2&google_data=...`
6. User completes profile setup
7. User data is saved to Supabase
8. User is redirected to `/dashboard` 