'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, ReactNode } from 'react'

/* ── FadeUp — simple scroll-triggered fade + translate ─────────────── */
interface FadeUpProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  className?: string
  once?: boolean
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.75,
  y = 40,
  className,
  once = true,
}: FadeUpProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Stagger container / item ────────────────────────────────────────── */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

interface StaggerProps {
  children: ReactNode
  className?: string
  once?: boolean
}

export function Stagger({ children, className, once = true }: StaggerProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = motion.div

/* Aliases for backward compat */
export { FadeUp as FadeIn }
export function StaggerContainer(props: StaggerProps) { return <Stagger {...props} /> }

