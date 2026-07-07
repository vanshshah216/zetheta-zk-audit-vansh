'use client'

import { motion } from 'framer-motion'
import { Download, Share2, Award, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { useMockStore } from '@/stores/mock-store'
import { useToast } from '@/hooks/use-toast'

export default function CertificatesPage() {
  const { certificates } = useMockStore()
  const toast = useToast()


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
                      onClick={() => toast.success('Download Started', `Certificate ${cert.certificateNumber} PDF is ready.`)}
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
