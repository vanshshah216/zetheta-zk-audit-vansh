'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Trash2, AlertCircle, CheckCircle, Bell, FileText } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI } from '@/lib/company/mock-data'
import { Notification } from '@/types/company'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await mockAPI.getNotifications()
      setNotifications(data)
    }
    loadNotifications()
  }, [])

  const filteredNotifications = notifications.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'all' || (activeTab === 'unread' && !n.read)
    return matchesSearch && matchesTab
  })

  const categories = [
    { id: 'all', label: 'All', icon: <Bell className="w-4 h-4" /> },
    { id: 'audits', label: 'Audits', icon: <FileText className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'payments', label: 'Payments', icon: <FileText className="w-4 h-4" /> },
  ]

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: !n.read } : n
      )
    )
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'audits':
        return 'text-cyan'
      case 'payments':
        return 'text-emerald'
      case 'security':
        return 'text-red-500'
      case 'verification':
        return 'text-purple'
      default:
        return 'text-blue'
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
            Mark all as read
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search notifications..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'all' ? 'cyan' : 'outline'}
          onClick={() => setActiveTab('all')}
          size="sm"
        >
          All
        </Button>
        <Button
          variant={activeTab === 'unread' ? 'cyan' : 'outline'}
          onClick={() => setActiveTab('unread')}
          size="sm"
        >
          Unread ({unreadCount})
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notif, index) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              variant="glass"
              className={`transition-all ${
                notif.read ? '' : 'bg-cyan/5 border-cyan/30'
              }`}
            >
              <CardContent className="py-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        notif.read ? 'bg-muted-foreground' : 'bg-cyan'
                      }`}
                    />
                    <p className="font-medium">{notif.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded capitalize font-medium ${
                      notif.category === 'security'
                        ? 'bg-red-500/20 text-red-400'
                        : notif.category === 'audits'
                          ? 'bg-cyan/20 text-cyan'
                          : notif.category === 'payments'
                            ? 'bg-emerald/20 text-emerald'
                            : 'bg-purple/20 text-purple'
                    }`}>
                      {notif.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{notif.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMarkAsRead(notif.id)}
                    title={notif.read ? 'Mark as unread' : 'Mark as read'}
                  >
                    {notif.read ? (
                      <Bell className="w-4 h-4" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(notif.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <Card variant="glass">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No notifications</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
