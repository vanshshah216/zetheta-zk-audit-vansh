'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { mockVerifierAPI } from '@/lib/verifier/mock-data'
import { VerificationAnalytics } from '@/types/verifier'
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
  Legend,
  ResponsiveContainer,
} from 'recharts'

const COLORS = ['#06B6D4', '#0EA5E9', '#3B82F6', '#8B5CF6', '#EC4899']

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<VerificationAnalytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await mockVerifierAPI.getAnalytics()
        setAnalytics(data)
      } finally {
        setLoading(false)
      }
    }
    loadAnalytics()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>
  }

  if (!analytics) {
    return <div className="text-center py-8">No analytics available</div>
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Verification Analytics</h1>
        <p className="text-gray-400">Performance metrics and insights</p>
      </div>

      {/* Key Metrics */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5">
          <CardContent className="pt-6">
            <p className="text-gray-400 text-sm mb-2">Success Rate</p>
            <p className="text-3xl font-bold text-cyan-400">{analytics.successRate.toFixed(1)}%</p>
          </CardContent>
        </Card>
        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/5">
          <CardContent className="pt-6">
            <p className="text-gray-400 text-sm mb-2">Avg. Verification Time</p>
            <p className="text-3xl font-bold text-blue-400">{analytics.averageVerificationTime} min</p>
          </CardContent>
        </Card>
        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-pink-500/5">
          <CardContent className="pt-6">
            <p className="text-gray-400 text-sm mb-2">Total Verifications</p>
            <p className="text-3xl font-bold text-purple-400">{analytics.totalVerifications}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Trend */}
        <Card className="border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white">Verification Trend</CardTitle>
            <CardDescription>Monthly verifications</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={analytics.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #06B6D4' }} />
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

      {/* Top Companies and Auditors */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Companies */}
        <Card className="border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white">Top Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analytics.topCompanies}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #06B6D4' }} />
                <Bar dataKey="count" fill="#06B6D4" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Auditors */}
        <Card className="border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white">Top Auditors</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analytics.topAuditors}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #06B6D4' }} />
                <Bar dataKey="count" fill="#0EA5E9" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Status Distribution */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white">Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-emerald-400 text-sm mb-2">Completed</p>
              <p className="text-2xl font-bold text-emerald-400">{analytics.totalVerifications}</p>
            </div>
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-yellow-400 text-sm mb-2">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">{analytics.pendingVerifications}</p>
            </div>
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm mb-2">Failed</p>
              <p className="text-2xl font-bold text-red-400">{analytics.failedVerifications}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
