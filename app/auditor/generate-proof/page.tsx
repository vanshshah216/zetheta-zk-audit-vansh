'use client'

import { motion } from 'framer-motion'
import { GenerateProofContent } from '@/components/auditor/generate-proof/generate-proof-content'

export default function GenerateProofPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <GenerateProofContent />
    </motion.div>
  )
}
