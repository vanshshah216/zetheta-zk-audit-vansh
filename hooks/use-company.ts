'use client'

import { useCallback, useState } from 'react'
import { companyService, CompanyProfile, AuditRequest } from '@/services/company-service'
import { useNotifications } from './use-notifications'

export function useCompany() {
  const { notify } = useNotifications()
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<CompanyProfile | null>(null)
  const [requests, setRequests] = useState<AuditRequest[]>([])

  const getProfile = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await companyService.getCompanyProfile()
      setProfile(data)
      return data
    } catch (error) {
      notify('error', 'Error', 'Failed to load company profile')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [notify])

  const updateProfile = useCallback(
    async (updates: Partial<CompanyProfile>) => {
      setIsLoading(true)
      try {
        const updated = await companyService.updateCompanyProfile(updates)
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

  const getRequests = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await companyService.getAuditRequests()
      setRequests(data)
      return data
    } catch (error) {
      notify('error', 'Error', 'Failed to load audit requests')
      return []
    } finally {
      setIsLoading(false)
    }
  }, [notify])

  const createRequest = useCallback(
    async (request: Omit<AuditRequest, 'id' | 'requestedAt'>) => {
      setIsLoading(true)
      try {
        const newRequest = await companyService.createAuditRequest(request)
        setRequests([...requests, newRequest])
        notify('success', 'Success', 'Audit request created')
        return newRequest
      } catch (error) {
        notify('error', 'Error', 'Failed to create audit request')
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [requests, notify]
  )

  return {
    profile,
    requests,
    isLoading,
    getProfile,
    updateProfile,
    getRequests,
    createRequest,
  }
}
