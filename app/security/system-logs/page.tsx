'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Search, Filter } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI } from '@/lib/security/mock-data'
import { SystemLog } from '@/types/security'

const levelColors = {
  info: { color: '#00E5FF', bg: '#00E5FF20' },
  warning: { color: '#eab308', bg: '#eab30820' },
  error: { color: '#ef4444', bg: '#ef444420' },
}

export default function SystemLogsPage() {
  const [logs, setLogs] = useState<SystemLog[]>([])
  const [filteredLogs, setFilteredLogs] = useState<SystemLog[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 15

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await mockAPI.getLogs()
        setLogs(data.reverse())
        setFilteredLogs(data.reverse())
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
          log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.details.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((log) => log.type === typeFilter)
    }

    if (levelFilter !== 'all') {
      filtered = filtered.filter((log) => log.level === levelFilter)
    }

    setFilteredLogs(filtered)
    setCurrentPage(1)
  }, [searchTerm, typeFilter, levelFilter, logs])

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const exportLogs = () => {
    const csv = [
      ['Timestamp', 'Type', 'Level', 'Message', 'Details'],
      ...filteredLogs.map((log) => [log.timestamp, log.type, log.level, log.message, log.details]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `system-logs-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">System Logs</h1>
            <p className="text-sm text-muted-foreground">Application, authentication, blockchain, and API logs</p>
          </div>
          <Button variant="outline" onClick={exportLogs} className="gap-2">
            <Download className="w-4 h-4" />
            Export Logs
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Message or details..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-2">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan"
                >
                  <option value="all">All Types</option>
                  <option value="application">Application</option>
                  <option value="authentication">Authentication</option>
                  <option value="blockchain">Blockchain</option>
                  <option value="api">API</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-2">Level</label>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan"
                >
                  <option value="all">All Levels</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Showing {paginatedLogs.length} of {filteredLogs.length} logs
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Log Entries</CardTitle>
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
                <p className="text-muted-foreground">No logs found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {paginatedLogs.map((log) => {
                  const levelConfig = levelColors[log.level]
                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-muted-foreground">{log.timestamp}</span>
                            <span
                              className="text-xs px-2 py-0.5 rounded"
                              style={{ backgroundColor: levelConfig.bg, color: levelConfig.color }}
                            >
                              {log.level.toUpperCase()}
                            </span>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded capitalize">
                              {log.type}
                            </span>
                          </div>
                          <p className="text-sm font-medium">{log.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{log.details}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
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
