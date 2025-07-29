# Google OAuth Setup for Jobler

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/auth/callback` (for development)
     - `https://your-domain.com/auth/callback` (for production)
5. Copy your **Client ID** and **Client Secret**

## Step 2: Configure Supabase

1. Go to your Supabase project dashboard
2. Navigate to "Authentication" > "Providers"
3. Find "Google" and click "Edit"
4. Enable Google provider
5. Add your Google credentials:
   - **Client ID**: Your Google OAuth Client ID
   - **Client Secret**: Your Google OAuth Client Secret
6. Save the configuration

## Step 3: Update Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 4: Test Authentication

1. Run your development server: `npm run dev`
2. Go to the onboarding page
3. Click "Connect with Google"
4. You should be redirected to Google's OAuth consent screen

## Troubleshooting

- Make sure your redirect URIs match exactly
- Check that Google+ API is enabled
- Verify your Supabase project settings
- Check browser console for any errors 