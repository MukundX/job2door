'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const scope = searchParams.get('scope');
        const authuser = searchParams.get('authuser');
        const prompt = searchParams.get('prompt');

        if (!code) {
          console.error('No authorization code received');
          router.push('/onboard?error=no_code');
          return;
        }

        const queryParams = new URLSearchParams();
        if (code) queryParams.append('code', code);
        if (scope) queryParams.append('scope', scope);
        if (authuser) queryParams.append('authuser', authuser);
        if (prompt) queryParams.append('prompt', prompt);

        const response = await fetch(`/api/auth/callback?${queryParams.toString()}`);

        if (response.redirected) {
          window.location.href = response.url;
        } else {
          const data = await response.json();
          console.error('Callback API error:', data);
          router.push('/onboard?error=callback_failed');
        }
      } catch (error) {
        console.error('Callback error:', error);
        router.push('/onboard?error=callback_failed');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Processing Authentication</h2>
        <p className="text-gray-300">Please wait while we complete your sign-in...</p>
      </div>
    </div>
  );
}
