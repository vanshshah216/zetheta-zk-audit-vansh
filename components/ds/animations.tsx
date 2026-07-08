'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { cn } from '@/lib/utils'

export interface FloatingParticlesProps {
  className?: string
  particleCount?: number
  color?: string
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  className,
  particleCount = 20,
  color = '#00E5FF',
}) => {
  const [particles, setParticles] = React.useState<Array<{ left: string; top: string; duration: number; delay: number }>>([])

  React.useEffect(() => {
    setParticles(
      Array.from({ length: particleCount }, (_, i) => ({
        left: `${(i % 10) * 10}%`,
        top: `${(i % 10) * 10}%`,
        duration: 3 + (i % 3),
        delay: (i % 4) * 0.25,
      }))
    )

    const timeout = window.setTimeout(() => {
      setParticles(
        Array.from({ length: particleCount }, () => ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          duration: 3 + Math.random() * 2,
          delay: Math.random() * 2,
        }))
      )
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [particleCount])

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: color,
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

export interface AnimatedGradientProps {
  className?: string
  children?: React.ReactNode
}

export const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  className,
  children,
}) => {
  return (
    <motion.div
      className={cn(
        'bg-gradient-to-r from-cyan via-blue to-purple bg-[length:200%_200%]',
        className
      )}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
      }}
    >
      {children}
    </motion.div>
  )
}

export interface GlowBoxProps {
  className?: string
  glowColor?: 'cyan' | 'blue' | 'emerald' | 'purple'
  children?: React.ReactNode
}

const glowColors = {
  cyan: 'shadow-[0_0_40px_rgba(0,229,255,0.2)] hover:shadow-[0_0_60px_rgba(0,229,255,0.4)]',
  blue: 'shadow-[0_0_40px_rgba(37,99,235,0.2)] hover:shadow-[0_0_60px_rgba(37,99,235,0.4)]',
  emerald:
    'shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:shadow-[0_0_60px_rgba(16,185,129,0.4)]',
  purple:
    'shadow-[0_0_40px_rgba(124,58,237,0.2)] hover:shadow-[0_0_60px_rgba(124,58,237,0.4)]',
}

export const GlowBox: React.FC<GlowBoxProps> = ({
  className,
  glowColor = 'cyan',
  children,
}) => {
  return (
    <motion.div
      className={cn('rounded-lg p-6 transition-all duration-300', glowColors[glowColor], className)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.div>
  )
}

export interface ScanLineProps {
  className?: string
  height?: string
}

export const ScanLine: React.FC<ScanLineProps> = ({
  className,
  height = 'h-1',
}) => {
  return (
    <motion.div
      className={cn(
        'absolute left-0 right-0 bg-gradient-to-b from-cyan/50 via-cyan/30 to-transparent',
        height,
        className
      )}
      animate={{
        top: ['-100%', '100%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

export interface PulseRingProps {
  className?: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
}

export const PulseRing: React.FC<PulseRingProps> = ({
  className,
  color = '#00E5FF',
  size = 'md',
}) => {
  return (
    <motion.div
      className={cn('rounded-full border-2', sizeMap[size], className)}
      style={{
        borderColor: color,
      }}
      animate={{
        scale: [1, 1.5],
        opacity: [1, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
  )
}

export interface TypewriterProps {
  text: string
  className?: string
}

export const Typewriter: React.FC<TypewriterProps> = ({ text, className }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}

export interface FadeInProps {
  className?: string
  children?: React.ReactNode
  delay?: number
}

export const FadeIn: React.FC<FadeInProps> = ({
  className,
  children,
  delay = 0,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

export interface StaggerContainerProps {
  className?: string
  children?: React.ReactNode
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  className,
  children,
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export interface StaggerItemProps {
  className?: string
  children?: React.ReactNode
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  className,
  children,
}) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
