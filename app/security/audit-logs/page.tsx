'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Search, Filter, DownloadCloud, FileDown } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI } from '@/lib/security/mock-data'
import { AuditLog } from '@/types/security'

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 10

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const auditLogs = await mockAPI.getAuditLogs()
        setLogs(auditLogs)
        setFilteredLogs(auditLogs)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    loadLogs()
  }, [])

  useEffect(() => {
    let filtered = logs

    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.ipAddress.includes(searchTerm)
      )
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter((log) => log.role === roleFilter)
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((log) => log.status === statusFilter)
    }

    setFilteredLogs(filtered)
    setCurrentPage(1)
  }, [searchTerm, roleFilter, statusFilter, logs])

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const exportCSV = () => {
    const csv = [
      ['Timestamp', 'User', 'Role', 'Action', 'IP Address', 'Device', 'Location', 'Status'],
      ...filteredLogs.map((log) => [
        log.timestamp,
        log.user,
        log.role,
        log.action,
        log.ipAddress,
        log.device,
        log.location,
        log.status,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const exportPDF = () => {
    alert('PDF export feature - would integrate with PDF library in production')
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Audit Logs</h1>
            <p className="text-sm text-muted-foreground">Track all platform activities and changes</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportCSV} className="gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={exportPDF} className="gap-2">
              <FileDown className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Filters & Search</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="User, action, IP..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-2">Role</label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="company">Company</option>
                  <option value="auditor">Auditor</option>
                  <option value="verifier">Verifier</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan"
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Showing {paginatedLogs.length} of {filteredLogs.length} logs
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Audit Log Entries</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No audit logs found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-xs">Timestamp</th>
                      <th className="text-left py-3 px-4 font-semibold text-xs">User</th>
                      <th className="text-left py-3 px-4 font-semibold text-xs">Role</th>
                      <th className="text-left py-3 px-4 font-semibold text-xs">Action</th>
                      <th className="text-left py-3 px-4 font-semibold text-xs">IP Address</th>
                      <th className="text-left py-3 px-4 font-semibold text-xs">Device</th>
                      <th className="text-left py-3 px-4 font-semibold text-xs">Location</th>
                      <th className="text-left py-3 px-4 font-semibold text-xs">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedLogs.map((log) => (
                      <tr key={log.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 text-xs">{log.timestamp}</td>
                        <td className="py-3 px-4 text-xs">{log.user}</td>
                        <td className="py-3 px-4 text-xs">
                          <span className="px-2 py-1 bg-muted rounded text-xs">{log.role}</span>
                        </td>
                        <td className="py-3 px-4 text-xs">{log.action}</td>
                        <td className="py-3 px-4 text-xs font-mono">{log.ipAddress}</td>
                        <td className="py-3 px-4 text-xs">{log.device}</td>
                        <td className="py-3 px-4 text-xs">{log.location}</td>
                        <td className="py-3 px-4 text-xs">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              log.status === 'success'
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-red-500/20 text-red-500'
                            }`}
                          >
                            {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {filteredLogs.length > 0 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <p className="text-xs text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
