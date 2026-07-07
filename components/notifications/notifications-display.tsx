'use client'

import { useNotifications } from '@/hooks/use-notifications'
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const iconMap = {
  success: <CheckCircle className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
}

const colorMap = {
  success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600',
  error: 'bg-red-500/10 border-red-500/20 text-red-600',
  info: 'bg-blue-500/10 border-blue-500/20 text-blue-600',
  warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600',
}

export function NotificationsDisplay() {
  const { notifications, removeNotification } = useNotifications()

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`p-4 rounded-lg border backdrop-blur-sm ${colorMap[notification.type]}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">{iconMap[notification.type]}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{notification.title}</h3>
                <p className="text-sm opacity-90">{notification.message}</p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
