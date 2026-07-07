'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Smartphone, Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI } from '@/lib/security/mock-data'
import { Session } from '@/types/security'

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [terminatingIds, setTerminatingIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await mockAPI.getSessions()
        setSessions(data)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    loadSessions()
  }, [])

  const handleTerminate = async (sessionId: string) => {
    setTerminatingIds((prev) => new Set(prev).add(sessionId))
    try {
      await mockAPI.terminateSession(sessionId)
      setTimeout(() => {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId))
        setTerminatingIds((prev) => {
          const next = new Set(prev)
          next.delete(sessionId)
          return next
        })
      }, 300)
    } catch (error) {
      setTerminatingIds((prev) => {
        const next = new Set(prev)
        next.delete(sessionId)
        return next
      })
    }
  }

  const handleTerminateAll = async () => {
    for (const session of sessions) {
      await handleTerminate(session.id)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Active Sessions</h1>
            <p className="text-sm text-muted-foreground">Manage your active device sessions</p>
          </div>
          <Button variant="destructive" onClick={handleTerminateAll} disabled={sessions.length === 0}>
            Terminate All Sessions
          </Button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Active Sessions ({sessions.length})</CardTitle>
            <CardDescription>Devices and browsers currently logged in</CardDescription>
          </CardHeader>
          <CardContent>
            {sessions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No active sessions</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`p-4 rounded-lg border border-border transition-all ${
                      terminatingIds.has(session.id) ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <Smartphone className="w-5 h-5 text-cyan mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold">{session.device}</h3>
                          <p className="text-sm text-muted-foreground">{session.browser}</p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                          new Date().getTime() - new Date(session.lastActive).getTime() < 60000
                            ? 'bg-green-500/20 text-green-500'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {session.lastActive}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Operating System</p>
                        <p className="font-medium">{session.os}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">IP Address</p>
                        <p className="font-mono text-xs">{session.ipAddress}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="font-medium">{session.country}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Created</p>
                        <p className="text-xs">{session.createdAt}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="gap-2"
                        onClick={() => handleTerminate(session.id)}
                        disabled={terminatingIds.has(session.id)}
                      >
                        <LogOut className="w-4 h-4" />
                        {terminatingIds.has(session.id) ? 'Terminating...' : 'Terminate'}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
