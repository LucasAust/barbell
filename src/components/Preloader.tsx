'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WORDS = ['SQUAT', 'BENCH', 'DEADLIFT', 'COMPETE', 'GBC']

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0)
  const [exit, setExit] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    let i = 0
    intervalRef.current = setInterval(() => {
      i++
      if (i < WORDS.length) {
        setIndex(i)
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setTimeout(() => {
          setExit(true)
          setTimeout(onDone, 900)
        }, 200)
      }
    }, 150)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [onDone])

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            zIndex: 'var(--z-preloader)',
            background: 'var(--black)',
            pointerEvents: 'all',
          }}
          aria-hidden="true"
        >
          {/* Garnet wipe panel */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'var(--garnet)', transformOrigin: 'bottom' }}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.9, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Word cycle */}
          <div
            className="relative overflow-hidden"
            style={{ height: 'clamp(3rem, 8vw, 7rem)' }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={WORDS[index]}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-110%', opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
                className="block t-display text-[var(--warm-white)] select-none"
                style={{
                  color: index === WORDS.length - 1 ? 'var(--garnet-bright)' : 'var(--warm-white)',
                }}
              >
                {WORDS[index]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            style={{ background: 'var(--garnet)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: (WORDS.length * 0.15) + 0.4,
              ease: 'linear',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
