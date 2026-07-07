'use client'

import { useCallback } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { useNotificationsStore } from '@/stores/notifications-store'
import { authService } from '@/services/auth-service'
import type { LoginCredentials, RegisterData } from '@/lib/auth-types'

export function useAuth() {
  const {
    user,
    session,
    isAuthenticated,
    isLoading,
    error,
    login: storeLogin,
    logout: storeLogout,
    setIsLoading,
    setError,
    clearError,
  } = useAuthStore()

  const { addNotification } = useNotificationsStore()

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true)
      clearError()

      try {
        const result = await authService.login(credentials)

        if (!result) {
          setError('Invalid email or password')

          addNotification({
            type: 'error',
            title: 'Login Failed',
            message: 'Invalid email or password',
          })

          return false
        }

        storeLogin(result.user, result.session)

        addNotification({
          type: 'success',
          title: 'Welcome back!',
          message: `Logged in as ${result.user.email}`,
        })

        return true
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Login failed'

        setError(message)

        addNotification({
          type: 'error',
          title: 'Login Error',
          message,
        })

        return false
      } finally {
        setIsLoading(false)
      }
    },
    [
      setIsLoading,
      clearError,
      storeLogin,
      setError,
      addNotification,
    ]
  )

  const register = useCallback(
    async (data: RegisterData) => {
      setIsLoading(true)
      clearError()

      try {
        const result = await authService.register(data)

        if (!result) {
          setError('Email already registered')

          addNotification({
            type: 'error',
            title: 'Registration Failed',
            message: 'This email is already registered',
          })

          return false
        }

        storeLogin(result.user, result.session)

        addNotification({
          type: 'success',
          title: 'Account created!',
          message: 'Welcome to Zero Knowledge Audit',
        })

        return true
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Registration failed'

        setError(message)

        addNotification({
          type: 'error',
          title: 'Registration Error',
          message,
        })

        return false
      } finally {
        setIsLoading(false)
      }
    },
    [
      setIsLoading,
      clearError,
      storeLogin,
      setError,
      addNotification,
    ]
  )

  const logout = useCallback(async () => {
    if (typeof window === 'undefined') return
    setIsLoading(true)

    try {
      await authService.logout()
    } catch (err) {
      console.error('Logout service error:', err)
    } finally {
      // 1. Clear Zustand store first
      storeLogout()

      // 2. Comprehensive localStorage sweep
      const knownKeys = [
        'zka-auth-storage',
        'zk-auth-storage',
        'authSession',
        'pendingEmailVerification',
      ]
      knownKeys.forEach((key) => localStorage.removeItem(key))

      // Also sweep any key matching auth/session/token/user patterns
      const authPatterns = /auth|session|token|user/i
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && authPatterns.test(key)) keysToRemove.push(key)
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key))

      // 3. Clear sessionStorage entirely
      sessionStorage.clear()

      addNotification({
        type: 'success',
        title: 'Logged out',
        message: 'You have been logged out successfully',
      })

      setIsLoading(false)

      // 4. Hard redirect — avoids router being tied to now-null auth state
      window.location.replace('/auth/login')
    }
  }, [
    setIsLoading,
    storeLogout,
    addNotification,
  ])

  return {
    user,
    session,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  }
}