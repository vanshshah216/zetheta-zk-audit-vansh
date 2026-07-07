import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  showText?: boolean
  text?: string
}

const sizeMap = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
}

export function LoadingSpinner({
  size = 'md',
  color = 'currentColor',
  showText = false,
  text = 'Loading...',
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <motion.div
        className={`${sizeMap[size]} rounded-full border-2 border-current border-t-transparent`}
        style={{ color }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      {showText && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  )
}
