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

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Lock body scroll when mobile menu is open so page content
  // doesn't scroll behind the Safari URL bar chrome
  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      {/* ── Main header bar ── */}
      <motion.header
        role="banner"
        style={{ zIndex: 500, paddingTop: 'env(safe-area-inset-top)' } as React.CSSProperties}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
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

          {/* Mobile hamburger — hidden when overlay is open (overlay has its own close) */}
          {!mobileOpen && (
            <button
              className="md:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={false}
              aria-controls="mobile-menu"
              data-cursor="hover"
            >
              <span className="block h-px w-6 bg-[var(--warm-white)]" />
              <span className="block h-px w-6 bg-[var(--warm-white)]" />
              <span className="block h-px w-6 bg-[var(--warm-white)]" />
            </button>
          )}
        </div>
      </motion.header>

      {/* ── Mobile full-screen overlay — z-index ABOVE header so no bleed-through ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden fixed inset-0 flex flex-col"
            style={{ backgroundColor: '#080808', zIndex: 501 } as React.CSSProperties}
          >
            {/* Top bar — mirrors header */}
            <div className="wrap flex items-center justify-between shrink-0">
              <div className="flex items-center h-[72px]">
                <span
                  className="font-[family-name:var(--f-display)] text-[var(--warm-white)] leading-none"
                  style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', letterSpacing: '0.03em', fontWeight: 700 }}
                >
                  GBC
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex items-center justify-center h-[72px] px-2 text-[var(--warm-white)]"
                data-cursor="hover"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <div className="wrap flex-1 flex flex-col justify-center gap-7 pb-20">
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

