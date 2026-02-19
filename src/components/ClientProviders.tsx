'use client'

import { useState, useEffect } from 'react'
import SmoothScroll from './SmoothScroll'
import Preloader from './Preloader'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false)

  // Skip preloader on Sanity Studio route
  const [isStudio, setIsStudio] = useState(false)
  useEffect(() => {
    setIsStudio(window.location.pathname.startsWith('/studio'))
  }, [])

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      <SmoothScroll />

      {/* Preloader sits on top; children go behind until done */}
      {!done && <Preloader onDone={() => setDone(true)} />}

      <div
        style={{
          opacity: done ? 1 : 0,
          pointerEvents: done ? 'auto' : 'none',
          transition: 'opacity 0.5s ease',
        }}
      >
        {children}
      </div>
    </>
  )
}
