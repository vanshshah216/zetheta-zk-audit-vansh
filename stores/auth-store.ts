import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { AuthUser, AuthSession, UserRole } from '@/lib/auth-types'

interface AuthState {
  user: AuthUser | null
  session: AuthSession | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  setUser: (user: AuthUser | null) => void
  setSession: (session: AuthSession | null) => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  login: (user: AuthUser, session: AuthSession) => void
  logout: () => void
  clearError: () => void
  updateUserRole: (role: UserRole) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setSession: (session) =>
        set({
          session,
        }),

      setIsLoading: (loading) =>
        set({
          isLoading: loading,
        }),

      setError: (error) =>
        set({
          error,
        }),

      login: (user, session) =>
        set({
          user,
          session,
          isAuthenticated: true,
          error: null,
        }),

      logout: () =>
        set({
          user: null,
          session: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        }),

      clearError: () =>
        set({
          error: null,
        }),

      updateUserRole: (role) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                role,
              }
            : null,

          session:
            state.session && state.user
              ? {
                  ...state.session,
                  user: {
                    ...state.session.user,
                    role,
                  },
                }
              : state.session,
        })),
    }),
    {
      name: 'zka-auth-storage',

      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

/**
 * Completely wipes all auth-related localStorage keys.
 * Call this alongside storeLogout() to ensure the Zustand persist
 * key is fully removed rather than just set to null values.
 */
export function clearAuthStorage() {
  if (typeof window === 'undefined') return

  const knownKeys = [
    'zka-auth-storage',
    'zk-auth-storage',
    'authSession',
    'pendingEmailVerification',
  ]
  knownKeys.forEach((key) => localStorage.removeItem(key))

  // Sweep any key matching auth/session/token/user
  const authPatterns = /auth|session|token|user/i
  const keysToRemove: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && authPatterns.test(key)) keysToRemove.push(key)
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key))

  sessionStorage.clear()
}