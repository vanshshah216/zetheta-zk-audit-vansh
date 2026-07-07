import { Suspense } from 'react'
import { DashboardContent } from '@/components/company/dashboard/dashboard-content'
import { CardSkeleton } from '@/components/skeletons/card-skeleton'

export const metadata = {
  title: 'Dashboard - AuditChain',
  description: 'Company dashboard for audit management',
}

function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 bg-muted rounded w-64 animate-pulse" />
        <div className="h-4 bg-muted rounded w-96 animate-pulse" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardSkeleton variant="chart" />
        <CardSkeleton variant="chart" />
      </div>

      {/* Recent Audits Table */}
      <CardSkeleton variant="table" />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  )
}
