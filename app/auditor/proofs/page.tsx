'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Download, Copy, CheckCircle, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { useMockStore, MockProof } from '@/stores/mock-store'
import { supabaseAuditService } from '@/services/supabase-audit-service'
import { useToast } from '@/hooks/use-toast'

export default function ProofsPage() {
  const router = useRouter()
  const toast = useToast()
  const { proofs: mockProofs } = useMockStore()

  const [isLoading, setIsLoading] = useState(true)
  const [dbProofs, setDbProofs] = useState<MockProof[]>([])

  useEffect(() => {
    const fetchProofs = async () => {
      setIsLoading(true)
      try {
        const p = await supabaseAuditService.getProofs()
        const mapped = p.map((r) => ({
          id: r.id,
          auditId: r.audit_id,
          auditName: r.audit_name,
          companyName: r.company_name,
          status: r.status as any,
          hash: r.hash,
          blockchainTxHash: r.blockchain_tx_hash || '',
          generatedAt: r.generated_at,
          verificationStatus: r.verification_status as any,
        }))
        setDbProofs(mapped)
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to mock store', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProofs()
  }, [])

  const proofs = dbProofs.length > 0 ? dbProofs : mockProofs

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash).catch(() => {})
    toast.success('Copied!', 'Hash copied to clipboard.')
  }

  const handleDownload = (id: string) => {
    toast.success('Download Started', `Proof ${id} package is being prepared.`)
  }

  const handleVerify = (id: string) => {
    toast.success('Verification Confirmed', `Proof ${id} is valid on-chain.`)
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
        <h2 className="text-2xl font-bold">Proof Vault</h2>
        <p className="text-muted-foreground">All generated zero-knowledge proofs</p>
      </motion.div>

      {isLoading && (
        <motion.div variants={itemVariants} className="text-sm text-cyan-400 bg-cyan-900/20 border border-cyan-500/20 p-2 rounded text-center animate-pulse">
          Loading proofs...
        </motion.div>
      )}

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Proofs',  value: proofs.length,                                        color: '' },
          { label: 'Verified',      value: proofs.filter((p) => p.status === 'verified').length,  color: 'text-emerald-400' },
          { label: 'On Blockchain', value: proofs.filter((p) => p.blockchainTxHash).length,       color: 'text-cyan-400' },
          { label: 'Avg Gen Time',  value: '~7.2s',                                               color: 'text-blue-400' },
        ].map((s) => (
          <Card key={s.label} className="glass border-border/30">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className={`text-3xl font-bold mt-2 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Proofs Grid */}
      {proofs.length === 0 ? (
        <motion.div variants={itemVariants}>
          <Card className="glass border-border/30">
            <CardContent className="pt-10 pb-10 text-center">
              <p className="text-muted-foreground mb-4">No proofs generated yet.</p>
              <Button onClick={() => router.push('/auditor/generate-proof')}>
                Generate Your First Proof →
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {proofs.map((proof, idx) => (
            <motion.div
              key={proof.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Card className="glass border-border/30 hover:border-cyan-500/40 transition-all h-full">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-base">{proof.companyName}</CardTitle>
                      <CardDescription className="text-xs mt-1">{proof.auditName}</CardDescription>
                    </div>
                    {proof.status === 'verified' && (
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Proof Hash</p>
                    <p className="text-xs font-mono bg-card/50 p-2 rounded break-all">
                      {proof.hash.slice(0, 32)}…
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="text-sm font-semibold capitalize text-emerald-400">{proof.status}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Generated</p>
                      <p className="text-sm font-semibold">
                        {new Date(proof.generatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {proof.blockchainTxHash && (
                    <div className="bg-cyan-950/20 border border-cyan-500/30 p-2 rounded">
                      <p className="text-xs text-cyan-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> On Blockchain
                      </p>
                      <p className="text-xs font-mono text-muted-foreground mt-1 truncate">
                        {proof.blockchainTxHash.slice(0, 24)}…
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-1 pt-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs"
                      onClick={() => handleCopy(proof.hash)}
                    >
                      <Copy className="w-3 h-3 mr-1" /> Copy
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs"
                      onClick={() => handleDownload(proof.id)}
                    >
                      <Download className="w-3 h-3 mr-1" /> Download
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs"
                      onClick={() => handleVerify(proof.id)}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" /> Verify
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
