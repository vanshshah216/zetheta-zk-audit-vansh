'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { ArrowUpRight, ArrowDownRight, TrendingUp, CheckCircle, AlertCircle, Clock, Star, Zap, Info } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { useRouter } from 'next/navigation'
import { mockDashboardMetrics, mockAnalytics } from '@/lib/auditor/mock-data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

export function DashboardContent() {
  const metrics = mockDashboardMetrics
  const analytics = mockAnalytics
  const COLORS = ['#00E5FF', '#2563EB', '#10B981', '#7C3AED', '#ec4899']
  const router = useRouter()

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-8"
    >
      <div className="bg-cyan-900/30 border border-cyan-500/30 text-cyan-200 p-3 rounded-lg flex items-center gap-3 mb-2">
        <Info className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        <p className="text-sm font-medium">
          <strong className="text-cyan-400">Demo Mode:</strong> This MVP uses local mock data. Blockchain and ZK proof generation are simulated.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Incoming Requests */}
        <Card className="glass border-cyan-500/30 hover-glow-cyan">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Incoming Requests</p>
                <p className="text-3xl font-bold text-cyan-400 mt-2">{metrics.incomingRequests}</p>
              </div>
              <Zap className="w-8 h-8 text-cyan-400/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">+2 this week</p>
          </CardContent>
        </Card>

        {/* Assigned Audits */}
        <Card className="glass border-blue-500/30 hover-glow-blue">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Assigned Audits</p>
                <p className="text-3xl font-bold text-blue-400 mt-2">{metrics.assignedAudits}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-400/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">In progress now</p>
          </CardContent>
        </Card>

        {/* Proofs Generated */}
        <Card className="glass border-emerald-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Proofs Generated</p>
                <p className="text-3xl font-bold text-emerald-400 mt-2">{metrics.proofsGenerated}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-400/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">All verified</p>
          </CardContent>
        </Card>

        {/* Monthly Earnings */}
        <Card className="glass border-purple-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Earnings</p>
                <p className="text-3xl font-bold text-purple-400 mt-2">${metrics.monthlyEarnings.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">+15% from last month</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Secondary Metrics */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Completed Audits */}
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Completed Audits</p>
            <p className="text-2xl font-bold mt-2">{metrics.completedAudits}</p>
            <p className="text-xs text-emerald-400 mt-2">↑ 3 this month</p>
          </CardContent>
        </Card>

        {/* Pending Reviews */}
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Pending Reviews</p>
            <p className="text-2xl font-bold mt-2">{metrics.pendingReviews}</p>
            <p className="text-xs text-yellow-400 mt-2">Review needed</p>
          </CardContent>
        </Card>

        {/* Compliance Score */}
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Compliance Score</p>
            <p className="text-2xl font-bold mt-2">{metrics.complianceScore}%</p>
            <p className="text-xs text-emerald-400 mt-2">Excellent</p>
          </CardContent>
        </Card>

        {/* Reputation Rating */}
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reputation</p>
                <p className="text-2xl font-bold mt-2">{metrics.reputationRating}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Audits Chart */}
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle>Monthly Audits</CardTitle>
            <CardDescription>Audit completion trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { month: 'Jan', count: 8 },
                { month: 'Feb', count: 6 },
                { month: 'Mar', count: 9 },
                { month: 'Apr', count: 7 },
                { month: 'May', count: 10 },
                { month: 'Jun', count: 8 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                <Line type="monotone" dataKey="count" stroke="#00E5FF" strokeWidth={2} dot={{ fill: '#00E5FF' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Success Rate */}
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle>Success Rate</CardTitle>
            <CardDescription>{analytics.successRate}% completion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Successful', value: analytics.successRate },
                    { name: 'Failed', value: 100 - analytics.successRate },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  dataKey="value"
                >
                  <Cell fill="#00E5FF" />
                  <Cell fill="#1e293b" />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity and Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest audit updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {metrics.recentActivity.map((activity, idx) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 pb-3 border-b border-border/30 last:border-0 last:pb-0"
              >
                <div className="text-2xl mt-1">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.companyName}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30"
              onClick={() => router.push('/auditor/incoming-requests')}
            >
              Review Requests
            </Button>
            <Button 
              className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
              onClick={() => router.push('/auditor/generate-proof')}
            >
              Generate Proof
            </Button>
            <Button 
              className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30"
              onClick={() => router.push('/auditor/certificates')}
            >
              Issue Certificate
            </Button>
            <Button 
              className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30"
              onClick={() => router.push('/auditor/analytics')}
            >
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Deadlines */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Audits due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.upcomingDeadlines.map((audit, idx) => (
                <motion.div
                  key={audit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between p-3 bg-card/50 border border-border/30 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{audit.companyName}</p>
                    <p className="text-sm text-muted-foreground">{audit.auditType}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{audit.progress}%</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.ceil((audit.dueDate.getTime() - Date.now()) / (24 * 60 * 60 * 1000))} days left
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
