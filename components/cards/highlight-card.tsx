import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'

interface HighlightCardProps {
  icon?: ReactNode
  title: string
  description?: string
  value?: string | number
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
  color?: 'cyan' | 'blue' | 'emerald' | 'purple' | 'orange'
  children?: ReactNode
  animated?: boolean
}

const colorMap = {
  cyan: {
    bg: 'bg-cyan/5 border-cyan/20 hover:border-cyan/30',
    text: 'text-cyan',
    icon: 'text-cyan/80',
  },
  blue: {
    bg: 'bg-blue/5 border-blue/20 hover:border-blue/30',
    text: 'text-blue',
    icon: 'text-blue/80',
  },
  emerald: {
    bg: 'bg-emerald/5 border-emerald/20 hover:border-emerald/30',
    text: 'text-emerald',
    icon: 'text-emerald/80',
  },
  purple: {
    bg: 'bg-purple/5 border-purple/20 hover:border-purple/30',
    text: 'text-purple',
    icon: 'text-purple/80',
  },
  orange: {
    bg: 'bg-orange/5 border-orange/20 hover:border-orange/30',
    text: 'text-orange',
    icon: 'text-orange/80',
  },
}

export function HighlightCard({
  icon,
  title,
  description,
  value,
  trend,
  color = 'cyan',
  children,
  animated = true,
}: HighlightCardProps) {
  const colors = colorMap[color]

  const cardComponent = (
    <Card className={`${colors.bg} transition-all duration-300 hover:shadow-lg`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className={`${colors.text}`}>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {icon && <div className={`${colors.icon}`}>{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        {value !== undefined && (
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            {trend && (
              <span
                className={`text-sm ${
                  trend.direction === 'up' ? 'text-emerald-500' : 'text-red-500'
                }`}
              >
                {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  )

  if (!animated) {
    return cardComponent
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      {cardComponent}
    </motion.div>
  )
}
