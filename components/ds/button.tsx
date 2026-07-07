import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/40 active:scale-95 glow-blue',
        cyan: 'bg-cyan text-background hover:bg-cyan/90 hover:shadow-lg hover:shadow-cyan-500/40 active:scale-95 glow-cyan',
        emerald:
          'bg-emerald text-background hover:bg-emerald/90 hover:shadow-lg hover:shadow-emerald-500/40 active:scale-95 glow-emerald',
        purple:
          'bg-purple text-white hover:bg-purple/90 hover:shadow-lg hover:shadow-purple-500/40 active:scale-95 glow-purple',
        outline:
          'border border-border bg-background text-foreground hover:bg-card/50 hover:border-accent/50 hover:shadow-md hover:shadow-accent/20 active:scale-95',
        ghost:
          'text-foreground hover:bg-card/50 hover:text-accent transition-colors active:scale-95',
        glass: 'glass text-foreground hover:bg-card/60 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20 active:scale-95',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-95',
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm',
        sm: 'h-8 rounded px-3 text-xs',
        lg: 'h-12 rounded px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
