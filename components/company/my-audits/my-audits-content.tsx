'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Download, Filter, ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI } from '@/lib/company/mock-data'
import { Audit } from '@/types/company'
import { motion } from 'framer-motion'

const ITEMS_PER_PAGE = 10

export function MyAuditsContent() {
  const [audits, setAudits] = useState<Audit[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'progress'>('date')

  useMemo(() => {
    const loadAudits = async () => {
      const data = await mockAPI.getAudits()
      setAudits(data)
    }
    loadAudits()
  }, [])

  // Filter and search
  const filteredAudits = useMemo(() => {
    let result = audits.filter((audit) => {
      const matchesSearch =
        audit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audit.id.includes(searchQuery)
      const matchesStatus = statusFilter === 'all' || audit.status === statusFilter
      const matchesPriority = priorityFilter === 'all' || audit.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })

    // Sort
    if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortBy === 'status') {
      const statusOrder = { pending: 0, 'in-progress': 1, completed: 2, failed: 3 }
      result.sort((a, b) => statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder])
    } else if (sortBy === 'progress') {
      result.sort((a, b) => b.progress - a.progress)
    }

    return result
  }, [audits, searchQuery, statusFilter, priorityFilter, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAudits.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedAudits = filteredAudits.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald/20 text-emerald'
      case 'in-progress':
        return 'bg-cyan/20 text-cyan'
      case 'pending':
        return 'bg-orange/20 text-orange'
      case 'failed':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-card text-foreground'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-500'
      case 'high':
        return 'text-orange'
      case 'medium':
        return 'text-cyan'
      case 'low':
        return 'text-blue'
      default:
        return 'text-muted-foreground'
    }
  }

  const handleExportCSV = () => {
    const csv = [
      ['Audit ID', 'Title', 'Status', 'Priority', 'Progress', 'Deadline'],
      ...filteredAudits.map((audit) => [
        audit.id,
        audit.title,
        audit.status,
        audit.priority,
        `${audit.progress}%`,
        audit.deadline ? new Date(audit.deadline).toLocaleDateString() : 'N/A',
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'audits.csv'
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card variant="glass">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by title or audit ID..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors text-sm"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value)
                    setCurrentPage(1)
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">
                  Priority
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors text-sm"
                  value={priorityFilter}
                  onChange={(e) => {
                    setPriorityFilter(e.target.value)
                    setCurrentPage(1)
                  }}
                >
                  <option value="all">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">
                  Sort By
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'status' | 'progress')}
                >
                  <option value="date">Newest First</option>
                  <option value="status">Status</option>
                  <option value="progress">Progress</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={handleExportCSV}
                  className="w-full"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Active Filters Info */}
            {(statusFilter !== 'all' || priorityFilter !== 'all' || searchQuery) && (
              <div className="text-sm text-muted-foreground">
                {filteredAudits.length} audit{filteredAudits.length !== 1 ? 's' : ''} found
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Audits ({filteredAudits.length})</CardTitle>
          <CardDescription>
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredAudits.length)} of{' '}
            {filteredAudits.length}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {paginatedAudits.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Audit ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Title
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Assigned Auditor
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Priority
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Progress
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Deadline
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAudits.map((audit, index) => (
                    <motion.tr
                      key={audit.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border/30 hover:bg-card/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                        {audit.id}
                      </td>
                      <td className="py-3 px-4 font-medium">{audit.title}</td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {audit.assignedAuditor || 'Unassigned'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(audit.status)}`}>
                          {audit.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-medium capitalize ${getPriorityColor(audit.priority)}`}>
                          {audit.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-card rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan to-blue transition-all"
                              style={{ width: `${audit.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium">{audit.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {audit.deadline ? new Date(audit.deadline).toLocaleDateString() : '-'}
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/company/audit-details/${audit.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No audits found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
