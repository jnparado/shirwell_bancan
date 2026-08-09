"use client";

import { LoginClient } from "@/app/auth/login/login-client";

/** Sign-up form (shared with login — includes top-right close). */
export function SignupFormClient() {
  return <LoginClient defaultMode="signup" />;
}
