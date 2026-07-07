'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Copy, CheckCircle, ExternalLink, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI } from '@/lib/company/mock-data'
import { Proof } from '@/types/company'

export default function ProofVaultPage() {
  const [proofs, setProofs] = useState<Proof[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loadProofs = async () => {
      const data = await mockAPI.getProofs()
      setProofs(data)
    }
    loadProofs()
  }, [])

  const filteredProofs = proofs.filter(
    (proof) =>
      proof.id.includes(searchQuery) ||
      proof.hash.includes(searchQuery)
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">Proof Vault</h1>
        <p className="text-muted-foreground">Manage and download your audit proofs</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by ID or hash..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Proofs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProofs.map((proof) => (
          <motion.div
            key={proof.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card variant="glass" className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{proof.id}</CardTitle>
                    <CardDescription>
                      {new Date(proof.timestamp).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  {proof.blockchainStatus === 'confirmed' && (
                    <CheckCircle className="w-5 h-5 text-emerald" />
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Hash</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-card px-2 py-1 rounded flex-1 truncate">
                      {proof.hash}
                    </code>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {proof.blockchainTxHash && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Blockchain TX</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-card px-2 py-1 rounded flex-1 truncate">
                        {proof.blockchainTxHash}
                      </code>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    proof.blockchainStatus === 'confirmed'
                      ? 'bg-emerald/20 text-emerald'
                      : 'bg-orange/20 text-orange'
                  }`}>
                    {proof.blockchainStatus}
                  </span>
                </div>

                <Button className="w-full" variant="cyan" size="sm">
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
            <p className="text-muted-foreground">No proofs found</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
