'use client'

import { motion } from 'framer-motion'
import { AssignedAuditsContent } from '@/components/auditor/assigned-audits/assigned-audits-content'

export default function AssignedAuditsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <AssignedAuditsContent />
    </motion.div>
  )
}
