'use client'

import { motion } from 'framer-motion'

export function BlockchainVisualization() {
  const nodes = Array.from({ length: 5 }, (_, i) => i)
  const connections = [[0, 1], [1, 2], [2, 3], [3, 4]]

  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250">
        {/* Animated connection lines */}
        {connections.map((connection, idx) => (
          <motion.line
            key={`line-${idx}`}
            x1={connection[0] * 80 + 40}
            y1="125"
            x2={connection[1] * 80 + 40}
            y2="125"
            stroke="#00E5FF"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: idx * 0.2, repeat: Infinity }}
            opacity="0.6"
          />
        ))}
      </svg>

      {/* Animated nodes */}
      <div className="absolute inset-0 flex items-center justify-center">
        {nodes.map((idx) => (
          <motion.div
            key={`node-${idx}`}
            className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-cyan to-blue border border-cyan shadow-lg"
            style={{ left: `${20 + idx * 15}%` }}
            animate={{
              boxShadow: [
                '0 0 10px rgba(0, 229, 255, 0.5)',
                '0 0 20px rgba(0, 229, 255, 0.8)',
                '0 0 10px rgba(0, 229, 255, 0.5)',
              ],
            }}
            transition={{ duration: 2, delay: idx * 0.15, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  )
}
