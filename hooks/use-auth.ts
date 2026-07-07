'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'
import { useNotificationsStore } from '@/stores/notifications-store'
import { authService } from '@/services/auth-service'
import { LoginCredentials, RegisterData } from '@/lib/auth-types'

export function useAuth() {
  const router = useRouter()
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
        const message = err instanceof Error ? err.message : 'Login failed'
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
    [setIsLoading, clearError, storeLogin, setError, addNotification]
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
        const message = err instanceof Error ? err.message : 'Registration failed'
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
    [setIsLoading, clearError, storeLogin, setError, addNotification]
  )

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      await authService.logout()
      storeLogout()
      addNotification({
        type: 'success',
        title: 'Logged out',
        message: 'You have been logged out',
      })
      router.push('/')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, storeLogout, addNotification, router, setError])

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
