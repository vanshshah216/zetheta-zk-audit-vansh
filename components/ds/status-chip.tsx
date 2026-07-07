import * as React from 'react'
import { cn } from '@/lib/utils'

const StatusVariants = {
  active: {
    dot: 'bg-emerald-500',
    label: 'text-emerald-300',
    bg: 'bg-emerald-500/10 border-emerald-500/30',
  },
  inactive: {
    dot: 'bg-muted',
    label: 'text-muted-foreground',
    bg: 'bg-muted/10 border-muted/30',
  },
  pending: {
    dot: 'bg-yellow-500 animate-pulse',
    label: 'text-yellow-300',
    bg: 'bg-yellow-500/10 border-yellow-500/30',
  },
  error: {
    dot: 'bg-destructive',
    label: 'text-destructive',
    bg: 'bg-destructive/10 border-destructive/30',
  },
  processing: {
    dot: 'bg-cyan animate-pulse glow-cyan',
    label: 'text-cyan',
    bg: 'bg-cyan/10 border-cyan/30',
  },
  warning: {
    dot: 'bg-purple',
    label: 'text-purple',
    bg: 'bg-purple/10 border-purple/30',
  },
}

export interface StatusChipProps extends React.HTMLAttributes<HTMLDivElement> {
  status: keyof typeof StatusVariants
  label: string
  icon?: React.ReactNode
}

const StatusChip = React.forwardRef<HTMLDivElement, StatusChipProps>(
  ({ className, status, label, icon, ...props }, ref) => {
    const variant = StatusVariants[status]

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200',
          variant.bg,
          variant.label,
          className
        )}
        {...props}
      >
        <div className={cn('flex items-center gap-1.5')}>
          {icon ? (
            icon
          ) : (
            <div className={cn('w-2 h-2 rounded-full', variant.dot)} />
          )}
          <span>{label}</span>
        </div>
      </div>
    )
  }
)
StatusChip.displayName = 'StatusChip'

export { StatusChip, StatusVariants }
