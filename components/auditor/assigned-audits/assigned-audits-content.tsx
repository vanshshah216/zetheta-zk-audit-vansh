'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { useMockStore, MockAuditRequest } from '@/stores/mock-store'
import { supabaseAuditService } from '@/services/supabase-audit-service'
import { ChevronRight, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export function AssignedAuditsContent() {
  const router = useRouter()
  const { getAssignedAudits } = useMockStore()
  
  const [isLoading, setIsLoading] = useState(true)
  const [dbAudits, setDbAudits] = useState<MockAuditRequest[]>([])

  useEffect(() => {
    const fetchAudits = async () => {
      setIsLoading(true)
      try {
        const profile = await supabaseAuditService.getProfileByEmail('auditor@example.com')
        if (profile) {
          const reqs = await supabaseAuditService.getAssignedAuditRequests(profile.id)
          const mapped = reqs.map((r) => ({
            id: r.id,
            companyId: r.company_id,
            companyName: r.company_name,
            auditType: r.audit_type,
            budget: r.budget,
            priority: r.priority as any,
            deadline: r.deadline,
            complianceStandard: r.compliance_standard,
            description: r.description,
            status: r.status as any,
            documentsCount: r.documents_count,
            industry: r.industry,
            createdAt: r.created_at,
          }))
          setDbAudits(mapped)
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to mock store', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAudits()
  }, [])

  const mockAudits = getAssignedAudits()
  const audits = dbAudits.length > 0 ? dbAudits : mockAudits

  const daysUntilDue = (deadline: string) =>
    Math.ceil((new Date(deadline).getTime() - Date.now()) / 864e5)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle className="w-4 h-4 text-emerald-400" />
    if (status === 'rejected') return <AlertCircle className="w-4 h-4 text-red-400" />
    return <Clock className="w-4 h-4 text-blue-400" />
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-2xl font-bold">Assigned Audits</h2>
        <p className="text-muted-foreground">
          Manage and track your accepted compliance audits
        </p>
      </motion.div>

      {/* Stats */}
      {isLoading && (
        <motion.div variants={itemVariants} className="text-sm text-cyan-400 bg-cyan-900/20 border border-cyan-500/20 p-2 rounded text-center animate-pulse">
          Loading assigned audits...
        </motion.div>
      )}
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
            <p className="text-3xl font-bold text-blue-400 mt-2">
              {audits.filter((a) => a.status === 'accepted').length}
            </p>
          </CardContent>
        </Card>
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-3xl font-bold text-emerald-400 mt-2">
              ${audits.reduce((s, a) => s + a.budget, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Audits List */}
      <motion.div variants={itemVariants} className="space-y-4">
        {audits.length === 0 ? (
          <Card className="glass border-border/30">
            <CardContent className="pt-8 pb-8 text-center">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium mb-1">No assigned audits yet</p>
              <p className="text-sm text-muted-foreground mb-4">
                Accept incoming requests to start working on audits.
              </p>
              <Button onClick={() => router.push('/auditor/incoming-requests')}>
                View Incoming Requests
              </Button>
            </CardContent>
          </Card>
        ) : (
          audits.map((audit, idx) => (
            <motion.div
              key={audit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Card className="glass border-border/30 hover:border-cyan-500/30 transition-all">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan to-blue rounded-lg" />
                          <div>
                            <h3 className="font-semibold">{audit.companyName}</h3>
                            <p className="text-sm text-muted-foreground">{audit.auditType}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{audit.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-1 justify-end">
                          {getStatusIcon(audit.status)}
                          <p className="text-sm font-semibold capitalize text-blue-400">
                            In Progress
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {daysUntilDue(audit.deadline)} days left
                        </p>
                      </div>
                    </div>

                    {/* Progress bar (mock) */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-semibold">25%</span>
                      </div>
                      <div className="w-full h-2 bg-card/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: '25%' }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Meta + Actions */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/30">
                      <div>
                        <p className="text-xs text-muted-foreground">Compliance</p>
                        <p className="font-semibold text-sm mt-1">{audit.complianceStandard}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Deadline</p>
                        <p className="font-semibold text-sm mt-1">
                          {new Date(audit.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Budget</p>
                        <p className="font-semibold text-emerald-400 mt-1">
                          ${audit.budget.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right md:text-left">
                        <Button
                          size="sm"
                          className="mt-2 md:mt-0"
                          onClick={() => router.push('/auditor/generate-proof')}
                        >
                          Generate ZK Proof <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  )
}
