'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Share2, Shield, Calendar, CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { mockVerifierAPI } from '@/lib/verifier/mock-data'
import { Certificate } from '@/types/verifier'

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const data = await mockVerifierAPI.getCertificates()
        setCertificates(data)
      } finally {
        setLoading(false)
      }
    }
    loadCertificates()
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Compliance Certificates</h1>
        <p className="text-gray-400">Manage and verify digital compliance certificates</p>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading certificates...</div>
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
                cert.status === 'expired' ? 'opacity-75' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">{cert.number}</CardTitle>
                      <CardDescription>{cert.organization}</CardDescription>
                    </div>
                    {cert.verificationStatus === 'verified' ? (
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-yellow-500" />
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Standard */}
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-400">Standard</p>
                      <p className="text-white font-medium">{cert.standard}</p>
                    </div>
                  </div>

                  {/* Dates */}
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
                        <p className={`text-sm ${cert.status === 'expired' ? 'text-red-400' : 'text-white'}`}>
                          {new Date(cert.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-700">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        cert.status === 'valid'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : cert.status === 'expired'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {cert.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 py-2 px-3 rounded-lg border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-colors flex items-center justify-center gap-2 text-sm">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="flex-1 py-2 px-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-900/50 transition-colors flex items-center justify-center gap-2 text-sm">
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
