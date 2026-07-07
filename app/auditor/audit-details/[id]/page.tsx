'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Download, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAssignedAudits } from '@/lib/auditor/mock-data'

export default function AuditDetailsPage({ params }: { params: { id: string } }) {
  const audit = mockAssignedAudits[0] // Using first audit as example

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
      {/* Header with Back Button */}
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
        <Link href="/auditor/assigned-audits">
          <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </Link>
      </motion.div>

      {/* Main Info */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan to-blue rounded-lg flex-shrink-0"></div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{audit.companyName}</h2>
                <p className="text-muted-foreground mt-1">{audit.auditType}</p>
                <p className="text-sm text-muted-foreground mt-2">Due: {audit.dueDate.toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-cyan-400">{audit.progress}%</p>
                <p className="text-sm text-muted-foreground">Complete</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Timeline */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle>Audit Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {audit.timeline.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.status === 'completed'
                          ? 'bg-emerald-500/20 border border-emerald-500/30'
                          : item.status === 'in-progress'
                          ? 'bg-blue-500/20 border border-blue-500/30'
                          : 'bg-gray-500/20 border border-gray-500/30'
                      }`}
                    >
                      {item.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      ) : item.status === 'in-progress' ? (
                        <Clock className="w-5 h-5 text-blue-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    {idx < audit.timeline.length - 1 && <div className="w-0.5 h-12 bg-border/30"></div>}
                  </div>
                  <div className="pb-4">
                    <p className="font-semibold">{item.title}</p>
                    {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
                    <p className="text-xs text-muted-foreground mt-2">{item.timestamp.toLocaleDateString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Documents */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle>Uploaded Documents</CardTitle>
            <CardDescription>{audit.documents.length} files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {audit.documents.map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-3 bg-card/50 border border-border/30 rounded-lg hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.size}MB • {doc.uploadedAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Compliance Requirements */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle>Compliance Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {audit.complianceRequirements.map((req, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-2 p-3 bg-card/50 border border-border/30 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm">{req}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment Info */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle className="text-base">Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">Amount Due</p>
            <p className="text-3xl font-bold text-emerald-400">${audit.paymentAmount.toLocaleString()}</p>
            <p className={`text-sm mt-3 capitalize ${audit.paymentStatus === 'completed' ? 'text-emerald-400' : 'text-yellow-400'}`}>
              {audit.paymentStatus === 'completed' ? '✓ Completed' : '⏳ Pending'}
            </p>
          </CardContent>
        </Card>

        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle className="text-base">Estimated Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">Target Date</p>
            <p className="text-2xl font-bold">{audit.estimatedCompletion.toLocaleDateString()}</p>
            <p className="text-sm text-muted-foreground mt-3">
              {Math.ceil((audit.estimatedCompletion.getTime() - Date.now()) / (24 * 60 * 60 * 1000))} days remaining
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 h-12">
          Generate Proof
        </Button>
        <Button className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 h-12">
          Issue Certificate
        </Button>
        <Button variant="ghost" className="flex-1 border border-border/30">
          Send Message
        </Button>
      </motion.div>
    </motion.div>
  )
}
