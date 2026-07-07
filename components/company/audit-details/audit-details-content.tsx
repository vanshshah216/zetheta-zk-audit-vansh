'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Clock,
  CheckCircle,
  FileText,
  MessageSquare,
  Download,
  Copy,
  ExternalLink,
  AlertCircle,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI } from '@/lib/company/mock-data'
import { Audit, AuditFile } from '@/types/company'

interface AuditDetailsContentProps {
  auditId: string
}

export function AuditDetailsContent({ auditId }: AuditDetailsContentProps) {
  const [audit, setAudit] = useState<Audit | null>(null)
  const [files, setFiles] = useState<AuditFile[]>([])
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const auditData = await mockAPI.getAudit(auditId)
        const filesData = await mockAPI.getAuditFiles(auditId)
        setAudit(auditData || null)
        setFiles(filesData)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [auditId])

  if (loading) {
    return <div className="text-center py-12">Loading audit details...</div>
  }

  if (!audit) {
    return <div className="text-center py-12 text-red-500">Audit not found</div>
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-emerald" />
      case 'in-progress':
        return <Clock className="w-5 h-5 text-cyan" />
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-orange" />
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-6xl"
    >
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{audit.title}</h1>
            <p className="text-muted-foreground">{audit.description}</p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(audit.status)}
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-cyan/20 text-cyan">
              {audit.status}
            </span>
          </div>
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-card rounded-lg border border-border/50">
            <p className="text-xs text-muted-foreground mb-1">Audit ID</p>
            <p className="font-mono text-sm text-cyan">{audit.id}</p>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border/50">
            <p className="text-xs text-muted-foreground mb-1">Assigned Auditor</p>
            <p className="font-medium">{audit.assignedAuditor || 'Not assigned'}</p>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border/50">
            <p className="text-xs text-muted-foreground mb-1">Priority</p>
            <p className="font-medium capitalize text-orange">{audit.priority}</p>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border/50">
            <p className="text-xs text-muted-foreground mb-1">Deadline</p>
            <p className="font-medium">
              {audit.deadline ? new Date(audit.deadline).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Progress & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Audit Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Completion</span>
                  <span className="text-sm font-bold text-cyan">{audit.progress}%</span>
                </div>
                <div className="w-full bg-card rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${audit.progress}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-cyan to-blue rounded-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {audit.estimatedCost && (
                  <div className="p-3 bg-card/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Estimated Cost</p>
                    <p className="font-bold text-lg">${audit.estimatedCost.toLocaleString()}</p>
                  </div>
                )}
                {audit.budget && (
                  <div className="p-3 bg-card/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Budget</p>
                    <p className="font-bold text-lg">${audit.budget.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
              <CardDescription>Audit milestones and key dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <TimelineItem
                  date={new Date(audit.createdAt).toLocaleDateString()}
                  title="Audit Requested"
                  description="Initial audit request created"
                  completed={true}
                />
                <TimelineItem
                  date={audit.deadline ? new Date(audit.deadline).toLocaleDateString() : 'TBD'}
                  title="Expected Completion"
                  description={audit.status === 'completed' ? 'Audit completed' : 'Target completion date'}
                  completed={audit.status === 'completed'}
                />
                {audit.completionDate && (
                  <TimelineItem
                    date={new Date(audit.completionDate).toLocaleDateString()}
                    title="Completed"
                    description="Audit work finished"
                    completed={true}
                  />
                )}
                {audit.proofGenerated && (
                  <TimelineItem
                    date="Generated"
                    title="Proof Generated"
                    description="Blockchain proof created"
                    completed={true}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Files */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
              <CardDescription>{files.length} files attached</CardDescription>
            </CardHeader>
            <CardContent>
              {files.length > 0 ? (
                <div className="space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border/50 hover:border-cyan/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <FileText className="w-5 h-5 text-cyan flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB •{' '}
                            {new Date(file.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No files uploaded yet</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Status Cards */}
        <div className="space-y-4">
          {/* Status Card */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-lg">Status Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Current Status</p>
                <p className="font-medium capitalize">{audit.status}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Category</p>
                <p className="font-medium">{audit.category}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Industry</p>
                <p className="font-medium">{audit.industry}</p>
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Status */}
          {audit.blockchainTxHash && (
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg">Blockchain</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Transaction Hash</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-card px-2 py-1 rounded flex-1 truncate">
                      {audit.blockchainTxHash}
                    </code>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-2 bg-emerald/10 border border-emerald/30 rounded text-sm text-emerald flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Confirmed on chain
                </div>
              </CardContent>
            </Card>
          )}

          {/* Certificate Status */}
          {audit.certificateId && (
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg">Certificate</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full justify-between">
                  <span>Download Certificate</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message Auditor
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}

function TimelineItem({
  date,
  title,
  description,
  completed,
}: {
  date: string
  title: string
  description: string
  completed: boolean
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full border-2 ${
            completed ? 'bg-cyan border-cyan' : 'border-muted-foreground'
          }`}
        />
        <div className="w-0.5 h-12 bg-border/50 mt-2" />
      </div>
      <div className="pb-8">
        <p className="text-xs text-muted-foreground">{date}</p>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
