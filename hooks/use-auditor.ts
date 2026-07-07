'use client'

import { useCallback, useState } from 'react'
import { auditorService, AuditorProfile, AuditorStats } from '@/services/auditor-service'
import { useNotifications } from './use-notifications'

export function useAuditor() {
  const { notify } = useNotifications()
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<AuditorProfile | null>(null)
  const [stats, setStats] = useState<AuditorStats | null>(null)

  const getProfile = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await auditorService.getAuditorProfile()
      setProfile(data)
      return data
    } catch (error) {
      notify('error', 'Error', 'Failed to load auditor profile')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [notify])

  const updateProfile = useCallback(
    async (updates: Partial<AuditorProfile>) => {
      setIsLoading(true)
      try {
        const updated = await auditorService.updateAuditorProfile(updates)
        setProfile(updated)
        notify('success', 'Success', 'Profile updated successfully')
        return updated
      } catch (error) {
        notify('error', 'Error', 'Failed to update profile')
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [notify]
  )

  const getStats = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await auditorService.getAuditorStats()
      setStats(data)
      return data
    } catch (error) {
      notify('error', 'Error', 'Failed to load stats')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [notify])

  return {
    profile,
    stats,
    isLoading,
    getProfile,
    updateProfile,
    getStats,
  }
}
