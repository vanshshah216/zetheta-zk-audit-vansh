'use client'

import { motion } from 'framer-motion'
import { Download, Share2, Eye } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockCertificates } from '@/lib/auditor/mock-data'

export default function CertificatesPage() {
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
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-2xl font-bold">Issued Certificates</h2>
        <p className="text-muted-foreground">Manage compliance certificates issued to companies</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Issued</p>
            <p className="text-3xl font-bold mt-2">{mockCertificates.length}</p>
          </CardContent>
        </Card>
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-3xl font-bold text-emerald-400 mt-2">{mockCertificates.filter(c => c.status === 'issued').length}</p>
          </CardContent>
        </Card>
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Expiring Soon</p>
            <p className="text-3xl font-bold text-yellow-400 mt-2">0</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Certificates Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCertificates.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="glass border-border/30 hover:border-cyan-500/30 transition-all">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Certificate Number</p>
                    <p className="font-semibold">{cert.certificateNumber}</p>
                  </div>

                  {/* Company Info */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Issued To</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan to-blue rounded-lg"></div>
                      <div>
                        <p className="font-medium text-sm">{cert.companyName}</p>
                        <p className="text-xs text-muted-foreground">{cert.complianceStandard}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Issue Date</p>
                      <p className="text-sm font-semibold">{cert.issueDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Expiry Date</p>
                      <p className="text-sm font-semibold text-emerald-400">{cert.expiryDate.toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="bg-emerald-950/20 border border-emerald-500/30 px-3 py-2 rounded">
                    <p className="text-xs text-emerald-400">✓ Certificate Active</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="ghost" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="ghost" className="flex-1">
                      <Download className="w-4 h-4 mr-1" />
                      PDF
                    </Button>
                    <Button size="sm" variant="ghost" className="flex-1">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
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
