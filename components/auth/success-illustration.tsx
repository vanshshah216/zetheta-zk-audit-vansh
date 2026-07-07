'use client'

import { motion } from 'framer-motion'
import { Trophy, Sparkles } from 'lucide-react'

export function SuccessIllustration() {
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      {/* Confetti particles */}
      {Array.from({ length: 12 }).map((_, idx) => (
        <motion.div
          key={`confetti-${idx}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: [
              'bg-cyan',
              'bg-blue',
              'bg-emerald',
              'bg-purple',
            ][idx % 4],
            left: '50%',
            top: '50%',
          }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [1, 0],
            x: Math.cos((idx / 12) * Math.PI * 2) * 120,
            y: Math.sin((idx / 12) * Math.PI * 2) * 120 - 60,
            scale: [1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: idx * 0.05,
          }}
        />
      ))}

      {/* Center trophy */}
      <motion.div
        className="relative z-10"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Trophy className="w-20 h-20 text-yellow-400" fill="currentColor" />
      </motion.div>

      {/* Sparkles around trophy */}
      {[0, 1, 2, 3].map((idx) => (
        <motion.div
          key={`sparkle-${idx}`}
          className="absolute"
          animate={{
            rotate: 360,
            x: Math.cos((idx / 4) * Math.PI * 2) * 80,
            y: Math.sin((idx / 4) * Math.PI * 2) * 80,
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="w-4 h-4 text-cyan opacity-60" />
        </motion.div>
      ))}
    </div>
  )
}
