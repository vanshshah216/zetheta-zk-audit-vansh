'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Globe, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { mockAPI } from '@/lib/security/mock-data'
import { Threat } from '@/types/security'

const severityConfig = {
  critical: { color: '#ef4444', bg: '#ef444420' },
  high: { color: '#f97316', bg: '#f9731620' },
  medium: { color: '#eab308', bg: '#eab30820' },
  low: { color: '#22c55e', bg: '#22c55e20' },
}

export default function ThreatMonitorPage() {
  const [threats, setThreats] = useState<Threat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadThreats = async () => {
      try {
        const data = await mockAPI.getThreats()
        setThreats(data)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    loadThreats()
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

  const criticalThreats = threats.filter((t) => t.severity === 'critical').length
  const totalRiskScore = threats.reduce((sum, t) => sum + t.riskScore, 0)
  const avgRiskScore = threats.length > 0 ? (totalRiskScore / threats.length).toFixed(1) : '0'

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="text-2xl font-bold">Threat Monitor</h1>
          <p className="text-sm text-muted-foreground">Real-time security threat detection and analysis</p>
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
              <p className="text-xs text-muted-foreground uppercase">Critical Threats</p>
              <p className="text-3xl font-bold mt-2 text-red-500">{criticalThreats}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground uppercase">Total Threats</p>
              <p className="text-3xl font-bold mt-2 text-cyan">{threats.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground uppercase">Avg Risk Score</p>
              <p className="text-3xl font-bold mt-2 text-yellow-500">{avgRiskScore}</p>
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
            <CardTitle className="text-base">Active Threats</CardTitle>
            <CardDescription>Detected security threats requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            {threats.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No active threats detected</p>
              </div>
            ) : (
              <div className="space-y-4">
                {threats.map((threat) => {
                  const config = severityConfig[threat.severity]
                  return (
                    <motion.div
                      key={threat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <AlertTriangle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: config.color }} />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold">{threat.type}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{threat.description}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: config.bg }}
                          >
                            <span className="text-lg font-bold" style={{ color: config.color }}>
                              {threat.riskScore.toFixed(1)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Risk</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Severity</p>
                          <span
                            className="text-xs px-2 py-1 rounded block mt-1"
                            style={{ backgroundColor: config.bg, color: config.color }}
                          >
                            {threat.severity.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="text-sm font-medium">{threat.location}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">IP Address</p>
                          <p className="text-xs font-mono">{threat.ipAddress}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Status</p>
                          <span
                            className={`text-xs px-2 py-1 rounded block mt-1 ${
                              threat.status === 'active'
                                ? 'bg-red-500/20 text-red-500'
                                : threat.status === 'investigating'
                                  ? 'bg-yellow-500/20 text-yellow-500'
                                  : 'bg-green-500/20 text-green-500'
                            }`}
                          >
                            {threat.status.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground">{threat.timestamp}</p>
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
