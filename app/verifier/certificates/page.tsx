'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Share2, Shield, Calendar, CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { useMockStore, MockCertificate } from '@/stores/mock-store'
import { supabaseAuditService } from '@/services/supabase-audit-service'
import { useToast } from '@/hooks/use-toast'

export default function CertificatesPage() {
  const { certificates: mockCerts } = useMockStore()
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [dbCertificates, setDbCertificates] = useState<MockCertificate[]>([])

  useEffect(() => {
    const fetchCerts = async () => {
      setIsLoading(true)
      try {
        const certs = await supabaseAuditService.getCertificates()
        const mappedCerts = certs.map((c) => ({
          id: c.id,
          proofId: '', // Mock fallback
          auditId: c.audit_id,
          companyName: c.company_name,
          auditType: c.audit_type,
          complianceStandard: c.compliance_standard,
          certificateNumber: 'N/A', // Usually generated locally in mock
          issueDate: c.issue_date,
          expiryDate: c.expiry_date,
          status: c.status as any,
        }))
        setDbCertificates(mappedCerts)
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to mock store', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCerts()
  }, [])

  const certificates = dbCertificates.length > 0 ? dbCertificates : mockCerts


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Compliance Certificates</h1>
        <p className="text-gray-400">Manage and verify digital compliance certificates</p>
      </div>

      {isLoading && (
        <div className="text-sm text-cyan-400 bg-cyan-900/20 border border-cyan-500/20 p-2 rounded text-center animate-pulse">
          Loading certificates...
        </div>
      )}

      {certificates.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No certificates available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <Card className={`border-cyan-500/20 hover:border-cyan-500/40 transition-all ${
                cert.status === 'revoked' ? 'opacity-75' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">{cert.certificateNumber}</CardTitle>
                      <CardDescription>{cert.companyName}</CardDescription>
                    </div>
                    {cert.status === 'issued' ? (
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-yellow-500" />
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-400">Standard</p>
                      <p className="text-white font-medium">{cert.complianceStandard}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-400">Issued</p>
                        <p className="text-white text-sm">{new Date(cert.issueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-xs text-gray-400">Expires</p>
                        <p className="text-white text-sm">{new Date(cert.expiryDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-gray-700">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      cert.status === 'issued'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {cert.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => toast.success('Download Started', `Certificate ${cert.certificateNumber} PDF ready.`)}
                      className="flex-1 py-2 px-3 rounded-lg border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={() => toast.success('Link Copied!', `Shareable link for ${cert.certificateNumber} copied.`)}
                      className="flex-1 py-2 px-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-900/50 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
