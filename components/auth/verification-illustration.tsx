'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export function VerificationIllustration() {
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      {/* Background circles */}
      <motion.div
        className="absolute w-32 h-32 rounded-full border-2 border-cyan/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full border border-blue/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Center icon with pulse */}
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <CheckCircle2 className="w-24 h-24 text-emerald glow-emerald" />
      </motion.div>

      {/* Orbiting elements */}
      {[0, 1, 2].map((idx) => (
        <motion.div
          key={`orbit-${idx}`}
          className="absolute w-64 h-64"
          animate={{ rotate: 360 }}
          transition={{ duration: 8 + idx * 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-cyan -ml-1" />
        </motion.div>
      ))}
    </div>
  )
}
