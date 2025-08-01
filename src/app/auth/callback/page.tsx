// app/auth/callback/page.tsx
"use client";

import { Suspense } from "react";
import CallbackClient from "./CallbackClient";

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackClient />
    </Suspense>
  );
}
