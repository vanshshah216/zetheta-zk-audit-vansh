'use client'

import { useCallback, useState } from 'react'
import { useDataStore } from '@/stores/data-store'
import { auditService, Audit } from '@/services/audit-service'
import { useNotifications } from './use-notifications'

export function useAudits() {
  const { audits, setAudits } = useDataStore()
  const { notify } = useNotifications()
  const [isLoading, setIsLoading] = useState(false)

  const getAudits = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await auditService.getAudits()
      setAudits(data)
      return data
    } catch (error) {
      notify('error', 'Error', 'Failed to load audits')
      return []
    } finally {
      setIsLoading(false)
    }
  }, [setAudits, notify])

  const getAuditById = useCallback(async (id: string) => {
    try {
      return await auditService.getAuditById(id)
    } catch (error) {
      notify('error', 'Error', 'Failed to load audit')
      return null
    }
  }, [notify])

  const createAudit = useCallback(
    async (audit: Omit<Audit, 'id' | 'createdAt'>) => {
      setIsLoading(true)
      try {
        const newAudit = await auditService.createAudit(audit)
        setAudits([...audits, newAudit])
        notify('success', 'Success', 'Audit created successfully')
        return newAudit
      } catch (error) {
        notify('error', 'Error', 'Failed to create audit')
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [audits, setAudits, notify]
  )

  return {
    audits,
    isLoading,
    getAudits,
    getAuditById,
    createAudit,
  }
}
