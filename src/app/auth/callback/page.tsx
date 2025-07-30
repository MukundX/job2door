import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CallbackClient = dynamic(() => import('./CallbackClient'), { ssr: false });

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackClient />
    </Suspense>
  );
}
