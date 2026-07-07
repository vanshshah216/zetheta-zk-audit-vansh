'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, CheckCircle, XCircle, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { useMockStore } from '@/stores/mock-store'
import { useToast } from '@/hooks/use-toast'

export function IncomingRequestsContent() {
  const router = useRouter()
  const toast = useToast()
  const { auditRequests, acceptRequest, rejectRequest } = useMockStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState('all')
  const [sortBy, setSortBy] = useState('deadline')

  const requests = auditRequests
    .filter((req) =>
      (req.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.auditType.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterPriority === 'all' || req.priority === filterPriority)
    )
    .sort((a, b) => {
      if (sortBy === 'deadline') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      if (sortBy === 'budget') return b.budget - a.budget
      return 0
    })

  const handleAccept = (id: string, companyName: string) => {
    acceptRequest(id)
    toast.success('Request Accepted', `Audit from ${companyName} has been accepted.`)
  }

  const handleReject = (id: string, companyName: string) => {
    rejectRequest(id)
    toast.error('Request Rejected', `Audit request from ${companyName} has been rejected.`)
  }

  const daysUntilDeadline = (deadline: string) =>
    Math.ceil((new Date(deadline).getTime() - Date.now()) / 864e5)

  const getPriorityColor = (priority: string) => {
    const map: Record<string, string> = {
      low: 'border-green-500/30 bg-green-950/10',
      medium: 'border-yellow-500/30 bg-yellow-950/10',
      high: 'border-orange-500/30 bg-orange-950/10',
      critical: 'border-red-500/30 bg-red-950/10',
    }
    return map[priority] ?? map.low
  }

  const getPriorityBadge = (priority: string) => {
    const map: Record<string, string> = {
      low: 'text-green-400',
      medium: 'text-yellow-400',
      high: 'text-orange-400',
      critical: 'text-red-400',
    }
    return map[priority] ?? map.low
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full space-y-6">
      {/* Header + Filters */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">Incoming Audit Requests</h2>
          <p className="text-muted-foreground">Review and accept new audit requests from companies</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by company or audit type…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card/50 border border-border/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 bg-card/50 border border-border/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-card/50 border border-border/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="deadline">Sort by Deadline</option>
            <option value="budget">Sort by Budget</option>
          </select>
        </div>
      </motion.div>

      {/* Request List */}
      <motion.div variants={itemVariants} className="space-y-3">
        {requests.length === 0 ? (
          <Card className="glass border-border/30">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                {auditRequests.length === 0 ? "No incoming audit requests yet." : "No requests match your filters."}
              </p>
            </CardContent>
          </Card>
        ) : (
          requests.map((req, idx) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
              className={`glass border rounded-lg p-4 md:p-5 hover:border-cyan-500/40 transition-all ${getPriorityColor(req.priority)}`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Company Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan to-blue rounded-lg flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">{req.companyName}</h3>
                      <p className="text-xs text-muted-foreground">{req.industry}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {req.auditType} • {req.complianceStandard}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{req.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="font-semibold">${req.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Priority</p>
                    <p className={`font-semibold text-sm capitalize ${getPriorityBadge(req.priority)}`}>
                      {req.priority}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Deadline</p>
                    <p className="font-semibold">{daysUntilDeadline(req.deadline)}d</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 md:flex-col">
                  {req.status === 'pending' ? (
                    <>
                      <Button
                        size="sm"
                        className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30"
                        onClick={() => handleAccept(req.id, req.companyName)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accept Audit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-1 text-red-400 hover:bg-red-950/30"
                        onClick={() => handleReject(req.id, req.companyName)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-1"
                        onClick={() => router.push(`/auditor/audit-details/${req.id}`)}
                      >
                        <ChevronRight className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </>
                  ) : (
                    <div className="text-center px-2">
                      <p
                        className={`text-sm font-semibold ${
                          req.status === 'accepted' ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        {req.status === 'accepted' ? '✓ Accepted' : '✕ Rejected'}
                      </p>
                      {req.status === 'accepted' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="mt-1 text-xs"
                          onClick={() => router.push('/auditor/assigned-audits')}
                        >
                          View →
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Summary Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: auditRequests.length, color: '' },
          { label: 'Pending', value: auditRequests.filter((r) => r.status === 'pending').length, color: 'text-yellow-400' },
          { label: 'Accepted', value: auditRequests.filter((r) => r.status === 'accepted').length, color: 'text-emerald-400' },
          {
            label: 'Total Value',
            value: `$${auditRequests.reduce((s, r) => s + r.budget, 0).toLocaleString()}`,
            color: 'text-cyan-400',
          },
        ].map((stat) => (
          <Card key={stat.label} className="glass border-border/30">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  )
}
