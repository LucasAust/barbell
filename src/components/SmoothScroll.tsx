'use client'

import { useEffect, useState } from 'react'
import { ReactLenis } from 'lenis/react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')

    const update = () => {
      setIsMobile(mediaQuery.matches)
      setMounted(true)
    }

    update()
    mediaQuery.addEventListener('change', update)

    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  if (!mounted || isMobile) {
    return <>{children}</>
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.3, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
