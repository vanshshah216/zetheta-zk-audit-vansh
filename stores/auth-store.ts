import { create } from 'zustand'
import { AuthUser, AuthSession } from '@/lib/auth-types'

interface AuthState {
  user: AuthUser | null
  session: AuthSession | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  setUser: (user: AuthUser | null) => void
  setSession: (session: AuthSession | null) => void
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  login: (user: AuthUser, session: AuthSession) => void
  logout: () => void
  clearError: () => void
  updateUserRole: (role: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setSession: (session) => set({ session }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
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
      error: null,
    }),

  clearError: () => set({ error: null }),

  updateUserRole: (role) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, role: role as any }
        : null,
    })),
}))
