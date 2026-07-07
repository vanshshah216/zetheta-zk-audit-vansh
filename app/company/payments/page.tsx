'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Filter, CreditCard, AlertCircle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI } from '@/lib/company/mock-data'
import { Payment } from '@/types/company'

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const loadPayments = async () => {
      const data = await mockAPI.getPayments()
      setPayments(data)
    }
    loadPayments()
  }, [])

  const filteredPayments = payments.filter(
    (p) => statusFilter === 'all' || p.status === statusFilter
  )

  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0)
  const completedAmount = filteredPayments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = filteredPayments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald/20 text-emerald'
      case 'pending':
        return 'bg-orange/20 text-orange'
      case 'failed':
        return 'bg-red-500/20 text-red-400'
      case 'refunded':
        return 'bg-blue/20 text-blue'
      default:
        return 'bg-card text-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-emerald" />
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-orange" />
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return <CreditCard className="w-5 h-5 text-muted-foreground" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">Payments</h1>
        <p className="text-muted-foreground">Manage your payment history and invoices</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="glass">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
            <p className="text-3xl font-bold">${totalAmount.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-2">Completed</p>
            <p className="text-3xl font-bold text-emerald">${completedAmount.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-2">Pending</p>
            <p className="text-3xl font-bold text-orange">${pendingAmount.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="glass">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <select
              className="flex-1 px-3 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Payments</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Payment Table */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>{filteredPayments.length} transactions</CardDescription>
        </CardHeader>

        <CardContent>
          {filteredPayments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Payment ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Description
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-border/30 hover:bg-card/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                        {payment.id}
                      </td>
                      <td className="py-3 px-4 font-medium">{payment.description}</td>
                      <td className="py-3 px-4 font-bold">${payment.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(payment.status)}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 space-x-2">
                        {payment.invoiceUrl && (
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No payments found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
