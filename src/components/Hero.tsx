'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from './TextReveal'
import Magnetic from './Magnetic'

interface HeroProps {
  tagline?: string
}

const TICKER_ITEMS = [
  'SQUAT', '·', 'BENCH', '·', 'DEADLIFT', '·',
  'COMPETE', '·', 'USC', '·', 'LIFT HEAVY', '·',
  'GAMECOCK BARBELL', '·',
]

const FLOATING_TAGS = ['USAPL READY', 'SPEED + POWER', 'COLUMBIA, SC', 'NEW LIFTERS WELCOME']

const STATS = [
  { val: '50+', label: 'Members' },
  { val: 'USAPL', label: 'Sanctioned' },
]

/* Particles at different z-depths: size / opacity / position varies for depth illusion */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: 2 + (i % 4) * 2.5,
  x: 5 + (i * 5.3) % 90,
  y: 8 + (i * 7.1) % 80,
  color: i % 3 === 0 ? 'rgba(165,0,16,0.95)' : i % 3 === 1 ? 'rgba(237,232,223,0.7)' : 'rgba(200,100,60,0.6)',
  blur: i % 3 === 2 ? 2 : 0,
  dur: 2.4 + (i % 6) * 0.5,
  delay: i * 0.18,
  yAmt: 14 + (i % 5) * 9,
}))

