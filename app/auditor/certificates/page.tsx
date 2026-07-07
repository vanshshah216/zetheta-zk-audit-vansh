'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Share2, Eye, Award, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { useMockStore, MockCertificate } from '@/stores/mock-store'
import { useToast } from '@/hooks/use-toast'

function generateCertNumber(standard: string) {
  const rand = Math.floor(Math.random() * 900000) + 100000
  return `${standard.toUpperCase().replace(/\s/g, '')}-2024-${rand}`
}

export default function CertificatesPage() {
  const toast = useToast()
  const { certificates, proofs, issueCertificate } = useMockStore()
  const [issuing, setIssuing] = useState<string | null>(null)

  // Proofs that do NOT yet have certificates
  const proofsWithoutCert = proofs.filter(
    (p) => !certificates.some((c) => c.proofId === p.id)
  )

  const handleIssueCertificate = async (proofId: string) => {
    const proof = proofs.find((p) => p.id === proofId)
    if (!proof) return
    setIssuing(proofId)
    await new Promise((r) => setTimeout(r, 1200))

    const newCert: MockCertificate = {
      id: `cert-${Date.now()}`,
      proofId,
      auditId: proof.auditId,
      companyName: proof.companyName,
      auditType: proof.auditName,
      complianceStandard: 'ISO27001',
      certificateNumber: generateCertNumber('ISO'),
      issueDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 365 * 864e5).toISOString(),
      status: 'issued',
    }
    issueCertificate(newCert)
    setIssuing(null)
    toast.success('Certificate Issued!', `Certificate for ${proof.companyName} is ready.`)
  }

  const handleDownload = (certNumber: string) => {
    toast.success('Download Started', `Certificate ${certNumber}.pdf is being prepared.`)
  }

  const handleShare = (certNumber: string) => {
    toast.success('Link Copied!', `Shareable link for ${certNumber} copied to clipboard.`)
  }

  const handleView = (certNumber: string) => {
    toast.info('Opening Certificate', `Viewing ${certNumber}…`)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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
            <p className="text-3xl font-bold mt-2">{certificates.length}</p>
          </CardContent>
        </Card>
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-3xl font-bold text-emerald-400 mt-2">
              {certificates.filter((c) => c.status === 'issued').length}
            </p>
          </CardContent>
        </Card>
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Expiring Soon</p>
            <p className="text-3xl font-bold text-yellow-400 mt-2">0</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Issue new certificates for ready proofs */}
      {proofsWithoutCert.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="glass border-cyan-500/30 bg-cyan-950/10">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                Ready to Issue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {proofsWithoutCert.map((proof) => (
                <div
                  key={proof.id}
                  className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border/30"
                >
                  <div>
                    <p className="font-medium text-sm">{proof.companyName}</p>
                    <p className="text-xs text-muted-foreground">{proof.auditName}</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30"
                    disabled={issuing === proof.id}
                    onClick={() => handleIssueCertificate(proof.id)}
                  >
                    {issuing === proof.id ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                        <Award className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-1" /> Issue Certificate
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Certificates Grid */}
      {certificates.length === 0 ? (
        <motion.div variants={itemVariants}>
          <Card className="glass border-border/30">
            <CardContent className="pt-10 pb-10 text-center">
              <Award className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No certificates issued yet.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Generate a proof first, then issue a certificate from this page.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Card className="glass border-border/30 hover:border-cyan-500/30 transition-all">
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Certificate Number</p>
                    <p className="font-semibold">{cert.certificateNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Issued To</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan to-blue rounded-lg flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{cert.companyName}</p>
                        <p className="text-xs text-muted-foreground">{cert.complianceStandard}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Issue Date</p>
                      <p className="text-sm font-semibold">
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Expiry Date</p>
                      <p className="text-sm font-semibold text-emerald-400">
                        {new Date(cert.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="bg-emerald-950/20 border border-emerald-500/30 px-3 py-2 rounded">
                    <p className="text-xs text-emerald-400">✓ Certificate Active</p>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="flex-1"
                      onClick={() => handleView(cert.certificateNumber)}
                    >
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="flex-1"
                      onClick={() => handleDownload(cert.certificateNumber)}
                    >
                      <Download className="w-4 h-4 mr-1" /> PDF
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="flex-1"
                      onClick={() => handleShare(cert.certificateNumber)}
                    >
                      <Share2 className="w-4 h-4 mr-1" /> Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
