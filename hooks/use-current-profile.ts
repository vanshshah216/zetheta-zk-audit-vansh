'use client'

import { useAuthStore } from '@/stores/auth-store'

/**
 * Returns the logged-in user's profile identifiers for Supabase operations.
 * Auth user IDs match seeded profile IDs (e.g. company-user, auditor-user).
 */
export function useCurrentProfile() {
  const user = useAuthStore((s) => s.user)

  return {
    user,
    profileId: user?.id ?? null,
    email: user?.email ?? null,
    companyName: user?.company ?? 'Your Company',
    isReady: Boolean(user?.id && user?.email),
  }
}