export default function Hero({ tagline = 'Lift Heavy. Compete Hard. Represent USC.' }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY    = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen overflow-hidden"
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

        {/* Secondary cool bloom — slight orange/amber for contrast */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: '50%', height: '50%',
            top: '10%', right: '-5%',
            background: 'radial-gradient(ellipse, rgba(180,40,10,0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ x: [0, -30, 0], y: [0, 18, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Third glow — deep purple undertone, bottom-left */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: '40%', height: '40%',
            bottom: '10%', left: '-8%',
            background: 'radial-gradient(ellipse, rgba(80,0,80,0.22) 0%, transparent 70%)',
            filter: 'blur(55px)',
          }}
          animate={{ x: [0, 24, 0], y: [0, -16, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
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

        {/* ── Scan line ───────────────────────────────────────────── */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(237,232,223,0.25) 20%, rgba(255,255,255,0.55) 50%, rgba(237,232,223,0.25) 80%, transparent 100%)',
            animation: 'scanLine 8s linear infinite',
            animationDelay: '2s',
          }}
        />

        {/* ── 3D Orbital rings ───────────────────────────────────── */}
        {/* Ring 1 — equatorial, largest */}
        <div className="absolute inset-0 pointer-events-none" style={{ perspective: '900px', perspectiveOrigin: '50% 42%' }}>
          <motion.div
            style={{
              position: 'absolute',
              width: '82vw', height: '82vw',
              top: '50%', left: '50%',
              marginTop: '-41vw', marginLeft: '-41vw',
              borderRadius: '50%',
              border: '1px solid rgba(237,232,223,0.18)',
              boxShadow: '0 0 0 1px rgba(165,0,16,0.08), inset 0 0 60px rgba(165,0,16,0.06)',
              rotateX: 72,
            }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Ring 2 — tilted, garnet tinted */}
        <div className="absolute inset-0 pointer-events-none" style={{ perspective: '900px', perspectiveOrigin: '50% 42%' }}>
          <motion.div
            style={{
              position: 'absolute',
              width: '58vw', height: '58vw',
              top: '50%', left: '50%',
              marginTop: '-29vw', marginLeft: '-29vw',
              borderRadius: '50%',
              border: '1.5px solid rgba(165,0,16,0.55)',
              boxShadow: '0 0 20px rgba(165,0,16,0.15)',
              rotateX: 68,
              rotateZ: 25,
            }}
            animate={{ rotateZ: [25, 385] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Ring 3 — inner, near-flat, fast */}
        <div className="absolute inset-0 pointer-events-none" style={{ perspective: '900px', perspectiveOrigin: '50% 42%' }}>
          <motion.div
            style={{
              position: 'absolute',
              width: '38vw', height: '38vw',
              top: '50%', left: '50%',
              marginTop: '-19vw', marginLeft: '-19vw',
              borderRadius: '50%',
              border: '1px dashed rgba(237,232,223,0.12)',
              rotateX: 60,
              rotateZ: -10,
            }}
            animate={{ rotateZ: [-10, -370] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Ring 4 — outer halo, very subtle */}
        <div className="absolute inset-0 pointer-events-none" style={{ perspective: '900px', perspectiveOrigin: '50% 42%' }}>
          <motion.div
            style={{
              position: 'absolute',
              width: '108vw', height: '108vw',
              top: '50%', left: '50%',
              marginTop: '-54vw', marginLeft: '-54vw',
              borderRadius: '50%',
              border: '1px solid rgba(165,0,16,0.18)',
              rotateX: 78,
            }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* ── Depth particles ───────────────────────────────────── */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: p.size, height: p.size,
              left: `${p.x}%`, top: `${p.y}%`,
              background: p.color,
              filter: p.blur ? `blur(${p.blur}px)` : undefined,
              boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            }}
            animate={{ y: [0, -p.yAmt, 0], opacity: [0.15, 1, 0.15], scale: [0.7, 1.3, 0.7] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}

        {/* ── HUD corner brackets ──────────────────────────────── */}
        {[{t:'8px',l:'8px',bl:0,br:0},{t:'8px',r:'8px',bl:0,br:0},{b:'48px',l:'8px',bl:0,br:0},{b:'48px',r:'8px',bl:0,br:0}].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            aria-hidden="true"
            style={{
              ...pos,
              width: 28, height: 28,
              borderTop:    (i < 2) ? '1.5px solid rgba(165,0,16,0.7)' : 'none',
              borderBottom: (i >= 2) ? '1.5px solid rgba(165,0,16,0.7)' : 'none',
              borderLeft:   (i % 2 === 0) ? '1.5px solid rgba(165,0,16,0.7)' : 'none',
              borderRight:  (i % 2 === 1) ? '1.5px solid rgba(165,0,16,0.7)' : 'none',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.5, 0.9, 0.5], scale: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2.4 + i * 0.15 }}
          />
        ))}

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
        style={{ y: textY, opacity }}
        className="relative flex flex-col justify-center h-screen pt-20 pb-24 will-change-transform"
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
            className="flex items-center gap-3 mb-6"
          >
            <span className="block h-px w-10 bg-[var(--garnet)]" aria-hidden="true" />
            <span className="t-tag text-[var(--garnet)]">University of South Carolina</span>
          </motion.div>

          {/* 3D extruded + glitch headline */}
          <motion.div
            animate={{ x: [0, 0, -2, 2, 0, 0], skewX: [0, 0, -0.5, 0.5, 0, 0] }}
            transition={{ duration: 0.18, repeat: Infinity, ease: 'linear', repeatDelay: 7 }}
          >
          <h1
            className="font-[family-name:var(--f-display)] text-[var(--warm-white)] mb-3 overflow-visible"
            style={{
              fontSize: 'clamp(3rem, 8.5vw, 7.2rem)',
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
            className="font-[family-name:var(--f-body)] text-[rgba(237,232,223,0.78)] mt-5 mb-5"
            style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.12rem)', maxWidth: '38ch', lineHeight: 1.6, fontWeight: 400 }}
          >
            {tagline}
          </motion.p>

          {/* Stat chips */}
          <motion.div
            className="flex items-center gap-5 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.55 }}
          >
            {STATS.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="font-[family-name:var(--f-display)] text-[var(--warm-white)]"
                  style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', fontWeight: 700, letterSpacing: '0.04em' }}
                >
                  {s.val}
                </span>
                <span
                  className="font-[family-name:var(--f-body)] text-[rgba(237,232,223,0.45)] uppercase"
                  style={{ fontSize: '0.65rem', letterSpacing: '0.12em', fontWeight: 500 }}
                >
                  {s.label}
                </span>
                {i < STATS.length - 1 && (
                  <span className="ml-3 w-px h-4 bg-[rgba(237,232,223,0.18)]" aria-hidden="true" />
                )}
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
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

      {/* ── Floating chips — bottom right, 3D card style ────────── */}
      <motion.div
        className="absolute hidden lg:flex flex-col gap-3 pointer-events-none"
        style={{ right: '5%', bottom: '16%', zIndex: 2 }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        {FLOATING_TAGS.map((chip, i) => (
          <motion.span
            key={chip}
            className="inline-flex items-center gap-3 self-end"
            style={{
              background: 'linear-gradient(135deg, rgba(18,6,6,0.96) 0%, rgba(10,2,2,0.96) 100%)',
              border: '1px solid rgba(165,0,16,0.5)',
              borderBottom: '1px solid rgba(165,0,16,0.25)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.7), 0 2px 0 rgba(200,50,50,0.15) inset, 4px 6px 18px rgba(165,0,16,0.18)',
              borderRadius: '6px',
              padding: '0.55rem 1.6rem',
              fontFamily: 'var(--f-body)',
              fontSize: '0.76rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: 'rgba(237,232,223,0.9)',
              transform: `perspective(400px) rotateY(${i % 2 === 0 ? -4 : 4}deg) rotateX(2deg)`,
            }}
            animate={{ y: [0, -8, 0], rotateY: [i % 2 === 0 ? -4 : 4, i % 2 === 0 ? -1 : 1, i % 2 === 0 ? -4 : 4] }}
            transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          >
            <span
              style={{
                width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0,
                background: 'var(--garnet)', boxShadow: '0 0 10px rgba(165,0,16,1)',
              }}
            />
            {chip}
          </motion.span>
        ))}
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="t-tag text-[var(--muted)]" style={{ fontSize: '0.68rem', letterSpacing: '0.2em', opacity: 0.7 }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-[var(--muted)] to-transparent"
        />
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

