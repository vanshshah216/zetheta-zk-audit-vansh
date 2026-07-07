'use client'

import { motion } from 'framer-motion'
import { Download, Copy, ExternalLink, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockProofs } from '@/lib/auditor/mock-data'

export default function ProofsPage() {
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
        <h2 className="text-2xl font-bold">Proof Vault</h2>
        <p className="text-muted-foreground">Manage and track all generated zero-knowledge proofs</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Proofs</p>
            <p className="text-3xl font-bold mt-2">{mockProofs.length}</p>
          </CardContent>
        </Card>
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Verified</p>
            <p className="text-3xl font-bold text-emerald-400 mt-2">{mockProofs.filter(p => p.status === 'verified').length}</p>
          </CardContent>
        </Card>
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">On Blockchain</p>
            <p className="text-3xl font-bold text-cyan-400 mt-2">{mockProofs.filter(p => p.blockchainTxHash).length}</p>
          </CardContent>
        </Card>
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Avg Gen Time</p>
            <p className="text-3xl font-bold text-blue-400 mt-2">4.2s</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Proofs Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockProofs.map((proof, idx) => (
          <motion.div
            key={proof.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="glass border-border/30 hover:border-cyan-500/50 transition-all h-full">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-base">Proof {idx + 1}</CardTitle>
                    <CardDescription className="text-xs mt-1">{proof.id.slice(0, 12)}...</CardDescription>
                  </div>
                  {proof.status === 'verified' && <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Hash</p>
                  <p className="text-xs font-mono bg-card/50 p-2 rounded break-all">{proof.hash.slice(0, 32)}...</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="text-sm font-semibold capitalize text-emerald-400">{proof.status}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Generated</p>
                    <p className="text-sm font-semibold">{proof.generatedAt.toLocaleDateString()}</p>
                  </div>
                </div>
                {proof.blockchainTxHash && (
                  <div className="bg-cyan-950/20 border border-cyan-500/30 p-2 rounded">
                    <p className="text-xs text-cyan-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      On Blockchain
                    </p>
                    <p className="text-xs font-mono text-muted-foreground mt-1 truncate">{proof.blockchainTxHash.slice(0, 24)}...</p>
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="ghost" className="flex-1">
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                  <Button size="sm" variant="ghost" className="flex-1">
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
