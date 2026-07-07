'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI } from '@/lib/security/mock-data'
import { ComplianceStatus } from '@/types/security'

export default function CompliancePage() {
  const [compliance, setCompliance] = useState<ComplianceStatus[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCompliance = async () => {
      try {
        const data = await mockAPI.getCompliance()
        setCompliance(data)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    loadCompliance()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  const compliantCount = compliance.filter((c) => c.status === 'compliant').length

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="text-2xl font-bold">Compliance Center</h1>
          <p className="text-sm text-muted-foreground">Track compliance status and certifications</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-cyan">{compliantCount}</p>
              <p className="text-sm text-muted-foreground">of {compliance.length} standards compliant</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {compliance.map((standard) => (
            <motion.div
              key={standard.standard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-border h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{standard.standard}</CardTitle>
                    {standard.status === 'compliant' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  <CardDescription className="capitalize">{standard.status}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Compliance Progress</span>
                      <span className="text-sm font-semibold">{standard.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${standard.progress}%` }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className={`h-full ${
                          standard.progress === 100 ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Last Audit</p>
                      <p className="font-medium">{standard.lastAudit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Next Audit</p>
                      <p className="font-medium">{standard.nextAudit}</p>
                    </div>
                  </div>

                  {standard.certificateUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => window.open(standard.certificateUrl, '_blank')}
                    >
                      <Download className="w-4 h-4" />
                      View Certificate
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
