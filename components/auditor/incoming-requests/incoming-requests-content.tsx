'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, ChevronRight, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockIncomingRequests } from '@/lib/auditor/mock-data'
import { AuditRequest } from '@/types/auditor'

export function IncomingRequestsContent() {
  const [requests, setRequests] = useState<AuditRequest[]>(mockIncomingRequests)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('deadline')

  const filteredRequests = requests
    .filter(req =>
      (req.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.auditType.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterPriority === 'all' || req.priority === filterPriority)
    )
    .sort((a, b) => {
      if (sortBy === 'deadline') return a.deadline.getTime() - b.deadline.getTime()
      if (sortBy === 'budget') return b.budget - a.budget
      return 0
    })

  const handleAccept = (id: string) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'accepted' } : req
    ))
  }

  const handleReject = (id: string) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'rejected' } : req
    ))
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'border-green-500/30 bg-green-950/10',
      medium: 'border-yellow-500/30 bg-yellow-950/10',
      high: 'border-orange-500/30 bg-orange-950/10',
      critical: 'border-red-500/30 bg-red-950/10',
    }
    return colors[priority] || colors.low
  }

  const getPriorityBadgeColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'text-green-400',
      medium: 'text-yellow-400',
      high: 'text-orange-400',
      critical: 'text-red-400',
    }
    return colors[priority] || colors.low
  }

  const daysUntilDeadline = (deadline: Date) => {
    const days = Math.ceil((deadline.getTime() - Date.now()) / (24 * 60 * 60 * 1000))
    return days
  }

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-6"
    >
      {/* Header with Filters */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Incoming Audit Requests</h2>
          <p className="text-muted-foreground">Review and accept new audit requests from companies</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by company name or audit type..."
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

      {/* Requests List */}
      <motion.div variants={itemVariants} className="space-y-3">
        {filteredRequests.length === 0 ? (
          <Card className="glass border-border/30">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No requests found</p>
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request, idx) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`glass border rounded-lg p-4 md:p-5 hover:border-cyan-500/50 transition-all cursor-pointer ${getPriorityColor(request.priority)}`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Company Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan to-blue rounded-lg flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold">{request.companyName}</h3>
                      <p className="text-xs text-muted-foreground">{request.industry}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{request.auditType} • {request.complianceStandard}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{request.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="font-semibold">${request.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Priority</p>
                    <p className={`font-semibold text-sm ${getPriorityBadgeColor(request.priority)} capitalize`}>
                      {request.priority}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Deadline</p>
                    <p className="font-semibold">{daysUntilDeadline(request.deadline)} days</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 md:flex-col">
                  {request.status === 'pending' ? (
                    <>
                      <Button
                        size="sm"
                        className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30"
                        onClick={() => handleAccept(request.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-1 text-red-400 hover:bg-red-950/30"
                        onClick={() => handleReject(request.id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  ) : (
                    <div className="text-center">
                      <p className={`text-sm font-semibold ${request.status === 'accepted' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {request.status === 'accepted' ? 'Accepted' : 'Rejected'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="glass border-border/30">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Requests</p>
            <p className="text-2xl font-bold mt-1">{requests.length}</p>
          </CardContent>
        </Card>
        <Card className="glass border-border/30">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-400 mt-1">{requests.filter(r => r.status === 'pending').length}</p>
          </CardContent>
        </Card>
        <Card className="glass border-border/30">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Accepted</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{requests.filter(r => r.status === 'accepted').length}</p>
          </CardContent>
        </Card>
        <Card className="glass border-border/30">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold mt-1">${requests.reduce((sum, r) => sum + r.budget, 0).toLocaleString()}</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
