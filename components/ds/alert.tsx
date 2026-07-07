import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 text-sm transition-all duration-200 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'border-border bg-card/50 text-foreground',
        destructive: 'border-destructive/50 bg-destructive/10 text-destructive hover:bg-destructive/15',
        warning:
          'border-yellow-500/50 bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/15',
        success:
          'border-emerald/50 bg-emerald/10 text-emerald hover:bg-emerald/15',
        info: 'border-cyan/50 bg-cyan/10 text-cyan hover:bg-cyan/15 glow-cyan',
        glass: 'glass border-accent/30 text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  )
)
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('mb-1 font-medium leading-tight tracking-tight', className)} {...props} />
  )
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
  )
)
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription, alertVariants }
