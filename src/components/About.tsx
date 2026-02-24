'use client'

import { motion } from 'framer-motion'
import TextReveal from './TextReveal'
import { FadeUp, Stagger, StaggerItem, itemVariants } from './MotionUtils'

const HIGHLIGHTS = [
  'Members who are confident in the gym, and members who are new to it and still learning more',
  'A community for all who want to share their knowledge, expand their knowledge, and make friends',
  'Like-minded individuals who all want to make themselves better',
  'Whether you workout six days a week or once a week — Gamecock Barbell Club is for all who wish to be involved',
]

const PRACTICES = [
  { label: 'Group Lifts', text: 'Each semester we dedicate a day to a group lift among members of the club' },
  { label: 'Jungle Gym', text: 'Partnered with the "Jungle Gym" located in West Columbia' },
  { label: 'Saturdays', text: 'Solely for member access from 6PM – 9PM' },
]

const SUBSECTIONS = [
  {
    num: '01',
    title: 'Gamecock Powerlifting',
    desc: 'Originally created in 2024, Gamecock Powerlifting is an official USC sports club that has had an insane amount of growth since its creation. With over 15 athletes total so far qualified for Collegiate Nationals, this club continues to grow and expand beyond expectations.',
  },
  {
    num: '02',
    title: 'Gamecock Bodybuilding',
    desc: "A group within the Barbell Club that has an interest and who are curious about the sport of bodybuilding. These individuals aren't always competitors — we are gaining tons of members who are either interested in competing, or just excited to learn more about the sport.",
  },
  {
    num: '03',
    title: 'Gamecock Weightlifting',
    desc: 'The newest addition to the Barbell Club, Gamecock Weightlifting is expected to see tons of growth. Fluid movements and intense focus are what allow these individuals to perform to the best of their ability.',
  },
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="wrap">
        {/* Section header */}
        <div className="section-header">
          <TextReveal text="About" as="h2" id="about-heading" mode="chars" className="t-section text-[var(--warm-white)]" />
          <span className="section-index t-tag">01</span>
        </div>

        {/* ── Mission block — full width ───────────────────────────── */}
        <div style={{ marginBottom: 'clamp(4rem, 8vw, 7rem)' }}>
          <FadeUp delay={0.06}>
            <p
              className="text-[var(--warm-white)] mb-8 max-w-[22ch]"
              style={{ fontFamily: "var(--f-display)", fontSize: 'var(--size-2xl)', lineHeight: 1.1, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' }}
            >
              A gym community for all of USC.
            </p>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p
              className="font-[family-name:var(--f-body)] text-[var(--stone)] max-w-[62ch]"
              style={{ fontSize: 'var(--size-md)', lineHeight: 1.85, fontWeight: 400 }}
            >
              We are an organization focused on physical health and well-being — welcoming everyone from seasoned competitors to those stepping into a gym for the first time.
            </p>
          </FadeUp>
        </div>

        {/* ── Highlights — 2-column grid ───────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-0" style={{ marginBottom: 'clamp(5rem, 9vw, 8rem)' }}>
          {HIGHLIGHTS.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-5 py-7 border-b border-[var(--rule)]"
            >
              <span
                className="font-[family-name:var(--f-mono)] text-[var(--garnet-text)] shrink-0 mt-[0.15em] select-none"
                style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p
                className="font-[family-name:var(--f-body)] text-[var(--stone)]"
                style={{ fontSize: 'var(--size-base)', lineHeight: 1.8, fontWeight: 400 }}
              >
                {text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Practices ────────────────────────────────────────────── */}
        <div style={{ marginBottom: 'clamp(5rem, 9vw, 8rem)' }}>
          <FadeUp>
            <div className="flex items-baseline justify-between pb-6 border-b border-[var(--rule)]">
              <h3
                className="font-[family-name:var(--f-display)] uppercase text-[var(--warm-white)]"
                style={{ fontSize: 'var(--size-xl)', lineHeight: 1.05, letterSpacing: '0.04em' }}
              >
                Practices
              </h3>
              <span className="t-tag text-[var(--garnet-text)]">02</span>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--rule)]" style={{ marginTop: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            {PRACTICES.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[var(--panel)] flex flex-col gap-4"
                style={{ padding: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
              >
                <div className="w-8 h-[2px] bg-[var(--garnet)]" aria-hidden="true" />
                <p
                  className="font-[family-name:var(--f-display)] uppercase text-[var(--warm-white)]"
                  style={{ fontSize: 'var(--size-sm)', letterSpacing: '0.1em', fontWeight: 700 }}
                >
                  {p.label}
                </p>
                <p
                  className="font-[family-name:var(--f-body)] text-[var(--stone)]"
                  style={{ fontSize: 'var(--size-base)', lineHeight: 1.75, fontWeight: 400 }}
                >
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Our Sports ───────────────────────────────────────────── */}
        <div>
          <FadeUp>
            <div className="flex items-baseline justify-between pb-6 border-b border-[var(--rule)]">
              <h3
                className="font-[family-name:var(--f-display)] uppercase text-[var(--warm-white)]"
                style={{ fontSize: 'var(--size-xl)', lineHeight: 1.05, letterSpacing: '0.04em' }}
              >
                Our Sports
              </h3>
              <span className="t-tag text-[var(--garnet-text)]">03</span>
            </div>
          </FadeUp>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ marginTop: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            {SUBSECTIONS.map((sub) => (
              <StaggerItem
                key={sub.title}
                variants={itemVariants}
                className="group relative flex flex-col overflow-hidden"
                style={{
                  background: 'var(--panel)',
                  border: '1px solid rgba(237,232,223,0.08)',
                  padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  gap: 'clamp(1rem, 2vw, 1.5rem)',
                }}
              >
                {/* Garnet top accent — always visible */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: 'linear-gradient(90deg, var(--garnet) 0%, var(--garnet-bright) 60%, transparent 100%)' }}
                  aria-hidden="true"
                />
                <h4
                  className="font-[family-name:var(--f-display)] uppercase text-[var(--warm-white)]"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)', lineHeight: 1.1, letterSpacing: '0.04em', fontWeight: 700 }}
                >
                  {sub.title}
                </h4>
                <p
                  className="font-[family-name:var(--f-body)] text-[var(--stone)]"
                  style={{ fontSize: 'var(--size-base)', lineHeight: 1.8, fontWeight: 400 }}
                >
                  {sub.desc}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}

