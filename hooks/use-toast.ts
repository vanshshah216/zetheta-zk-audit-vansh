/**
 * Lightweight toast notification hook for MVP demo.
 * Works without any external toast library by using Zustand notifications store.
 */
'use client'

import { useNotificationsStore } from '@/stores/notifications-store'

export function useToast() {
  const { addNotification } = useNotificationsStore()

  return {
    success: (title: string, message?: string) =>
      addNotification({ type: 'success', title, message: message ?? '' }),
    error: (title: string, message?: string) =>
      addNotification({ type: 'error', title, message: message ?? '' }),
    info: (title: string, message?: string) =>
      addNotification({ type: 'info', title, message: message ?? '' }),
  }
}
