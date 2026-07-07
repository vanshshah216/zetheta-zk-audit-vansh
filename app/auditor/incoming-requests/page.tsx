'use client'

import { motion } from 'framer-motion'
import { IncomingRequestsContent } from '@/components/auditor/incoming-requests/incoming-requests-content'

export default function IncomingRequestsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <IncomingRequestsContent />
    </motion.div>
  )
}
