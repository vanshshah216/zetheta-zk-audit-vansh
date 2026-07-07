import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200', {
  variants: {
    variant: {
      default: 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15',
      cyan: 'bg-cyan/10 text-cyan border border-cyan/30 hover:bg-cyan/15 glow-cyan',
      blue: 'bg-blue/10 text-blue border border-blue/30 hover:bg-blue/15 glow-blue',
      emerald:
        'bg-emerald/10 text-emerald border border-emerald/30 hover:bg-emerald/15 glow-emerald',
      purple:
        'bg-purple/10 text-purple border border-purple/30 hover:bg-purple/15 glow-purple',
      destructive:
        'bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/15',
      success: 'bg-emerald/20 text-emerald border border-emerald/50 hover:bg-emerald/30',
      warning: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 hover:bg-yellow-500/30',
      outline: 'border border-border bg-transparent text-foreground hover:bg-card/50',
      glass: 'glass text-foreground hover:bg-card/60 hover:border-accent/50',
    },
    size: {
      sm: 'text-xs px-2 py-0.5',
      default: 'text-xs px-3 py-1',
      lg: 'text-sm px-4 py-1.5',
    },
    animated: {
      true: 'animate-glow-pulse',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    animated: false,
  },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
}

function Badge({ className, variant, size, animated, icon, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, animated, className }))} {...props}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {props.children}
    </div>
  )
}
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
