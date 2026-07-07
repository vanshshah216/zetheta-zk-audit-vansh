'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, RotateCcw, CheckCircle, Clock, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockVerifierAPI } from '@/lib/verifier/mock-data'
import { useMockStore } from '@/stores/mock-store'
import { useToast } from '@/hooks/use-toast'

type VerificationStep = 'idle' | 'validating-proof' | 'verifying-hash' | 'checking-blockchain' | 'validating-signature' | 'compliance-check' | 'completed' | 'failed'

const steps = [
  { id: 'validating-proof', label: 'Validate Proof', duration: 2 },
  { id: 'verifying-hash', label: 'Verify Hash', duration: 2 },
  { id: 'checking-blockchain', label: 'Check Blockchain', duration: 3 },
  { id: 'validating-signature', label: 'Validate Signature', duration: 2 },
  { id: 'compliance-check', label: 'Compliance Validation', duration: 2 },
]

export default function VerifyProofContent() {
  const toast = useToast()
  const { proofs, addVerification } = useMockStore()
  const [proofId, setProofId] = useState('')
  const [hash, setHash] = useState('')
  const [certificateId, setCertificateId] = useState('')
  const [blockchainHash, setBlockchainHash] = useState('')
  const [currentStep, setCurrentStep] = useState<VerificationStep>('idle')
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [logs, setLogs] = useState<Array<{ timestamp: string; message: string; type: 'info' | 'success' | 'error' }>>([])
  const [result, setResult] = useState<any>(null)

  const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs((prev) => [...prev, { timestamp, message, type }])
  }

  const handleVerifyProof = async () => {
    if (!proofId || !hash) {
      addLog('Error: Proof ID and Hash are required', 'error')
      toast.error('Missing Fields', 'Proof ID and Hash are required.')
      return
    }

    setCompletedSteps([])
    setResult(null)
    addLog('Starting verification process...', 'info')
    addLog(`Proof ID: ${proofId}`, 'info')

    for (const step of steps) {
      setCurrentStep(step.id as VerificationStep)
      addLog(`${step.label}...`, 'info')
      await new Promise((resolve) => setTimeout(resolve, step.duration * 1000))
      setCompletedSteps((prev) => [...prev, step.id])
      addLog(`${step.label} completed successfully`, 'success')
    }

    setCurrentStep('completed')
    addLog('Proof verification completed successfully', 'success')

    const verificationResult = await mockVerifierAPI.verifyProof(proofId, hash)
    setResult(verificationResult)

    // Persist to shared store
    addVerification({
      id: `ver-${Date.now()}`,
      proofId,
      proofHash: hash,
      action: 'Proof Verified',
      result: 'success',
      timestamp: new Date().toISOString(),
      details: 'ZK proof verified. All validation steps passed.',
      certificateId: certificateId || undefined,
      blockchainHash: blockchainHash || verificationResult?.blockchainHash || undefined,
    })

    toast.success('Proof Verified!', 'Zero-knowledge proof is valid. Entry added to history.')
  }

  const handleReset = () => {
    setProofId('')
    setHash('')
    setCertificateId('')
    setBlockchainHash('')
    setCurrentStep('idle')
    setCompletedSteps([])
    setLogs([])
    setResult(null)
  }

  const handleAutoFill = () => {
    // Use first proof from shared store if available
    const firstProof = proofs[0]
    if (firstProof) {
      setProofId(firstProof.id)
      setHash(firstProof.hash)
      setBlockchainHash(firstProof.blockchainTxHash)
      setCertificateId(`cert-${firstProof.auditId}`)
    } else {
      setProofId('proof-001')
      setHash('0x8f4c3f9a2b1e7d6c5a4b3c2d1e0f9a8b')
      setCertificateId('cert-001')
      setBlockchainHash('0xabc123def456')
    }
    setLogs([])
    setResult(null)
    toast.info('Auto-filled', 'Demo data has been populated.')
  }

  const progressPercentage = (completedSteps.length / steps.length) * 100


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Verify Zero-Knowledge Proof</h1>
        <p className="text-gray-400">Submit and verify blockchain-backed proofs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1">
          <Card className="border-cyan-500/20 sticky top-6">
            <CardHeader>
              <CardTitle className="text-white">Proof Details</CardTitle>
              <CardDescription>Enter verification parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Proof ID Input */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Proof ID</label>
                <input
                  type="text"
                  value={proofId}
                  onChange={(e) => setProofId(e.target.value)}
                  placeholder="e.g., proof-001"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* Hash Input */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Proof Hash</label>
                <input
                  type="text"
                  value={hash}
                  onChange={(e) => setHash(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none text-xs"
                />
              </div>

              {/* Certificate ID Input */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Certificate ID</label>
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="cert-001"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {/* Blockchain Hash Input */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Blockchain Hash</label>
                <input
                  type="text"
                  value={blockchainHash}
                  onChange={(e) => setBlockchainHash(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none text-xs"
                />
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-4 border-t border-gray-700">
                <button
                  onClick={handleVerifyProof}
                  disabled={currentStep !== 'idle' && currentStep !== 'completed' && currentStep !== 'failed'}
                  className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Verify Proof
                </button>
                <button
                  onClick={handleReset}
                  className="w-full py-2 px-4 rounded-lg border border-gray-700 text-gray-300 font-medium hover:border-gray-600 hover:bg-gray-900/50 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={handleAutoFill}
                  className="w-full py-2 px-4 rounded-lg border border-cyan-500/20 text-cyan-400 font-medium hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-colors text-sm"
                >
                  Auto Fill Demo
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Verification Panel */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
          {/* Progress Card */}
          {currentStep !== 'idle' && (
            <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5">
              <CardHeader>
                <CardTitle className="text-white">Verification Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Overall Progress</span>
                    <span className="text-cyan-400">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Step List */}
                <div className="space-y-2">
                  {steps.map((step) => {
                    const isCompleted = completedSteps.includes(step.id)
                    const isActive = currentStep === step.id
                    return (
                      <motion.div
                        key={step.id}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          isCompleted
                            ? 'bg-emerald-500/10 border border-emerald-500/20'
                            : isActive
                              ? 'bg-cyan-500/10 border border-cyan-500/20'
                              : 'bg-gray-900/50 border border-gray-700'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        ) : isActive ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                            <Zap className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                          </motion.div>
                        ) : (
                          <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                        <span className={`font-medium ${isCompleted || isActive ? 'text-white' : 'text-gray-400'}`}>{step.label}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Result Card */}
          {result && (
            <Card
              className={`border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-green-500/5`}
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                  Verification Successful
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Blockchain Hash:</span>
                    <span className="text-white font-mono text-xs">{result.blockchainHash}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Certificate ID:</span>
                    <span className="text-white">{result.certificateId}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Console */}
          <Card className="border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white">Verification Console</CardTitle>
              <CardDescription>Real-time verification logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs space-y-1 max-h-64 overflow-y-auto border border-gray-800">
                {logs.length === 0 ? (
                  <p className="text-gray-600">Ready to verify. Fill in the details and click "Verify Proof".</p>
                ) : (
                  logs.map((log, i) => (
                    <div
                      key={i}
                      className={`${
                        log.type === 'success' ? 'text-emerald-400' : log.type === 'error' ? 'text-red-400' : 'text-cyan-400'
                      }`}
                    >
                      <span className="text-gray-600">[{log.timestamp}]</span> {log.message}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
