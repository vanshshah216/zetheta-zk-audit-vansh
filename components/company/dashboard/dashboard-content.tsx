'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Shield,
  FileText,
  ExternalLink,
  Info
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI, mockDashboardMetrics, mockAudits, mockNotifications } from '@/lib/company/mock-data'
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ef4444']

export function DashboardContent() {
  const [metrics, setMetrics] = useState(mockDashboardMetrics)
  const [audits, setAudits] = useState(mockAudits)
  const [notifications, setNotifications] = useState(mockNotifications)

  useEffect(() => {
    const loadData = async () => {
      try {
        const dashboardData = await mockAPI.getDashboard()
        const auditsData = await mockAPI.getAudits()
        const notificationsData = await mockAPI.getNotifications()

        setMetrics(dashboardData)
        setAudits(auditsData)
        setNotifications(notificationsData)
      } catch (error) {
      }
    }

    loadData()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="bg-cyan-900/30 border border-cyan-500/30 text-cyan-200 p-3 rounded-lg flex items-center gap-3 mb-2">
        <Info className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        <p className="text-sm font-medium">
          <strong className="text-cyan-400">Demo Mode:</strong> This MVP uses local mock data. Blockchain and ZK proof generation are simulated.
        </p>
      </div>

      {/* Top Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <MetricCard
          label="Active Audits"
          value={metrics.activeAudits}
          icon={<Clock className="w-5 h-5" />}
          color="cyan"
          trend={8}
        />
        <MetricCard
          label="Completed Audits"
          value={metrics.completedAudits}
          icon={<CheckCircle className="w-5 h-5" />}
          color="emerald"
          trend={12}
        />
        <MetricCard
          label="Pending Payments"
          value={metrics.pendingPayments}
          icon={<AlertCircle className="w-5 h-5" />}
          color="orange"
          trend={-5}
        />
        <MetricCard
          label="Compliance Score"
          value={`${metrics.complianceScore}%`}
          icon={<Shield className="w-5 h-5" />}
          color="purple"
          trend={13}
        />
        <MetricCard
          label="Proofs Generated"
          value={metrics.proofsGenerated}
          icon={<FileText className="w-5 h-5" />}
          color="blue"
          trend={5}
        />
        <MetricCard
          label="Upcoming Deadlines"
          value={metrics.upcomingDeadlines}
          icon={<TrendingUp className="w-5 h-5" />}
          color="red"
          trend={-3}
        />
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Trend */}
        <motion.div variants={itemVariants}>
          <Card variant="glass" className="h-full">
            <CardHeader>
              <CardTitle>Compliance Trend</CardTitle>
              <CardDescription>Score progression over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={metrics.complianceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(5, 8, 22, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={{ fill: '#06b6d4', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Audit Status Distribution */}
        <motion.div variants={itemVariants}>
          <Card variant="glass" className="h-full">
            <CardHeader>
              <CardTitle>Audit Status</CardTitle>
              <CardDescription>Distribution overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={metrics.auditStatusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => `${entry.name}: ${entry.count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {metrics.auditStatusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(5, 8, 22, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Audit Requests */}
        <motion.div variants={itemVariants}>
          <Card variant="glass" className="h-full">
            <CardHeader>
              <CardTitle>Monthly Audits</CardTitle>
              <CardDescription>Requests over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={metrics.monthlyAuditRequests}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(5, 8, 22, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card variant="glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Audits</CardTitle>
                  <CardDescription>Your latest audit requests</CardDescription>
                </div>
                <Link href="/company/my-audits">
                  <Button variant="ghost" size="sm">
                    View All
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {audits.slice(0, 3).map((audit) => (
                  <Link key={audit.id} href={`/company/audit-details/${audit.id}`}>
                    <div className="p-4 glass rounded-lg border border-border/50 hover:border-cyan/50 transition-all cursor-pointer group">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold group-hover:text-cyan transition-colors">{audit.title}</h4>
                        <span
                          className={`px-2 py-1 text-xs rounded font-medium ${
                            audit.status === 'completed'
                              ? 'bg-emerald/20 text-emerald'
                              : audit.status === 'in-progress'
                                ? 'bg-cyan/20 text-cyan'
                                : 'bg-orange/20 text-orange'
                          }`}
                        >
                          {audit.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{audit.description}</p>
                      <div className="w-full bg-card/50 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-cyan to-blue h-2 rounded-full transition-all"
                          style={{ width: `${audit.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                        <span>{audit.progress}% complete</span>
                        <span>
                          {audit.deadline ? new Date(audit.deadline).toLocaleDateString() : 'No deadline'}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions & Notifications */}
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Quick Actions */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/company/request-audit">
                <Button variant="cyan" className="w-full justify-start" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Request Audit
                </Button>
              </Link>
              <Link href="/company/proof-vault">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Proof Vault
                </Button>
              </Link>
              <Link href="/company/payments">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  View Payments
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-lg">Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-lg border ${
                      notif.read
                        ? 'bg-card/20 border-border/30'
                        : 'bg-cyan/10 border-cyan/30'
                    }`}
                  >
                    <p className="text-sm font-medium">{notif.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

function MetricCard({
  label,
  value,
  icon,
  color,
  trend,
}: {
  label: string
  value: string | number
  icon: React.ReactNode
  color: string
  trend: number
}) {
  const colorClass = {
    cyan: 'text-cyan',
    emerald: 'text-emerald',
    orange: 'text-orange',
    purple: 'text-purple',
    blue: 'text-blue',
    red: 'text-red-500',
  }[color] || 'text-cyan'

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card variant="glass" className="h-full">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2 rounded-lg bg-card/50 ${colorClass}`}>
              {icon}
            </div>
            <div className="flex items-center gap-1 text-sm">
              {trend > 0 ? (
                <>
                  <ArrowUpRight className="w-4 h-4 text-emerald" />
                  <span className="text-emerald">+{trend}%</span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                  <span className="text-red-500">{trend}%</span>
                </>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-1">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
