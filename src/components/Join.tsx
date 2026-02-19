'use client'

import { motion } from 'framer-motion'
import TextReveal from './TextReveal'
import { FadeUp } from './MotionUtils'
import Magnetic from './Magnetic'

interface JoinProps {
  duesAmount?: string
  meetingInfo?: string
  joinLink?: string
  email?: string
  instagramHandle?: string
}

const STEPS = [
  {
    num: '01',
    title: 'Show Up',
    desc: 'Come to any practice — no experience required. Just bring yourself and a willingness to work.',
  },
  {
    num: '02',
    title: 'Pay Dues',
    desc: 'Club dues are collected each semester through CockLink. Dues keep our meet entry fees affordable.',
  },
  {
    num: '03',
    title: 'Compete',
    desc: "We compete in USAPL-sanctioned meets throughout the Southeast. First meet? We'll coach you through it.",
  },
]

export default function Join({
  duesAmount = '$20/semester',
  meetingInfo = 'Tuesdays & Thursdays · 6–8 PM',
  joinLink,
  email,
  instagramHandle,
}: JoinProps) {
  return (
    <section id="join" aria-labelledby="join-heading" className="relative overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-[var(--off-black)]" />

      {/* Diagonal texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(237,232,223,0.012) 60px, rgba(237,232,223,0.012) 61px)',
        }}
      />

      {/* Garnet accent bar — top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--garnet)]" aria-hidden="true" />

      {/* Ambient garnet glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(115,0,10,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Moving glow sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(110deg, transparent 30%, rgba(165,0,16,0.18) 50%, transparent 70%)',
        }}
        animate={{ x: ['-35%', '35%', '-35%'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Pulsing dots */}
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full pointer-events-none"
          aria-hidden="true"
          style={{
            width: `${4 + (i % 2) * 2}px`,
            height: `${4 + (i % 2) * 2}px`,
            top: `${12 + i * 11}%`,
            right: `${8 + (i % 3) * 7}%`,
            background: 'rgba(237,232,223,0.6)',
          }}
          animate={{ opacity: [0.2, 0.95, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.8 + i * 0.35, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
        />
      ))}

      <div className="wrap relative">
        {/* Section header */}
        <div className="section-header">
          <TextReveal text="Join" as="h2" id="join-heading" mode="chars" className="t-section text-[var(--warm-white)]" />
          <span className="section-index t-tag">06</span>
        </div>

        {/* Giant headline */}
        <FadeUp>
          <div className="mb-16 lg:mb-24 overflow-hidden">
            <h3
              className="font-[family-name:var(--f-display)] uppercase leading-[0.88]"
              style={{ fontSize: 'clamp(4.5rem, 13vw, 12rem)', letterSpacing: '-0.02em' }}
            >
              <span className="block text-[var(--warm-white)]">Ready</span>
              <span
                className="block"
                style={{ WebkitTextStroke: '2px rgba(237,232,223,0.3)', color: 'transparent' }}
              >
                to Lift?
              </span>
            </h3>
          </div>
        </FadeUp>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

          {/* Steps */}
          <div className="lg:col-span-7 flex flex-col">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.7, delay: 0.05 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-10 py-10 px-4 border-b border-[var(--rule)] group hover:bg-[rgba(165,0,16,0.06)] transition-all duration-300"
              >
                <span
                  className="font-[family-name:var(--f-mono)] text-[var(--garnet)] shrink-0 mt-1 transition-colors duration-300 group-hover:text-[var(--garnet-bright)]"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.2em' }}
                  aria-hidden="true"
                >
                  {step.num}
                </span>
                <div className="flex-1">
                  <h4
                    className="font-[family-name:var(--f-display)] uppercase text-[var(--warm-white)] mb-3"
                    style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', lineHeight: 1 }}
                  >
                    {step.title}
                  </h4>
                  <p
                    className="font-[family-name:var(--f-body)] text-[var(--muted)]"
                    style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)', lineHeight: 1.7, fontWeight: 400 }}
                  >
                    {step.desc}
                  </p>
                </div>
                <span
                  className="shrink-0 w-8 h-8 flex items-center justify-center text-[var(--dust)] transition-all duration-300 group-hover:text-[var(--garnet)] mt-1"
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 7h10M7 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <FadeUp delay={0.2}>
              <p
                className="font-[family-name:var(--f-body)] text-[var(--muted)] mb-10"
                style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', lineHeight: 1.7, fontWeight: 400 }}
              >
                No barbell experience required. All you need is the drive to get
                stronger. We provide coaching, community, and your path to the platform.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-4 mb-12">
                {joinLink ? (
                  <Magnetic intensity={0.35}>
                    <a
                      href={joinLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mag-btn"
                      aria-label="Sign up now"
                    >
                      Sign Up Now
                    </a>
                  </Magnetic>
                ) : (
                  <Magnetic intensity={0.35}>
                    <a href="#about" className="mag-btn">
                      Learn More
                    </a>
                  </Magnetic>
                )}
                {email && (
                  <Magnetic intensity={0.25}>
                    <a
                      href={`mailto:${email}`}
                      className="mag-btn"
                      style={{
                        ['--btn-bg' as string]: 'transparent',
                        ['--btn-fg' as string]: 'var(--warm-white)',
                        ['--btn-hover-bg' as string]: 'var(--warm-white)',
                        ['--btn-hover-fg' as string]: 'var(--black)',
                        border: '1px solid rgba(237,232,223,0.2)',
                      }}
                      aria-label={`Email us at ${email}`}
                    >
                      Email Us
                    </a>
                  </Magnetic>
                )}
              </div>
            </FadeUp>

            <FadeUp delay={0.35}>
              <div className="flex flex-col gap-6 pt-8 border-t border-[var(--rule)]">
                {duesAmount && (
                  <div className="flex items-start gap-5">
                    <span className="block w-6 h-px bg-[var(--garnet)] shrink-0 mt-[0.55em]" aria-hidden="true" />
                    <div>
                      <p className="t-tag text-[var(--garnet)] mb-1">Dues</p>
                      <p className="font-[family-name:var(--f-body)] text-[var(--stone)]" style={{ fontSize: '0.95rem', fontWeight: 400 }}>{duesAmount}</p>
                    </div>
                  </div>
                )}
                {meetingInfo && (
                  <div className="flex items-start gap-5">
                    <span className="block w-6 h-px bg-[var(--garnet)] shrink-0 mt-[0.55em]" aria-hidden="true" />
                    <div>
                      <p className="t-tag text-[var(--garnet)] mb-1">Practice</p>
                      <p className="font-[family-name:var(--f-body)] text-[var(--stone)]" style={{ fontSize: '0.95rem', fontWeight: 400 }}>{meetingInfo}</p>
                    </div>
                  </div>
                )}
                {instagramHandle && (
                  <div className="flex items-start gap-5">
                    <span className="block w-6 h-px bg-[var(--garnet)] shrink-0 mt-[0.55em]" aria-hidden="true" />
                    <div>
                      <p className="t-tag text-[var(--garnet)] mb-1">Instagram</p>
                      <a
                        href={`https://instagram.com/${instagramHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-[family-name:var(--f-body)] text-[var(--stone)] hover:text-[var(--warm-white)] transition-colors"
                        style={{ fontSize: '0.95rem', fontWeight: 400 }}
                      >
                        @{instagramHandle}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

