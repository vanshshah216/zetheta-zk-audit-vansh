import { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  suffix?: string
  icon?: ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

export function StatCard({
  label,
  value,
  suffix,
  icon,
  trend,
  trendValue,
}: StatCardProps) {
  const trendColor = {
    up: 'text-emerald-500',
    down: 'text-red-500',
    neutral: 'text-blue-500',
  }

  return (
    <div className="p-6 bg-card rounded-lg border border-border">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-foreground">
              {value}
              {suffix && <span className="text-base ml-1">{suffix}</span>}
            </h3>
            {trendValue && trend && (
              <span className={`text-xs font-semibold ${trendColor[trend]}`}>
                {trendValue}
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-muted rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
