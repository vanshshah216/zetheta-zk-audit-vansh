import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

const ProgressVariants = {
  default: 'bg-primary',
  cyan: 'bg-cyan glow-cyan',
  blue: 'bg-blue glow-blue',
  emerald: 'bg-emerald glow-emerald',
  purple: 'bg-purple glow-purple',
  gradient: 'bg-gradient-to-r from-cyan via-blue to-purple',
}

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: keyof typeof ProgressVariants
  showLabel?: boolean
  animated?: boolean
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant = 'default', showLabel, animated, ...props }, ref) => (
  <div className="w-full">
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-card/50 border border-border/50',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full w-full flex-1 transition-all duration-300 rounded-full',
          ProgressVariants[variant],
          animated && 'animate-shimmer'
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
    {showLabel && <div className="mt-1 text-xs text-muted-foreground">{value || 0}%</div>}
  </div>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress, ProgressVariants }
export type { ProgressProps }
