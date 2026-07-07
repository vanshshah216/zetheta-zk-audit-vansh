import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  error?: boolean
  success?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, success, ...props }, ref) => (
    <div className="relative w-full">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>}
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded border border-border bg-card/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200',
          'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 focus:shadow-lg focus:shadow-accent/10',
          'hover:border-border/80 hover:bg-card/70',
          'disabled:cursor-not-allowed disabled:opacity-50',
          icon && 'pl-10',
          error && 'border-destructive focus:border-destructive focus:ring-destructive/50',
          success && 'border-emerald focus:border-emerald focus:ring-emerald/50',
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
)
Input.displayName = 'Input'

export { Input }
