import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET() {
  try {
    // Test: Check if we can connect to Supabase and insert/delete a test user
    const { error: connectionError } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (connectionError) {
      console.error('Database connection error:', connectionError);
      return NextResponse.json({
        status: 'error',
        message: 'Database connection failed',
        error: connectionError
      }, { status: 500 });
    }

    // Try to insert a test record (delete it immediately after)
    const testUser = {
      email: 'test@example.com',
      name: 'Test User',
      google_avatar_url: 'https://example.com/avatar.jpg',
      username: 'testuser_' + Date.now(),
      user_type: 'individual'
    };

    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert([testUser])
      .select()
      .single();

    if (insertError) {
      console.error('Insert test failed:', insertError);
      return NextResponse.json({
        status: 'error',
        message: 'Database insert test failed',
        error: insertError
      }, { status: 500 });
    }

    // Delete the test record
    if (insertData) {
      await supabase
        .from('users')
        .delete()
        .eq('id', insertData.id);
    }

    return NextResponse.json({
      status: 'success',
      message: 'Database connection and operations working correctly',
      insertWorks: true,
      testUser: insertData
    });

  } catch (error) {
    console.error('Test database error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Database test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}