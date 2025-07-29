import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUsernameSuggestions, checkUsernameAvailability } from '../../../lib/database';

export async function POST(request: NextRequest) {
  try {
    console.log('User creation API called');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { email, name, google_avatar_url, telegram_username, linkedin_username, twitter_username, username, user_type } = body;

    // Validate required fields
    if (!email || !name || !google_avatar_url || !username || !user_type) {
      console.error('Missing required fields:', { email, name, google_avatar_url, username, user_type });
      return NextResponse.json({ 
        error: 'Missing required fields',
        missing: {
          email: !email,
          name: !name,
          google_avatar_url: !google_avatar_url,
          username: !username,
          user_type: !user_type
        }
      }, { status: 400 });
    }

    console.log('Checking username availability for:', username);
    
    // Check username availability
    const isUsernameAvailable = await checkUsernameAvailability(username);
    if (!isUsernameAvailable) {
      console.error('Username already taken:', username);
      return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
    }

    console.log('Username available, creating user...');

    // Create user
    const user = await createUser({
      email,
      name,
      google_avatar_url,
      telegram_username,
      linkedin_username,
      twitter_username,
      username,
      user_type
    });

    if (!user) {
      console.error('User creation returned null');
      return NextResponse.json({ error: 'Failed to create user - database operation failed' }, { status: 500 });
    }

    console.log('User created successfully:', user);
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const baseUsername = searchParams.get('username');

    if (!baseUsername) {
      return NextResponse.json({ error: 'Username parameter required' }, { status: 400 });
    }

    const suggestions = await getUsernameSuggestions(baseUsername);
    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Error getting username suggestions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 