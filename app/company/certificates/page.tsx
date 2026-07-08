'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Share2, Award, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { useMockStore, MockCertificate } from '@/stores/mock-store'
import { supabaseAuditService } from '@/services/supabase-audit-service'
import { useToast } from '@/hooks/use-toast'
import { downloadCertificatePdf } from '@/lib/pdf-export'

export default function CertificatesPage() {
  const { certificates: mockCerts } = useMockStore()
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [dbCertificates, setDbCertificates] = useState<MockCertificate[]>([])

  useEffect(() => {
    const fetchCerts = async () => {
      setIsLoading(true)
      try {
        const profile = await supabaseAuditService.getProfileByEmail('company@example.com')
        if (profile) {
          const certs = await supabaseAuditService.getCertificatesByCompany(profile.id)
          const mappedCerts = certs.map((c) => ({
            id: c.id,
            proofId: '', // Mock fallback
            auditId: c.audit_id,
            companyName: c.company_name,
            auditType: c.audit_type,
            complianceStandard: c.compliance_standard,
            certificateNumber: 'N/A',
            issueDate: c.issue_date,
            expiryDate: c.expiry_date,
            status: c.status as any,
          }))
          setDbCertificates(mappedCerts)
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to mock store', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCerts()
  }, [])

  const certificates = dbCertificates.length > 0 ? dbCertificates : mockCerts

  const handleDownload = async (cert: MockCertificate) => {
    try {
      await downloadCertificatePdf({
        id: cert.id,
        certificateNumber: cert.certificateNumber,
        companyName: cert.companyName,
        auditType: cert.auditType,
        complianceStandard: cert.complianceStandard,
        issueDate: cert.issueDate,
        expiryDate: cert.expiryDate,
        status: cert.status,
      })
      toast.success('Download Started', `Certificate ${cert.certificateNumber} PDF has been downloaded.`)
    } catch (error) {
      console.error('Certificate PDF download failed', error)
      toast.error('Download Failed', 'Unable to generate the certificate PDF right now.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">Certificates</h1>
        <p className="text-muted-foreground">Download and share your compliance certificates</p>
      </div>

      {isLoading && (
        <div className="text-sm text-cyan-400 bg-cyan-900/20 border border-cyan-500/20 p-2 rounded text-center animate-pulse">
          Loading certificates...
        </div>
      )}

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => {
          const isExpired = new Date(cert.expiryDate) < new Date()
          const daysUntilExpiry = Math.ceil(
            (new Date(cert.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          )

          return (
            <motion.div
              key={cert.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card variant="neon" className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Award className="w-8 h-8 text-cyan" />
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      isExpired
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-emerald/20 text-emerald'
                    }`}>
                      {isExpired ? 'Expired' : 'Valid'}
                    </span>
                  </div>
                  <CardTitle>{cert.complianceStandard}</CardTitle>
                  <CardDescription>Compliance Certificate</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Issued</p>
                        <p className="text-sm font-medium">
                          {new Date(cert.issueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Expires</p>
                        <p className="text-sm font-medium">
                          {new Date(cert.expiryDate).toLocaleDateString()}
                          {!isExpired && (
                            <span className="text-xs text-muted-foreground ml-2">
                              ({daysUntilExpiry} days)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <Button
                      className="w-full"
                      variant="cyan"
                      size="sm"
                      onClick={() => handleDownload(cert)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button
                      className="w-full"
                      variant="outline"
                      size="sm"
                      onClick={() => toast.success('Link Copied!', `Shareable link for ${cert.certificateNumber} copied.`)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {certificates.length === 0 && (
        <Card variant="glass">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No certificates yet</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
