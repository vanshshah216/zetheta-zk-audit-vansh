'use client'

import { useCallback, useEffect } from 'react'
import { useNotificationsStore } from '@/stores/notifications-store'

export function useNotifications() {
  const { notifications, addNotification, removeNotification, clearNotifications } =
    useNotificationsStore()

  // Auto-remove notifications after duration
  useEffect(() => {
    const timers = notifications.map((notification) => {
      const duration = notification.duration || 5000
      return setTimeout(() => {
        removeNotification(notification.id)
      }, duration)
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [notifications, removeNotification])

  const notify = useCallback(
    (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => {
      addNotification({
        type,
        title,
        message,
        duration: 5000,
      })
    },
    [addNotification]
  )

  return {
    notifications,
    notify,
    addNotification,
    removeNotification,
    clearNotifications,
  }
}
