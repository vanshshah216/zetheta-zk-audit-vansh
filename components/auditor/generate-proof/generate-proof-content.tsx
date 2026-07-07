'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Upload, CheckCircle, Zap, Copy, Download, FileText } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { useMockStore, MockProof } from '@/stores/mock-store'
import { useToast } from '@/hooks/use-toast'

const STEPS = [
  { label: 'Uploading Documents',  log: 'Hashing document bytes with SHA-256…' },
  { label: 'Hash Generation',       log: 'Generating Merkle root from document tree…' },
  { label: 'Witness Generation',    log: 'Building zk-SNARK witness from inputs…' },
  { label: 'Circuit Validation',    log: 'Validating Groth16 circuit constraints…' },
  { label: 'Generate ZK Proof',     log: 'Running Bellman prover — this may take a moment…' },
  { label: 'Verify Proof',          log: 'Running on-chain verification call…' },
  { label: 'Store Proof',           log: 'Storing proof hash on Ethereum mainnet…' },
  { label: 'Complete',              log: 'Proof generation complete. Transaction confirmed.' },
]

function generateHash() {
  const hex = Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('')
  return `0x${hex}`
}

export function GenerateProofContent() {
  const router = useRouter()
  const toast = useToast()
  const { getAssignedAudits, addProof } = useMockStore()

  const assignedAudits = getAssignedAudits()
  const [selectedAuditId, setSelectedAuditId] = useState(assignedAudits[0]?.id ?? '')
  const [currentStep, setCurrentStep] = useState(-1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [proofHash, setProofHash] = useState('')
  const [txHash, setTxHash] = useState('')
  const [completed, setCompleted] = useState(false)
  const [savedProofId, setSavedProofId] = useState('')

  const selectedAudit = assignedAudits.find((a) => a.id === selectedAuditId)

  const appendLog = (msg: string) =>
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`])

  const startGeneration = async () => {
    if (!selectedAuditId) {
      toast.error('No Audit Selected', 'Please select an assigned audit first.')
      return
    }
    setIsGenerating(true)
    setCompleted(false)
    setLogs([])
    setCurrentStep(0)

    const ph = generateHash()
    const tx = generateHash()

    for (let i = 0; i < STEPS.length; i++) {
      setCurrentStep(i)
      appendLog(STEPS[i].log)
      await new Promise((r) => setTimeout(r, 900))
    }

    setProofHash(ph)
    setTxHash(tx)

    // Save to shared store
    const newProof: MockProof = {
      id: `proof-${Date.now()}`,
      auditId: selectedAuditId,
      auditName: selectedAudit?.auditType ?? 'Compliance Audit',
      companyName: selectedAudit?.companyName ?? 'Unknown',
      status: 'verified',
      hash: ph,
      blockchainTxHash: tx,
      generatedAt: new Date().toISOString(),
      verificationStatus: 'verified',
    }
    addProof(newProof)
    setSavedProofId(newProof.id)

    setIsGenerating(false)
    setCompleted(true)
    toast.success('Proof Generated!', 'Zero-knowledge proof has been stored in your Proof Vault.')
  }

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).catch(() => {})
    toast.success('Copied!', `${label} copied to clipboard.`)
  }

  const handleDownload = () => {
    toast.success('Download Started', 'Proof package download initiated.')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-6"
    >
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Generate Zero Knowledge Proof</h2>
        <p className="text-muted-foreground">
          Create cryptographic proofs for accepted audit assignments
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Step list */}
        <Card className="glass border-border/30 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Process Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {STEPS.map((step, idx) => (
              <div
                key={step.label}
                className={`p-3 rounded-lg border transition-all ${
                  idx < currentStep
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : idx === currentStep
                    ? 'bg-blue-950/30 border-blue-500/40 scale-[1.02]'
                    : 'bg-card/50 border-border/30 opacity-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {idx < currentStep ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : idx === currentStep ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                      <Zap className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    </motion.div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-border/30 flex-shrink-0" />
                  )}
                  <p className="text-sm font-medium">{step.label}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right — Main panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Audit selector */}
          {!completed && (
            <Card className="glass border-border/30">
              <CardHeader>
                <CardTitle>Select Assigned Audit</CardTitle>
                <CardDescription>Choose the audit to generate a ZK proof for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignedAudits.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-3">No accepted audits yet.</p>
                    <Button
                      variant="ghost"
                      onClick={() => router.push('/auditor/incoming-requests')}
                    >
                      Accept an Incoming Request →
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {assignedAudits.map((audit) => (
                      <div
                        key={audit.id}
                        onClick={() => setSelectedAuditId(audit.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedAuditId === audit.id
                            ? 'border-cyan-500/50 bg-cyan-950/20'
                            : 'border-border/30 hover:border-border/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{audit.companyName}</p>
                            <p className="text-sm text-muted-foreground">{audit.auditType}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-emerald-400">
                              ${audit.budget.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">{audit.complianceStandard}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Progress card (during generation) */}
          {isGenerating && (
            <Card className="glass border-border/30">
              <CardHeader>
                <CardTitle>Generation in Progress…</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-semibold text-cyan-400">
                      {Math.round(((currentStep + 1) / STEPS.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-card/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
                {/* Terminal */}
                <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-4 font-mono text-xs max-h-48 overflow-y-auto space-y-1">
                  {logs.map((l, i) => (
                    <div key={i} className="text-cyan-400">
                      <span className="text-muted-foreground">❯ </span>{l}
                    </div>
                  ))}
                  {isGenerating && (
                    <motion.div
                      className="text-cyan-400"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      _
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Start button */}
          {!isGenerating && !completed && (
            <Button
              onClick={startGeneration}
              disabled={assignedAudits.length === 0}
              className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold text-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Proof Generation
            </Button>
          )}

          {/* Proof result card */}
          {completed && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="glass border-emerald-500/30 bg-emerald-950/10">
                <CardHeader>
                  <CardTitle className="text-emerald-400 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Proof Generated Successfully
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Hash fields */}
                  {[
                    { label: 'Proof Hash', value: proofHash },
                    { label: 'Blockchain Transaction', value: txHash },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs text-muted-foreground mb-1">{label}</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-card/50 p-2 rounded text-xs font-mono break-all">
                          {value}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopy(value, label)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Meta */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Generation Time</p>
                      <p className="font-semibold mt-1">~7.2 seconds</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Verification Status</p>
                      <p className="font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Verified
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30"
                      onClick={handleDownload}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Proof
                    </Button>
                    <Button
                      className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
                      onClick={() => router.push('/auditor/proofs')}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View in Vault
                    </Button>
                  </div>

                  {/* Generate another */}
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setCompleted(false)
                      setCurrentStep(-1)
                      setLogs([])
                      setProofHash('')
                      setTxHash('')
                    }}
                  >
                    Generate Another Proof
                  </Button>
                </CardContent>
              </Card>

              {/* Terminal log of completed run */}
              <Card className="glass border-border/30 mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Generation Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black/60 border border-cyan-500/20 rounded-lg p-4 font-mono text-xs max-h-40 overflow-y-auto space-y-1">
                    {logs.map((l, i) => (
                      <div key={i} className="text-emerald-400">
                        <span className="text-muted-foreground">✓ </span>{l}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
