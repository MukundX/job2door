import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '../../../../lib/database';

export async function GET(request: NextRequest) {
  try {
    console.log('Auth callback received:', request.url);
    
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    if (!code) {
      console.error('No authorization code received');
      return NextResponse.redirect(new URL('/onboard?error=no_code', request.url));
    }

    // Validate environment variables
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/callback';

    if (!clientId || !clientSecret) {
      console.error('Missing Google OAuth credentials in environment variables');
      return NextResponse.redirect(new URL('/onboard?error=missing_credentials', request.url));
    }

    console.log('Exchanging code for tokens...');

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokenData);
      return NextResponse.redirect(new URL('/onboard?error=token_exchange_failed', request.url));
    }

    console.log('Token exchange successful, fetching user info...');

    // Get user info using access token
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userInfo = await userInfoResponse.json();

    if (!userInfoResponse.ok) {
      console.error('User info fetch failed:', userInfo);
      return NextResponse.redirect(new URL('/onboard?error=user_info_failed', request.url));
    }

    console.log('User info received:', { email: userInfo.email, name: userInfo.name });

    // Check if user already exists
    const existingUser = await getUserByEmail(userInfo.email);
    
    if (existingUser) {
      console.log('User already exists, redirecting to dashboard');
      // User exists, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    console.log('New user, redirecting to onboarding step 2');

    // Store user info in session/cookie for onboarding completion
    const response = NextResponse.redirect(new URL('/onboard?step=2&google_data=' + encodeURIComponent(JSON.stringify(userInfo)), request.url));
    
    // Set a cookie with user info for the onboarding process
    response.cookies.set('google_user_data', JSON.stringify(userInfo), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10, // 10 minutes
    });

    return response;

  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/onboard?error=callback_failed', request.url));
  }
} 