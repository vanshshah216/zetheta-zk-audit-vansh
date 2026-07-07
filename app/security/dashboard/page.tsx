'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Activity,
  XCircle,
  Zap,
  Shield,
  Lock,
  AlertCircle,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI } from '@/lib/security/mock-data'
import {
  SecurityMetrics,
  ThreatTrendData,
  LoginActivity,
  ApiUsageData,
  DeviceActivityData,
} from '@/types/security'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const threatLevelColors: Record<string, string> = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#22c55e',
}

const chartColors = ['#00E5FF', '#2563EB', '#10B981', '#7C3AED', '#ec4899']

export default function SecurityDashboard() {
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null)
  const [threatTrend, setThreatTrend] = useState<ThreatTrendData[]>([])
  const [loginActivity, setLoginActivity] = useState<LoginActivity[]>([])
  const [apiUsage, setApiUsage] = useState<ApiUsageData[]>([])
  const [deviceActivity, setDeviceActivity] = useState<DeviceActivityData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [metrics, threatTrend, loginActivity, apiUsage, deviceActivity] = await Promise.all([
          mockAPI.getSecurityMetrics(),
          mockAPI.getThreatTrend(),
          mockAPI.getLoginActivity(),
          mockAPI.getApiUsage(),
          mockAPI.getDeviceActivity(),
        ])
        setMetrics(metrics)
        setThreatTrend(threatTrend)
        setLoginActivity(loginActivity)
        setApiUsage(apiUsage)
        setDeviceActivity(deviceActivity)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading || !metrics) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  const threatLevelColor = threatLevelColors[metrics.threatLevel]
  const threatLevelLabel = metrics.threatLevel.charAt(0).toUpperCase() + metrics.threatLevel.slice(1)

  const statsCards = [
    {
      title: 'Threat Level',
      value: threatLevelLabel,
      icon: <AlertTriangle className="w-5 h-5" />,
      color: threatLevelColor,
      bgColor: `${threatLevelColor}20`,
    },
    {
      title: 'Active Sessions',
      value: metrics.activeSessions.toString(),
      icon: <Activity className="w-5 h-5" />,
      color: '#00E5FF',
      bgColor: '#00E5FF20',
    },
    {
      title: 'Failed Logins',
      value: metrics.failedLogins.toString(),
      icon: <XCircle className="w-5 h-5" />,
      color: '#ef4444',
      bgColor: '#ef444420',
    },
    {
      title: 'API Requests',
      value: metrics.apiRequests.toLocaleString(),
      icon: <Zap className="w-5 h-5" />,
      color: '#2563EB',
      bgColor: '#2563EB20',
    },
    {
      title: 'Blocked Requests',
      value: metrics.blockedRequests.toString(),
      icon: <Shield className="w-5 h-5" />,
      color: '#10B981',
      bgColor: '#10B98120',
    },
    {
      title: 'Suspicious Activities',
      value: metrics.suspiciousActivities.toString(),
      icon: <AlertCircle className="w-5 h-5" />,
      color: '#f97316',
      bgColor: '#f9731620',
    },
    {
      title: 'Active Devices',
      value: metrics.activeDevices.toString(),
      icon: <Lock className="w-5 h-5" />,
      color: '#7C3AED',
      bgColor: '#7C3AED20',
    },
    {
      title: 'Open Incidents',
      value: metrics.openIncidents.toString(),
      icon: <TrendingUp className="w-5 h-5" />,
      color: '#ec4899',
      bgColor: '#ec489920',
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{card.title}</p>
                    <p className="text-2xl font-bold mt-2" style={{ color: card.color }}>
                      {card.value}
                    </p>
                  </div>
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: card.bgColor, color: card.color }}
                  >
                    {card.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Threat Trend (24h)</CardTitle>
              <CardDescription>Security threat timeline</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={threatTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="timestamp" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #1e293b',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Line type="monotone" dataKey="critical" stroke="#ef4444" dot={false} />
                  <Line type="monotone" dataKey="high" stroke="#f97316" dot={false} />
                  <Line type="monotone" dataKey="medium" stroke="#eab308" dot={false} />
                  <Line type="monotone" dataKey="low" stroke="#22c55e" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Login Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Login Activity (24h)</CardTitle>
              <CardDescription>Successful vs failed logins</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={loginActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="timestamp" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #1e293b',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Bar dataKey="successful" fill="#10B981" />
                  <Bar dataKey="failed" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* API Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">API Usage (24h)</CardTitle>
              <CardDescription>Requests and blocked attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={apiUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="timestamp" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #1e293b',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Line type="monotone" dataKey="requests" stroke="#00E5FF" dot={false} />
                  <Line type="monotone" dataKey="blocked" stroke="#ef4444" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Device Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Device Activity (24h)</CardTitle>
              <CardDescription>New devices and active sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={deviceActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="timestamp" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #1e293b',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Bar dataKey="newDevices" fill="#7C3AED" />
                  <Bar dataKey="activeDevices" fill="#00E5FF" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Recent Alerts</CardTitle>
            <CardDescription>Latest security events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'Brute Force Attempt', severity: 'high', time: '2 min ago' },
                { type: 'API Rate Limit Exceeded', severity: 'medium', time: '5 min ago' },
                { type: 'Suspicious Login', severity: 'medium', time: '12 min ago' },
              ].map((alert, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border border-border"
                >
                  <AlertTriangle className="w-4 h-4 mt-0.5 text-yellow-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{alert.type}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                      alert.severity === 'high'
                        ? 'bg-red-500/20 text-red-500'
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}
                  >
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
