'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, MessageSquare, Paperclip } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI } from '@/lib/security/mock-data'
import { Incident } from '@/types/security'

const severityColors = {
  critical: { color: '#ef4444', bg: '#ef444420' },
  high: { color: '#f97316', bg: '#f9731620' },
  medium: { color: '#eab308', bg: '#eab30820' },
  low: { color: '#22c55e', bg: '#22c55e20' },
}

const statusColors = {
  open: { color: '#ef4444', bg: '#ef444420' },
  investigating: { color: '#f97316', bg: '#f9731620' },
  resolved: { color: '#22c55e', bg: '#22c55e20' },
  closed: { color: '#94a3b8', bg: '#94a3b820' },
}

export default function IncidentResponsePage() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    const loadIncidents = async () => {
      try {
        const data = await mockAPI.getIncidents()
        setIncidents(data)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    loadIncidents()
  }, [])

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

  const openCount = incidents.filter((i) => i.status === 'open').length
  const investigatingCount = incidents.filter((i) => i.status === 'investigating').length

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="text-2xl font-bold">Incident Response</h1>
          <p className="text-sm text-muted-foreground">Manage and track security incidents</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground uppercase">Open Incidents</p>
              <p className="text-3xl font-bold mt-2 text-red-500">{openCount}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground uppercase">Investigating</p>
              <p className="text-3xl font-bold mt-2 text-yellow-500">{investigatingCount}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground uppercase">Total</p>
              <p className="text-3xl font-bold mt-2 text-cyan">{incidents.length}</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Active Incidents</CardTitle>
            <CardDescription>Ongoing security incidents and responses</CardDescription>
          </CardHeader>
          <CardContent>
            {incidents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No incidents reported</p>
              </div>
            ) : (
              <div className="space-y-4">
                {incidents.map((incident) => {
                  const severityConfig = severityColors[incident.severity]
                  const statusConfig = statusColors[incident.status]
                  const isExpanded = expandedId === incident.id

                  return (
                    <motion.div
                      key={incident.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="rounded-lg border border-border overflow-hidden"
                    >
                      <div
                        className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setExpandedId(isExpanded ? null : incident.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <AlertTriangle
                              className="w-5 h-5 mt-1 flex-shrink-0"
                              style={{ color: severityConfig.color }}
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold">{incident.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {incident.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <span
                              className="text-xs px-2 py-1 rounded whitespace-nowrap"
                              style={severityConfig}
                            >
                              {incident.severity.toUpperCase()}
                            </span>
                            <span
                              className="text-xs px-2 py-1 rounded whitespace-nowrap"
                              style={statusConfig}
                            >
                              {incident.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-border p-4 bg-muted/30"
                        >
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Created</p>
                              <p className="text-sm">{incident.createdAt}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Updated</p>
                              <p className="text-sm">{incident.updatedAt}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Assigned Team</p>
                              <p className="text-sm">{incident.assignedTeam}</p>
                            </div>
                          </div>

                          {incident.comments.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold mb-2 flex items-center gap-2">
                                <MessageSquare className="w-3 h-3" />
                                Comments ({incident.comments.length})
                              </p>
                              <div className="space-y-2">
                                {incident.comments.map((comment, i) => (
                                  <p key={i} className="text-xs bg-muted p-2 rounded">
                                    {comment}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}

                          {incident.attachments.length > 0 && (
                            <div className="mt-3">
                              <p className="text-xs font-semibold mb-2 flex items-center gap-2">
                                <Paperclip className="w-3 h-3" />
                                Attachments ({incident.attachments.length})
                              </p>
                              <div className="space-y-1">
                                {incident.attachments.map((attachment, i) => (
                                  <p
                                    key={i}
                                    className="text-xs text-cyan hover:underline cursor-pointer"
                                  >
                                    {attachment}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
