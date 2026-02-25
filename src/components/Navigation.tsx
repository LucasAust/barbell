'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Magnetic from './Magnetic'

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'News', href: '#news' },
  { label: 'Officers', href: '#officers' },
  { label: 'Join', href: '#join' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [viewportTop, setViewportTop] = useState(0)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return

    let frameId = 0

    const updateViewportTop = () => {
      const isMobile = window.innerWidth < 768
      if (!isMobile) {
        setViewportTop(0)
        return
      }

      const nextTop = Math.max(0, vv.offsetTop || 0, vv.pageTop - window.scrollY)
      setViewportTop((prev) => (prev === nextTop ? prev : nextTop))
    }

    const tick = () => {
      updateViewportTop()
      frameId = window.requestAnimationFrame(tick)
    }

    updateViewportTop()
    vv.addEventListener('resize', updateViewportTop)
    vv.addEventListener('scroll', updateViewportTop)
    window.addEventListener('resize', updateViewportTop)
    frameId = window.requestAnimationFrame(tick)

    return () => {
      vv.removeEventListener('resize', updateViewportTop)
      vv.removeEventListener('scroll', updateViewportTop)
      window.removeEventListener('resize', updateViewportTop)
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  useEffect(() => {
    if (!mobileOpen) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [mobileOpen])

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-[500]"
        style={{ transform: `translate3d(0, ${viewportTop}px, 0)`, willChange: 'transform' }}
      >
        <div
          className="md:hidden absolute left-0 right-0 bottom-full h-[100svh] pointer-events-none"
          style={{ backgroundColor: '#080808' }}
          aria-hidden="true"
        />

        {/* ── Main header bar ── */}
        <motion.header
          role="banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className={`relative z-10 transition-all duration-500 ${
            scrolled
              ? 'bg-[#080808] border-b border-[var(--rule)]'
              : 'bg-[#080808] md:bg-[linear-gradient(to_bottom,rgba(8,8,8,0.7),transparent)] md:border-none'
          }`}
        >
          <div className="wrap flex items-center justify-between h-[72px] lg:h-[84px]">
          {/* Logo */}
          <Magnetic intensity={0.3}>
            <Link
              href="#hero"
              className="flex items-center gap-2 focus-visible:outline-none group"
              aria-label="Gamecock Barbell Club — home"
              data-cursor="hover"
              onClick={() => setMobileOpen(false)}
            >
              <span
                className="font-[family-name:var(--f-display)] text-[var(--warm-white)] leading-none"
                style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', letterSpacing: '0.03em', fontWeight: 700 }}
              >
                GBC
              </span>
              <span className="hidden sm:block h-4 w-px bg-[var(--rule)] mx-1" aria-hidden="true" />
              <span
                className="hidden sm:block text-[rgba(237,232,223,0.82)] font-[family-name:var(--f-mono)] uppercase"
                style={{ fontSize: '0.74rem', letterSpacing: '0.14em', fontWeight: 600 }}
              >
                GAMECOCK BARBELL
              </span>
            </Link>
          </Magnetic>

          {/* Desktop nav */}
          <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item, i) => (
              <Magnetic key={item.href} intensity={0.2}>
                <Link
                  href={item.href}
                  className="text-[rgba(237,232,223,0.84)] hover:text-[var(--warm-white)] transition-colors duration-200 font-[family-name:var(--f-mono)] uppercase"
                  data-cursor="hover"
                  style={{ transitionDelay: `${i * 20}ms`, fontSize: '0.84rem', letterSpacing: '0.13em', fontWeight: 600 }}
                >
                  {item.label}
                </Link>
              </Magnetic>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          {!mobileOpen ? (
            <button
              className="md:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              data-cursor="hover"
            >
              <span className="block h-px w-6 bg-[var(--warm-white)]" />
              <span className="block h-px w-6 bg-[var(--warm-white)]" />
              <span className="block h-px w-6 bg-[var(--warm-white)]" />
            </button>
          ) : (
            <button
              className="md:hidden flex items-center justify-center h-[72px] px-2 text-[var(--warm-white)]"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              data-cursor="hover"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
          </div>
        </motion.header>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              id="mobile-menu"
              key="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="md:hidden absolute top-0 left-0 right-0 h-[100svh] overflow-hidden bg-[#080808] border-t border-[var(--rule)]"
              style={{ zIndex: 9, paddingTop: '72px' }}
            >
              <div className="wrap h-[calc(100svh-72px)] overflow-y-auto flex flex-col justify-center gap-7 pb-16">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-[family-name:var(--f-display)] text-[var(--warm-white)] hover:text-[var(--garnet)] transition-colors"
                    style={{ fontSize: 'clamp(2rem, 7vw, 3rem)', lineHeight: 1 }}
                    data-cursor="hover"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

