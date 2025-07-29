import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...');
    
    // Test 1: Check if we can connect to Supabase
    const { data: connectionTest, error: connectionError } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (connectionError) {
      console.error('Database connection error:', connectionError);
      return NextResponse.json({
        status: 'error',
        message: 'Database connection failed',
        error: connectionError
      }, { status: 500 });
    }
    
    // Test 2: Check if users table exists and has correct structure
    const { data: tableInfo, error: tableError } = await supabase
      .rpc('get_table_info', { table_name: 'users' })
      .single();
    
    if (tableError) {
      console.log('Table info error (this might be normal):', tableError);
    }
    
    // Test 3: Try to insert a test record (we'll delete it immediately)
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
        error: insertError,
        tableExists: true,
        connectionWorks: true
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
      connectionWorks: true,
      tableExists: true,
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