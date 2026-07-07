'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockEarnings } from '@/lib/auditor/mock-data'
import { useToast } from '@/hooks/use-toast'

export default function EarningsPage() {
  const toast = useToast()
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
        <h2 className="text-2xl font-bold">Earnings & Revenue</h2>
        <p className="text-muted-foreground">Track your income from completed audits</p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass border-cyan-500/30 hover-glow-cyan">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-3xl font-bold text-cyan-400 mt-2">${mockEarnings.currentBalance.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-cyan-400/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-blue-500/30 hover-glow-blue">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Amount</p>
                <p className="text-3xl font-bold text-blue-400 mt-2">${mockEarnings.pendingAmount.toLocaleString()}</p>
              </div>
              <ArrowUpRight className="w-8 h-8 text-blue-400/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-emerald-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid This Month</p>
                <p className="text-3xl font-bold text-emerald-400 mt-2">${mockEarnings.paidAmount.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-400/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-purple-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lifetime Earnings</p>
                <p className="text-3xl font-bold text-purple-400 mt-2">${mockEarnings.lifetimeEarnings.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400/50" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Income over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockEarnings.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                <Bar dataKey="amount" fill="#00E5FF" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Historical earnings analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockEarnings.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                <Line type="monotone" dataKey="amount" stroke="#00E5FF" strokeWidth={2} dot={{ fill: '#00E5FF' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Transactions */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-border/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest earnings activity</CardDescription>
              </div>
              <Button size="sm" className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockEarnings.transactions.map((tx, idx) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-3 bg-card/50 border border-border/30 rounded-lg hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.date.toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-sm ${tx.type === 'withdrawal' ? 'text-red-400' : 'text-emerald-400'}`}>
                      {tx.type === 'withdrawal' ? '-' : '+'}${tx.amount.toLocaleString()}
                    </p>
                    <p className={`text-xs ${tx.status === 'completed' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                      {tx.status === 'completed' ? 'Completed' : 'Pending'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Withdraw Button */}
      <motion.div variants={itemVariants}>
        <Button
          className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold text-lg"
          onClick={() => toast.success('Withdrawal Initiated', 'Your funds have been queued for withdrawal.')}
        >
          <DollarSign className="w-5 h-5 mr-2" />
          Withdraw Funds
        </Button>
      </motion.div>
    </motion.div>
  )
}
