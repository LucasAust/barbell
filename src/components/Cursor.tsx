'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // dot follows instantly
  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)

  // ring lags behind
  const springX = useSpring(rawX, { stiffness: 180, damping: 28 })
  const springY = useSpring(rawY, { stiffness: 180, damping: 28 })

  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      if (hidden) setHidden(false)
    }

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setHovered(
        !!(
          target.closest('a') ||
          target.closest('button') ||
          target.closest('[data-cursor="hover"]')
        )
      )
    }

    const leave = () => setHidden(true)
    const enter = () => setHidden(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [hidden, rawX, rawY, dotX, dotY])

  return (
    <>
      {/* Ring */}
      <motion.div
        ref={cursorRef}
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 'var(--z-cursor)' as string,
          pointerEvents: 'none',
        }}
        animate={{
          width: hovered ? 52 : 32,
          height: hovered ? 52 : 32,
          opacity: hidden ? 0 : 1,
          borderColor: hovered ? 'var(--garnet-bright)' : 'var(--warm-white)',
          backgroundColor: hovered ? 'rgba(115,0,10,0.15)' : 'transparent',
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-full border border-[var(--warm-white)] mix-blend-difference"
      />

      {/* Dot */}
      <motion.div
        ref={dotRef}
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 'var(--z-cursor)' as string,
          pointerEvents: 'none',
        }}
        animate={{
          width: hovered ? 0 : 5,
          height: hovered ? 0 : 5,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="rounded-full bg-[var(--garnet)]"
      />
    </>
  )
}
