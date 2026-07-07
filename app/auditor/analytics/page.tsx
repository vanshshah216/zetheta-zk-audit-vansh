'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, Award, Clock, Target } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { mockAnalytics } from '@/lib/auditor/mock-data'

export default function AnalyticsPage() {
  const COLORS = ['#00E5FF', '#2563EB', '#10B981', '#7C3AED', '#ec4899']

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-2xl font-bold">Analytics & Performance</h2>
        <p className="text-muted-foreground">View your auditing performance and statistics</p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass border-blue-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-3xl font-bold text-blue-400 mt-2">{mockAnalytics.successRate}%</p>
              </div>
              <Target className="w-8 h-8 text-blue-400/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-cyan-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Audits Completed</p>
                <p className="text-3xl font-bold text-cyan-400 mt-2">{mockAnalytics.auditsCompleted}</p>
              </div>
              <Award className="w-8 h-8 text-cyan-400/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-emerald-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Completion</p>
                <p className="text-3xl font-bold text-emerald-400 mt-2">{mockAnalytics.averageCompletionTime}d</p>
              </div>
              <Clock className="w-8 h-8 text-emerald-400/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-purple-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Certificates</p>
                <p className="text-3xl font-bold text-purple-400 mt-2">{mockAnalytics.certificatesIssued}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400/50" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Trend */}
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle>Rating Trend</CardTitle>
            <CardDescription>Your performance rating over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockAnalytics.ratingTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[4, 5]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                <Line type="monotone" dataKey="rating" stroke="#00E5FF" strokeWidth={2} dot={{ fill: '#00E5FF' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Audit Categories */}
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle>Audit Categories</CardTitle>
            <CardDescription>Distribution of audits by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockAnalytics.auditCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.category}: ${entry.count}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {mockAnalytics.auditCategories.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Revenue Chart */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle>Revenue Analysis</CardTitle>
            <CardDescription>Historical earnings performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockAnalytics.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                <Legend />
                <Bar dataKey="amount" fill="#00E5FF" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Leaderboard Position */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>Your position among auditors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-cyan-950/30 to-blue-950/30 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Current Position</p>
                <p className="text-4xl font-bold text-cyan-400">#{mockAnalytics.leaderboardPosition}</p>
                <p className="text-sm text-muted-foreground mt-2">out of {mockAnalytics.leaderboardTotal} auditors</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-card/50 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">Top 5%</p>
                  <div className="w-full h-2 bg-border/30 rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                  </div>
                </div>
                <div className="bg-card/50 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">Completion Rate</p>
                  <p className="font-semibold text-emerald-400">{mockAnalytics.successRate}%</p>
                </div>
                <div className="bg-card/50 p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">Rank</p>
                  <p className="font-semibold text-yellow-400">★★★★★</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
