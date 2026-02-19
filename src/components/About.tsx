'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TextReveal from './TextReveal'
import { FadeUp, Stagger, StaggerItem, itemVariants } from './MotionUtils'

interface AboutProps {
  aboutText?: string
  stats?: Array<{ value: string; label: string }>
  meetingInfo?: string
}

const DEFAULT_ABOUT = `Gamecock Barbell Club is the University of South Carolina's competitive powerlifting team. We welcome lifters of all experience levels — from first-time trainees to nationally ranked competitors. Our mission is to build strength, character, and community through the sport of powerlifting.`

const DEFAULT_STATS = [
  { value: '50+', label: 'Active Members' },
  { value: '3×', label: 'Regional Champions' },
  { value: '2010', label: 'Founded' },
  { value: '100%', label: 'Walk-ons Welcome' },
]

export default function About({
  aboutText = DEFAULT_ABOUT,
  stats = DEFAULT_STATS,
  meetingInfo = 'Tuesdays & Thursdays · 6–8 PM · Strom Thurmond Wellness Center',
}: AboutProps) {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="wrap">
        {/* Section header */}
        <div className="section-header">
          <TextReveal text="About" as="h2" id="about-heading" mode="chars" className="t-section text-[var(--warm-white)]" />
          <span className="section-index t-tag">01</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — text */}
          <div className="lg:col-span-7">
            <FadeUp delay={0.1}>
              <p
                className="font-[family-name:var(--f-body)] text-[var(--warm-white)]"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', lineHeight: 1.65, fontWeight: 400 }}
              >
                {aboutText}
              </p>
            </FadeUp>

            {meetingInfo && (
              <FadeUp delay={0.22}>
                <div className="mt-10 flex items-start gap-5 border-l-2 border-[var(--garnet)] pl-6">
                  <div>
                    <p className="t-tag text-[var(--garnet)] mb-2">Practice Schedule</p>
                    <p
                      className="font-[family-name:var(--f-body)] text-[var(--muted)]"
                      style={{ fontSize: '0.95rem', lineHeight: 1.5, fontWeight: 400 }}
                    >
                      {meetingInfo}
                    </p>
                  </div>
                </div>
              </FadeUp>
            )}
          </div>

          {/* Right — stats */}
          <div className="lg:col-span-5">
            <Stagger className="grid grid-cols-2 gap-x-8 gap-y-12">
              {stats.map((stat) => (
                <StaggerItem
                  key={stat.label}
                  variants={itemVariants}
                  className="flex flex-col gap-3 border-t-2 border-[var(--garnet)] pt-6"
                >
                  <CountUp
                    value={stat.value}
                    className="font-[family-name:var(--f-display)] text-[var(--warm-white)]"
                    style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1 }}
                  />
                  <span className="t-tag text-[var(--garnet)]">{stat.label}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Animated counter ─────────────────────────────────────────────── */
function CountUp({ value, className, style }: { value: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {value}
    </motion.span>
  )
}

