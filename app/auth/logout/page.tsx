'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { clearAuthStorage } from '@/stores/auth-store'
import { authService } from '@/services/auth-service'
import { Loader2 } from 'lucide-react'

export default function LogoutPage() {
  const logout = useAuthStore((s) => s.logout)

  useEffect(() => {
    let cancelled = false

    async function performLogout() {
      try {
        // 1. Call service-level logout (clears service-side storage)
        await authService.logout()
      } catch (err) {
        console.error('Logout service error:', err)
      } finally {
        if (!cancelled) {
          // 2. Clear Zustand in-memory state
          logout()

          // 3. Nuke all auth storage keys
          clearAuthStorage()

          // 4. Hard redirect to login — avoids stale router state
          window.location.replace('/auth/login')
        }
      }
    }

    performLogout()

    return () => {
      cancelled = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-8 h-8 text-cyan animate-spin" />
      <p className="text-sm font-medium text-muted-foreground tracking-wide">
        Logging out&hellip;
      </p>
    </div>
  )
}
