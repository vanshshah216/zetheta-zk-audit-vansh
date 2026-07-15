'use client'

import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { authService } from '@/services/auth-service'
import type { AuthSession } from '@/lib/auth-types'

/**
 * Syncs the httpOnly session cookie with the Zustand auth store on app load.
 * Middleware protects routes via cookie; client components use Zustand — this
 * keeps both in agreement after refresh or new tab.
 */
export function AuthHydration() {
  const ran = useRef(false)
  const login = useAuthStore((s) => s.login)
  const logout = useAuthStore((s) => s.logout)
  const setIsLoading = useAuthStore((s) => s.setIsLoading)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const sync = async () => {
      setIsLoading(true)
      try {
        const serverUser = await authService.getCurrentUser()
        if (serverUser) {
          const session: AuthSession = {
            accessToken: '',
            refreshToken: '',
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            user: serverUser,
          }
          login(serverUser, session)
        } else {
          logout()
        }
      } catch {
        // Offline or transient error — keep existing persisted state
      } finally {
        setIsLoading(false)
      }
    }

    void sync()
  }, [login, logout, setIsLoading])

  return null
}
