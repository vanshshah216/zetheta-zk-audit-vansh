import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ds/button'
import { motion } from 'framer-motion'

interface SuccessStateProps {
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
  showAnimation?: boolean
}

export function SuccessState({
  title,
  description,
  action,
  className = '',
  showAnimation = true,
}: SuccessStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      {showAnimation ? (
        <motion.div
          className="mb-4 text-emerald-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
      ) : (
        <div className="mb-4 text-emerald-500">
          <CheckCircle2 className="w-12 h-12" />
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mb-6 max-w-sm text-center">{description}</p>}
      {action && (
        <Button onClick={action.onClick} variant="default" size="sm">
          {action.label}
        </Button>
      )}
    </div>
  )
}
