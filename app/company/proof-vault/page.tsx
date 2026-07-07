'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Copy, CheckCircle, ExternalLink, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { useMockStore, MockProof } from '@/stores/mock-store'
import { supabaseAuditService } from '@/services/supabase-audit-service'
import { useToast } from '@/hooks/use-toast'

export default function ProofVaultPage() {
  const { proofs: mockProofs } = useMockStore()
  const toast = useToast()
  const [searchQuery, setSearchQuery] = useState('')

  const [isLoading, setIsLoading] = useState(true)
  const [dbProofs, setDbProofs] = useState<MockProof[]>([])

  useEffect(() => {
    const fetchProofs = async () => {
      setIsLoading(true)
      try {
        // Fetch all proofs for now for the demo
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

  const filteredProofs = proofs.filter(
    (proof) =>
      proof.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proof.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proof.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash).catch(() => {})
    toast.success('Copied!', 'Hash copied to clipboard.')
  }

  const handleDownload = (id: string) => {
    toast.success('Download Started', `Proof ${id} package is being prepared.`)
  }

  const handleViewOnChain = (txHash: string) => {
    toast.info('Opening Explorer', `Transaction ${txHash.slice(0, 16)}… opened in block explorer.`)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Proof Vault</h1>
        <p className="text-muted-foreground">Manage and download your zero-knowledge audit proofs</p>
      </div>

      {isLoading && (
        <div className="text-sm text-cyan-400 bg-cyan-900/20 border border-cyan-500/20 p-2 rounded text-center animate-pulse">
          Loading proofs...
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Proofs',  value: proofs.length },
          { label: 'Verified',      value: proofs.filter((p) => p.status === 'verified').length },
          { label: 'On Blockchain', value: proofs.filter((p) => p.blockchainTxHash).length },
          { label: 'Avg Gen Time',  value: '~7.2s' },
        ].map((s) => (
          <Card key={s.label} variant="glass">
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold mt-1">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by proof ID, hash, or company…"
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Proofs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProofs.map((proof) => (
          <motion.div key={proof.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card variant="glass" className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{proof.companyName}</CardTitle>
                    <CardDescription>{proof.auditName}</CardDescription>
                  </div>
                  {proof.status === 'verified' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                {/* Hash */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Proof Hash</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-card px-2 py-1 rounded flex-1 truncate">
                      {proof.hash}
                    </code>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(proof.hash)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Blockchain tx */}
                {proof.blockchainTxHash && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Blockchain TX</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-card px-2 py-1 rounded flex-1 truncate">
                        {proof.blockchainTxHash}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewOnChain(proof.blockchainTxHash)}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <span className="px-3 py-1 text-xs rounded-full font-medium bg-emerald-500/20 text-emerald-400">
                    {proof.status}
                  </span>
                </div>

                <Button
                  className="w-full"
                  variant="cyan"
                  size="sm"
                  onClick={() => handleDownload(proof.id)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Proof
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProofs.length === 0 && (
        <Card variant="glass">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {searchQuery ? 'No proofs match your search.' : 'No proofs available yet.'}
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
