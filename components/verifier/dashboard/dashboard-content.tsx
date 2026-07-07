'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown, Clock, CheckCircle, AlertCircle, TrendingUp, Zap, Info } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { mockVerifierAPI } from '@/lib/verifier/mock-data'
import { VerificationAnalytics, VerificationRequest, VerificationHistory } from '@/types/verifier'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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

export default function DashboardContent() {
  const [analytics, setAnalytics] = useState<VerificationAnalytics | null>(null)
  const [requests, setRequests] = useState<VerificationRequest[]>([])
  const [history, setHistory] = useState<VerificationHistory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [analyticsData, requestsData, historyData] = await Promise.all([
          mockVerifierAPI.getAnalytics(),
          mockVerifierAPI.getVerificationRequests(),
          mockVerifierAPI.getVerificationHistory(),
        ])
        setAnalytics(analyticsData)
        setRequests(requestsData)
        setHistory(historyData)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>
  }

  if (!analytics) {
    return <div className="text-center py-8">No data available</div>
  }

  const COLORS = ['#06B6D4', '#0EA5E9', '#3B82F6', '#8B5CF6', '#EC4899']

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Verification Dashboard</h1>
        <p className="text-gray-400">Monitor verification requests and blockchain status</p>
      </div>

      <div className="bg-cyan-900/30 border border-cyan-500/30 text-cyan-200 p-3 rounded-lg flex items-center gap-3">
        <Info className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        <p className="text-sm font-medium">
          <strong className="text-cyan-400">Demo Mode:</strong> This MVP uses local mock data. Blockchain and ZK proof generation are simulated.
        </p>
      </div>

      {/* Key Metrics */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 hover:border-cyan-500/40 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Pending Verifications</p>
                <p className="text-2xl font-bold text-cyan-400">{analytics.pendingVerifications}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-cyan-500/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-green-500/5 hover:border-emerald-500/40 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Completed Today</p>
                <p className="text-2xl font-bold text-emerald-400">{analytics.completedToday}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-emerald-500/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 hover:border-blue-500/40 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-blue-400">{analytics.successRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-10 h-10 text-blue-500/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-pink-500/5 hover:border-purple-500/40 transition-colors">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Avg. Time</p>
                <p className="text-2xl font-bold text-purple-400">{analytics.averageVerificationTime}m</p>
              </div>
              <Clock className="w-10 h-10 text-purple-500/50" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Row 1 */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Verification Trend */}
        <Card className="border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white">Verification Trend</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={analytics.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #06B6D4' }}
                  cursor={{ stroke: '#06B6D4' }}
                />
                <Line type="monotone" dataKey="count" stroke="#06B6D4" strokeWidth={2} dot={{ fill: '#06B6D4' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Compliance Distribution */}
        <Card className="border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white">Compliance Distribution</CardTitle>
            <CardDescription>By standard</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={Object.entries(analytics.complianceDistribution).map(([name, value]) => ({
                    name,
                    value,
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#06B6D4"
                  dataKey="value"
                >
                  {Object.entries(analytics.complianceDistribution).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #06B6D4' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Row 2 */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4">
        {/* Top Companies and Auditors */}
        <Card className="border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white">Verification Requests by Source</CardTitle>
            <CardDescription>Top companies and auditors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={[
                  ...analytics.topCompanies.map((c) => ({ name: c.name, type: 'Company', count: c.count })),
                  ...analytics.topAuditors.map((a) => ({ name: a.name, type: 'Auditor', count: a.count })),
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #06B6D4' }} />
                <Bar dataKey="count" fill="#06B6D4" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Widgets Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Requests */}
        <Card className="border-cyan-500/20 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Recent Verification Requests</CardTitle>
            <CardDescription>{requests.length} pending or in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {requests
                .filter((r) => r.status !== 'completed')
                .map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 rounded-lg bg-surface hover:bg-surface/80">
                    <div className="flex-1">
                      <p className="text-white font-medium">{request.companyName}</p>
                      <p className="text-xs text-gray-400">by {request.auditorName}</p>
                    </div>
                    <div className="text-right">
                      <div className="w-12 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          style={{ width: `${request.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{request.progress}%</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Status */}
        <Card className="border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white">Today&apos;s Overview</CardTitle>
            <CardDescription>Verification metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Verified</span>
              <span className="text-xl font-bold text-cyan-400">{analytics.totalVerifications}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Success Rate</span>
              <span className="text-xl font-bold text-emerald-400">{analytics.successRate.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Failed</span>
              <span className="text-xl font-bold text-red-400">{analytics.failedVerifications}</span>
            </div>
            <div className="pt-4 border-t border-gray-700">
              <button className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity">
                View Details
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants}>
        <Card className="border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription>Verification history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {history.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-start gap-3 pb-3 border-b border-gray-700 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${item.result === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-gray-400">{item.details}</p>
                    <p className="text-xs text-gray-500 mt-1">Proof: {item.proofId}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
