import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ds/button'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We encountered an error while loading this page. Please try again.',
  onRetry,
  className = '',
}: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="mb-4 text-destructive">
        <AlertTriangle className="w-12 h-12" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm text-center">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="default" size="sm">
          Try Again
        </Button>
      )}
    </div>
  )
}
