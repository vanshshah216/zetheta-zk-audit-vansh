'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAssignedAudits } from '@/lib/auditor/mock-data'
import { Clock, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react'

export function AssignedAuditsContent() {
  const audits = mockAssignedAudits

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

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'in-progress': 'text-blue-400',
      'review': 'text-yellow-400',
      'completed': 'text-emerald-400',
    }
    return colors[status] || colors['in-progress']
  }

  const daysUntilDue = (dueDate: Date) => {
    const days = Math.ceil((dueDate.getTime() - Date.now()) / (24 * 60 * 60 * 1000))
    return days
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-2xl font-bold">Assigned Audits</h2>
        <p className="text-muted-foreground">Manage and track your assigned compliance audits</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Assigned</p>
            <p className="text-3xl font-bold mt-2">{audits.length}</p>
          </CardContent>
        </Card>
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-3xl font-bold text-blue-400 mt-2">{audits.filter(a => a.status === 'in-progress').length}</p>
          </CardContent>
        </Card>
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Avg Completion</p>
            <p className="text-3xl font-bold text-emerald-400 mt-2">{Math.round(audits.reduce((sum, a) => sum + a.progress, 0) / audits.length)}%</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Audits List */}
      <motion.div variants={itemVariants} className="space-y-4">
        {audits.map((audit, idx) => (
          <motion.div
            key={audit.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="glass border-border/30 hover:border-cyan-500/30 transition-all">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan to-blue rounded-lg"></div>
                        <div>
                          <h3 className="font-semibold">{audit.companyName}</h3>
                          <p className="text-sm text-muted-foreground">{audit.auditType}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold capitalize ${getStatusColor(audit.status)}`}>{audit.status}</p>
                      <p className="text-xs text-muted-foreground mt-1">{daysUntilDue(audit.dueDate)} days left</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-semibold">{audit.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-card/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${audit.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex flex-wrap gap-2">
                    {audit.timeline.map((item) => (
                      <div
                        key={item.id}
                        className={`text-xs px-2 py-1 rounded border ${
                          item.status === 'completed'
                            ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400'
                            : item.status === 'in-progress'
                            ? 'bg-blue-950/30 border-blue-500/30 text-blue-400'
                            : 'bg-card/50 border-border/30 text-muted-foreground'
                        }`}
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>

                  {/* Documents and Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/30">
                    <div>
                      <p className="text-xs text-muted-foreground">Documents</p>
                      <p className="font-semibold mt-1">{audit.documents.length}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Due Date</p>
                      <p className="font-semibold text-sm mt-1">{audit.dueDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Payment</p>
                      <p className="font-semibold text-emerald-400 mt-1">${audit.paymentAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-right md:text-left">
                      <Button size="sm" className="mt-4 md:mt-0">
                        Continue <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
