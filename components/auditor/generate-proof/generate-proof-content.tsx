'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, CheckCircle, Zap, Lock, Shield, FileText, Copy, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'

type ProofStep = 'upload' | 'verify' | 'hash' | 'witness' | 'circuit' | 'generate' | 'verify-proof' | 'sign' | 'store' | 'complete'

export function GenerateProofContent() {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string>('')

  const steps: { name: ProofStep; label: string; description: string }[] = [
    { name: 'upload', label: 'Upload Documents', description: 'Select audit documents to process' },
    { name: 'verify', label: 'Verify Documents', description: 'Validate document authenticity' },
    { name: 'hash', label: 'Hash Generation', description: 'Generate document hashes' },
    { name: 'witness', label: 'Witness Generation', description: 'Create zero-knowledge witnesses' },
    { name: 'circuit', label: 'Circuit Validation', description: 'Validate proof circuit' },
    { name: 'generate', label: 'Generate ZK Proof', description: 'Generate zero-knowledge proof' },
    { name: 'verify-proof', label: 'Verify Proof', description: 'Verify proof validity' },
    { name: 'sign', label: 'Digital Signature', description: 'Apply digital signature' },
    { name: 'store', label: 'Store Proof', description: 'Store on blockchain' },
    { name: 'complete', label: 'Proof Ready', description: 'Proof generation complete' },
  ]

  const startGeneration = () => {
    setIsGenerating(true)
    setCurrentStep(0)

    // Simulate step progression
    let step = 0
    const interval = setInterval(() => {
      step += 1
      setCurrentStep(step)
      if (step >= steps.length - 1) {
        clearInterval(interval)
        setIsGenerating(false)
      }
    }, 800)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-2xl font-bold">Generate Zero Knowledge Proof</h2>
        <p className="text-muted-foreground">Create and verify cryptographic proofs for audit compliance</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Steps */}
        <Card className="glass border-border/30 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Process Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {steps.map((step, idx) => (
              <motion.div
                key={step.name}
                className={`p-3 rounded-lg border transition-all ${
                  idx <= currentStep
                    ? 'bg-blue-950/30 border-blue-500/30'
                    : 'bg-card/50 border-border/30 opacity-50'
                }`}
                animate={{
                  scale: idx === currentStep ? 1.05 : 1,
                }}
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
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{step.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Right Panel - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {!isGenerating ? (
            <>
              {/* Upload Section */}
              <motion.div variants={itemVariants}>
                <Card className="glass border-border/30">
                  <CardHeader>
                    <CardTitle>Upload Documents</CardTitle>
                    <CardDescription>Select audit documents to generate proof</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-cyan-500/50 transition-colors">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="font-medium mb-1">Drop files here or click to upload</p>
                      <p className="text-sm text-muted-foreground mb-4">PDF, DOCX, XLSX up to 50MB</p>
                      <Button>Select Files</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Generate Button */}
              <motion.div variants={itemVariants}>
                <Button
                  onClick={startGeneration}
                  className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold text-lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Start Proof Generation
                </Button>
              </motion.div>
            </>
          ) : (
            <>
              {/* Progress Visualization */}
              <motion.div variants={itemVariants}>
                <Card className="glass border-border/30">
                  <CardHeader>
                    <CardTitle>Generation in Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm font-semibold text-cyan-400">{Math.round((currentStep / steps.length) * 100)}%</span>
                      </div>
                      <div className="w-full h-3 bg-card/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-card/50 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">Generation Time</p>
                        <p className="font-semibold text-lg mt-1">{(currentStep * 0.8).toFixed(1)}s</p>
                      </div>
                      <div className="bg-card/50 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">Estimated Total</p>
                        <p className="font-semibold text-lg mt-1">~8.0s</p>
                      </div>
                    </div>

                    {/* Terminal Console Style Logs */}
                    <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-4 font-mono text-sm max-h-48 overflow-y-auto">
                      {steps.map((step, idx) => (
                        <div
                          key={step.name}
                          className={`py-1 ${
                            idx <= currentStep ? 'text-cyan-400' : 'text-muted-foreground'
                          }`}
                        >
                          {idx < currentStep ? '✓' : idx === currentStep ? '>' : ' '} [
                          {step.label}]
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}

          {/* Proof Details - Show when complete */}
          {currentStep === steps.length - 1 && !isGenerating && (
            <motion.div variants={itemVariants}>
              <Card className="glass border-emerald-500/30 bg-emerald-950/10">
                <CardHeader>
                  <CardTitle className="text-emerald-400">Proof Generated Successfully</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Proof ID</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-card/50 p-2 rounded text-xs font-mono break-all">
                          0x7f4e9e8d5c3b2a1f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a
                        </code>
                        <Button size="sm" variant="ghost">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Blockchain Transaction</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 bg-card/50 p-2 rounded text-xs font-mono break-all">
                          0xabc123def456789012345678901234567890123456789012345678901234567
                        </code>
                        <Button size="sm" variant="ghost">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Generation Time</p>
                      <p className="font-semibold">7.8 seconds</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Verification Status</p>
                      <p className="font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30">
                      <Download className="w-4 h-4 mr-2" />
                      Download Proof
                    </Button>
                    <Button className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30">
                      <FileText className="w-4 h-4 mr-2" />
                      View Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
