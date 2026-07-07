import { motion } from 'framer-motion'

interface CardSkeletonProps {
  lines?: number
  variant?: 'default' | 'chart' | 'table'
}

export function CardSkeleton({ lines = 3, variant = 'default' }: CardSkeletonProps) {
  if (variant === 'chart') {
    return (
      <div className="h-80 bg-card rounded-lg border border-border p-6 space-y-4">
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded w-32 animate-pulse" />
          <div className="h-3 bg-muted rounded w-48 animate-pulse" />
        </div>
        <div className="flex gap-2 h-48">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="flex-1 bg-muted rounded-sm animate-pulse"
              initial={{ height: '60%' }}
              animate={{ height: `${Math.random() * 40 + 40}%` }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'table') {
    return (
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="h-12 bg-muted border-b border-border" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-card border-b border-border last:border-b-0 p-4 flex gap-4">
            <div className="h-4 bg-muted rounded w-24 animate-pulse" />
            <div className="h-4 bg-muted rounded w-32 animate-pulse flex-1" />
            <div className="h-4 bg-muted rounded w-16 animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="h-64 bg-card rounded-lg border border-border p-6 space-y-4">
      <div className="space-y-3">
        <div className="h-5 bg-muted rounded w-40 animate-pulse" />
        <div className="h-3 bg-muted rounded w-24 animate-pulse" />
      </div>
      <div className="space-y-2 pt-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-3 bg-muted rounded animate-pulse" />
        ))}
      </div>
    </div>
  )
}
