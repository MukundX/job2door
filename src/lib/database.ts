import { supabase } from './supabase';

export interface User {
  id: string;
  email: string;
  name: string;
  google_avatar_url: string;
  telegram_username?: string;
  linkedin_username?: string;
  twitter_username?: string;
  username: string;
  user_type: 'individual' | 'company' | 'admin';
  created_at: string;
}

export interface CreateUserData {
  email: string;
  name: string;
  google_avatar_url: string;
  telegram_username?: string;
  linkedin_username?: string;
  twitter_username?: string;
  username: string;
  user_type: 'individual' | 'company' | 'admin';
}

export async function createUser(userData: CreateUserData): Promise<User | null> {
  console.log('Creating user with data:', userData);
  
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating user:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      return null;
    }

    console.log('User created successfully:', data);
    return data;
  } catch (error) {
    console.error('Exception in createUser:', error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Exception in getUserByEmail:', error);
    return null;
  }
}

export async function getUserByUsername(username: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      console.error('Error fetching user by username:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Exception in getUserByUsername:', error);
    return null;
  }
}

export async function updateUser(userId: string, updates: Partial<CreateUserData>): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Exception in updateUser:', error);
    return null;
  }
}

export async function checkUsernameAvailability(username: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single();

    if (error && error.code === 'PGRST116') {
      // No rows returned, username is available
      return true;
    }

    if (error) {
      console.error('Error checking username availability:', error);
      return false;
    }

    // Username exists, not available
    return false;
  } catch (error) {
    console.error('Exception in checkUsernameAvailability:', error);
    return false;
  }
}

export async function getUsernameSuggestions(baseUsername: string): Promise<string[]> {
  const suggestions = [
    baseUsername,
    `${baseUsername}123`,
    `${baseUsername}_jobler`,
    `${baseUsername}${Math.floor(Math.random() * 1000)}`,
    `${baseUsername}_${Date.now().toString().slice(-4)}`
  ];

  // Check availability and return only available usernames
  const availableSuggestions = [];
  for (const suggestion of suggestions) {
    const isAvailable = await checkUsernameAvailability(suggestion);
    if (isAvailable) {
      availableSuggestions.push(suggestion);
    }
  }

  return availableSuggestions.slice(0, 3);
} 