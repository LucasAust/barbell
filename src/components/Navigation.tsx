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

  return (
    <motion.header
      role="banner"
      style={{ zIndex: 'var(--z-nav)', paddingTop: 'env(safe-area-inset-top)' } as React.CSSProperties}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(8,8,8,0.88)] backdrop-blur-xl border-b border-[var(--rule)]'
          : 'bg-[linear-gradient(to_bottom,rgba(8,8,8,0.7),transparent)]'
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
          >
            <span
              className="font-[family-name:var(--f-display)] text-[var(--warm-white)] leading-none"
              style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', letterSpacing: '0.03em', fontWeight: 700 }}
            >
              GBC
            </span>
            <span
              className="hidden sm:block h-4 w-px bg-[var(--rule)] mx-1"
              aria-hidden="true"
            />
            <span
              className="hidden sm:block text-[rgba(237,232,223,0.82)] font-[family-name:var(--f-mono)] uppercase"
              style={{ fontSize: '0.74rem', letterSpacing: '0.14em', fontWeight: 600 }}
            >
              GAMECOCK BARBELL
            </span>
          </Link>
        </Magnetic>

        {/* Desktop nav */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-8"
        >
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 group"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          data-cursor="hover"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block h-px w-6 bg-[var(--warm-white)] origin-center"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block h-px w-6 bg-[var(--warm-white)]"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block h-px w-6 bg-[var(--warm-white)] origin-center"
          />
        </button>
      </div>

      {/* Mobile menu — full-screen fixed overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-menu"
            key="mobile-nav"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 bg-[var(--black)] flex flex-col"
            style={{ zIndex: 'var(--z-nav)' } as React.CSSProperties}
          >
            {/* Header row inside overlay */}
            <div className="wrap flex items-center justify-between h-[72px] shrink-0">
              <span
                className="font-[family-name:var(--f-display)] text-[var(--warm-white)] leading-none"
                style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', letterSpacing: '0.03em', fontWeight: 700 }}
              >
                GBC
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-2 text-[var(--warm-white)]"
                data-cursor="hover"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <div className="wrap flex-1 flex flex-col justify-center gap-6 pb-16">
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
    </motion.header>
  )
}

