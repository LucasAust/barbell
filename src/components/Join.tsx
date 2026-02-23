'use client'

import { motion } from 'framer-motion'
import TextReveal from './TextReveal'
import { FadeUp } from './MotionUtils'
import Magnetic from './Magnetic'

interface JoinProps {
  joinLink?: string
  email?: string
  instagramHandle?: string
}

export default function Join({
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

        {/* Description + CTA */}
        <div className="max-w-[58ch]">
          <FadeUp delay={0.15}>
            <p
              className="font-[family-name:var(--f-body)] text-[var(--warm-white)] mb-12"
              style={{ fontSize: 'var(--size-md)', lineHeight: 1.75, fontWeight: 400, opacity: 0.82 }}
            >
              Regardless of if you workout six days a week, or once a week, Gamecock Barbell Club is a community for all who wish to be involved in it to enjoy. Whether you&apos;re interested in powerlifting, bodybuilding, weightlifting, or just want to surround yourself with like-minded individuals &mdash; we&apos;d love for you to join us.
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <div className="flex flex-wrap gap-4 mb-12">
              {joinLink ? (
                <Magnetic intensity={0.35}>
                  <a
                    href={joinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mag-btn"
                    aria-label="Join the club"
                  >
                    Join the Club
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

          {instagramHandle && (
            <FadeUp delay={0.35}>
              <div className="flex items-start gap-5 pt-8 border-t border-[var(--rule)]">
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
            </FadeUp>
          )}
        </div>
      </div>
    </section>
  )
}

