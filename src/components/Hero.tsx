'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from './TextReveal'
import Magnetic from './Magnetic'
import HeroRings from './HeroRings'

interface HeroProps {
  tagline?: string
}

const TICKER_ITEMS = [
  'POWERLIFTING', '·', 'BODYBUILDING', '·', 'WEIGHTLIFTING', '·',
  'COMMUNITY', '·', 'USC', '·', 'LIFT HEAVY', '·',
  'GAMECOCK BARBELL', '·',
]

/* Particles at different z-depths: size / opacity / position varies for depth illusion */

export default function Hero({ tagline = 'Strength. Community. Growth. Represent USC.' }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY    = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen overflow-hidden -mt-[72px]"
      aria-label="Hero section"
    >
      {/* ── 3D Background ─────────────────────────────────────────── */}
      <motion.div aria-hidden="true" style={{ y: bgY }} className="absolute inset-0 will-change-transform">

        {/* Base */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 140% 130% at 50% 65%, #0f0002 0%, #050006 45%, #000000 100%)' }} />

        {/* Primary garnet bloom */}
        <motion.div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 58% at 48% 42%, rgba(185,0,22,0.8) 0%, rgba(110,0,14,0.3) 48%, transparent 76%)' }}
          animate={{ opacity: [0.72, 1, 0.72], scale: [1, 1.09, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />



        {/* ── Perspective grid floor — animated scroll ───────────── */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: 0, left: '-20%', right: '-20%',
            height: '64%',
            backgroundImage: `
              linear-gradient(rgba(165,0,16,0.32) 1px, transparent 1px),
              linear-gradient(90deg, rgba(165,0,16,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'gridScroll 1.4s linear infinite',
            transform: 'perspective(560px) rotateX(68deg)',
            transformOrigin: '50% 100%',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 38%, transparent 72%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 38%, transparent 72%)',
          }}
        />

        {/* Horizon glow line — with pulsing animation */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            bottom: '28%', left: '0', right: '0',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(165,0,16,0.55) 18%, rgba(255,90,90,1) 50%, rgba(165,0,16,0.55) 82%, transparent 100%)',
            filter: 'blur(0.5px)',
          }}
          animate={{ boxShadow: ['0 0 18px 2px rgba(165,0,16,0.4)', '0 0 42px 8px rgba(165,0,16,0.75)', '0 0 18px 2px rgba(165,0,16,0.4)'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Periodic lens-flare sweep ───────────────────────────── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 30%, rgba(255,120,80,0.12) 48%, rgba(255,200,150,0.18) 50%, rgba(255,120,80,0.08) 52%, transparent 70%)',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 6 }}
        />

        {/* ── 3D spinning rings (canvas) ────────────────────────── */}
        <HeroRings />









        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 100% 88% at 50% 50%, transparent 44%, rgba(0,0,0,0.88) 100%)' }}
        />
        {/* Top fade for nav readability */}
        <div className="absolute inset-x-0 top-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)' }} />

        {/* Film-grain noise overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            backgroundSize: '180px 180px',
          }}
        />
      </motion.div>

      {/* ── Main content ──────────────────────────────────────────── */}
      <motion.div
        style={{ y: textY, opacity, height: 'calc(100vh - 2.5rem)', paddingBottom: '5vh' }}
        className="relative flex flex-col justify-center items-start will-change-transform"
      >
        <div className="wrap">
          {/* Left vertical accent line */}
          <motion.div
            className="hidden lg:block absolute top-[20%] bottom-[22%] pointer-events-none"
            style={{ left: 'calc(var(--wrap-px, 5vw) - 20px)', width: '1px', background: 'linear-gradient(to bottom, transparent 0%, rgba(165,0,16,0.7) 20%, rgba(165,0,16,0.7) 80%, transparent 100%)' }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="block h-px w-10 bg-[var(--warm-white)]" aria-hidden="true" />
            <span className="t-tag text-[var(--warm-white)]">University of South Carolina</span>
          </motion.div>

          {/* 3D extruded + glitch headline */}
          <motion.div
            animate={{ x: [0, 0, -2, 2, 0, 0], skewX: [0, 0, -0.5, 0.5, 0, 0] }}
            transition={{ duration: 0.18, repeat: Infinity, ease: 'linear', repeatDelay: 7 }}
          >
          <h1
            className="font-[family-name:var(--f-display)] text-[var(--warm-white)] mb-2 overflow-visible"
            style={{
              fontSize: 'clamp(2.6rem, 7vw, 5.8rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
              textShadow: '1px 1px 0 #6a000a, 3px 3px 0 #4d0007, 5px 5px 0 #340005, 7px 7px 0 #1e0003, 9px 9px 22px rgba(0,0,0,0.95)',
            }}
            aria-label="Gamecock Barbell Club"
          >
            <TextReveal text="GAMECOCK" as="span" mode="chars" delay={0.7} stagger={0.035} className="block" />
            <TextReveal
              text="BARBELL"
              as="span"
              mode="chars"
              delay={0.95}
              stagger={0.03}
              className="block"
              style={{
                color: 'var(--garnet)',
                /* deep extrusion + chromatic aberration split */
                textShadow: '-2px 0 rgba(255,30,30,0.55), 2px 0 rgba(0,180,255,0.2), 1px 1px 0 #4a0005, 3px 3px 0 #350004, 5px 5px 0 #200003, 7px 7px 16px rgba(0,0,0,0.95)',
              }}
            />
            <TextReveal text="CLUB" as="span" mode="chars" delay={1.15} stagger={0.03} className="block text-[rgba(237,232,223,0.92)]" />
          </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-[family-name:var(--f-body)] text-[rgba(237,232,223,0.78)] mt-4 mb-4"
            style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.12rem)', maxWidth: '38ch', lineHeight: 1.6, fontWeight: 400 }}
          >
            {tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Magnetic intensity={0.4}>
              <a href="#join" className="mag-btn" data-cursor="hover">Join the Club</a>
            </Magnetic>
            <Magnetic intensity={0.3}>
              <a
                href="#events"
                className="mag-btn"
                style={{
                  ['--btn-bg' as string]: 'transparent',
                  ['--btn-fg' as string]: 'var(--warm-white)',
                  ['--btn-hover-bg' as string]: 'var(--warm-white)',
                  ['--btn-hover-fg' as string]: 'var(--black)',
                  border: '1px solid rgba(237,232,223,0.22)',
                }}
                data-cursor="hover"
              >
                Upcoming Events
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom ticker ─────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden bg-[var(--garnet)] flex items-center"
        aria-hidden="true"
      >
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap will-change-transform"
        >
          {Array.from({ length: 4 }).map((_, rep) =>
            TICKER_ITEMS.map((item, i) => (
              <span
                key={`${rep}-${i}`}
                className="t-tag text-[var(--warm-white)] px-5 shrink-0"
                style={{ opacity: item === '·' ? 0.4 : 0.9 }}
              >
                {item}
              </span>
            ))
          )}
        </motion.div>
      </div>
    </section>
  )
}

