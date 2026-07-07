'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export const useScrollTransparency = (threshold: number = 50) => {
  const [isTransparent, setIsTransparent] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY < threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isTransparent
}

export const useInView = (ref: React.RefObject<HTMLElement>, options = {}) => {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.1, ...options })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, options])

  return inView
}

export const useCountUp = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLElement | null>(null)
  const inView = useInView(ref as React.RefObject<HTMLElement>)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!inView || hasStarted.current) return

    hasStarted.current = true
    const start = 0
    const increment = target / (duration / 16)
    let current = start

    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(interval)
  }, [inView, target, duration])

  return { count, ref }
}

export const useToggle = (initialState: boolean = false) => {
  const [state, setState] = useState(initialState)
  const toggle = useCallback(() => setState((prev) => !prev), [])
  return [state, toggle] as const
}
