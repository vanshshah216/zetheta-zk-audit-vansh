'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { DashboardContent } from '@/components/auditor/dashboard/dashboard-content'
import { CardSkeleton } from '@/components/skeletons/card-skeleton'

function AuditorDashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <div className="h-8 bg-muted rounded w-64 animate-pulse" />
        <div className="h-4 bg-muted rounded w-96 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardSkeleton variant="chart" />
        <CardSkeleton variant="chart" />
      </div>
    </div>
  )
}

export default function AuditorDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Suspense fallback={<AuditorDashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </motion.div>
  )
}
