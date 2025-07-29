"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage token if present
    const localToken = typeof window !== "undefined" ? localStorage.getItem("jobler_token") : null;

    if (localToken) {
      // Try to set Supabase session from token
      supabase.auth.setSession({
        access_token: localToken,
        refresh_token: localToken, // If you have a refresh token, use it here
      } as Session).then(({ data, error }) => {
        if (error) {
          setUser(null);
          setLoading(false);
        } else {
          setUser(data.session?.user ?? null);
          setLoading(false);
        }
      });
    } else {
      // Get initial session from Supabase (if any)
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });
    }

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};