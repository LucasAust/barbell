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

        {/* Two-column layout — description + highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-20 lg:mb-28">
          {/* Left — intro text */}
          <div className="lg:col-span-5">
            <FadeUp delay={0.1}>
              <p
                className="font-[family-name:var(--f-body)] text-[var(--warm-white)]"
                style={{ fontSize: 'var(--size-md)', lineHeight: 1.75, fontWeight: 400 }}
              >
                Gamecock Barbell Club is a fitness and gym community for the entirety of the University of South Carolina campus. We are an organization focused on physical health and well-being.
              </p>
            </FadeUp>
          </div>

          {/* Right — highlights */}
          <div className="lg:col-span-7">
            {HIGHLIGHTS.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-6 py-5 border-b border-[var(--rule)]"
              >
                <span className="block w-8 h-px bg-[var(--garnet)] shrink-0 mt-[0.7em]" aria-hidden="true" />
                <p
                  className="font-[family-name:var(--f-body)] text-[var(--warm-white)]"
                  style={{ fontSize: 'var(--size-sm)', lineHeight: 1.75, fontWeight: 400, opacity: 0.82 }}
                >
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Practices — horizontal strip */}
        <FadeUp delay={0.15}>
          <div className="mb-20 lg:mb-28">
            <h3
              className="font-[family-name:var(--f-display)] uppercase text-[var(--warm-white)] mb-12"
              style={{ fontSize: 'var(--size-xl)', lineHeight: 1.05, letterSpacing: '0.04em' }}
            >
              Practices
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
              {PRACTICES.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-5% 0px' }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="h-px w-full bg-gradient-to-r from-[var(--garnet)] to-transparent mb-6" aria-hidden="true" />
                  <p
                    className="font-[family-name:var(--f-display)] uppercase text-[var(--garnet)]"
                    style={{ fontSize: 'var(--size-tag)', letterSpacing: '0.14em', fontWeight: 700, marginBottom: '0.75rem' }}
                  >
                    {p.label}
                  </p>
                  <p
                    className="font-[family-name:var(--f-body)] text-[var(--warm-white)]"
                    style={{ fontSize: 'var(--size-sm)', lineHeight: 1.7, fontWeight: 400, opacity: 0.75 }}
                  >
                    {p.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Sport Subsections */}
        <div>
          <h3
            className="font-[family-name:var(--f-display)] uppercase text-[var(--warm-white)] mb-12"
            style={{ fontSize: 'var(--size-xl)', lineHeight: 1.05, letterSpacing: '0.04em' }}
          >
            Our Sports
          </h3>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {SUBSECTIONS.map((sub) => (
              <StaggerItem
                key={sub.title}
                variants={itemVariants}
                className="relative p-8 lg:p-10 flex flex-col gap-5 group border border-[var(--rule)] hover:border-[rgba(165,0,16,0.5)] transition-all duration-500"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--garnet)] via-[var(--garnet-bright)] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

                <span
                  className="font-[family-name:var(--f-mono)] text-[var(--garnet)] block"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.2em' }}
                  aria-hidden="true"
                >
                  {sub.num}
                </span>
                <h4
                  className="font-[family-name:var(--f-display)] uppercase text-[var(--warm-white)]"
                  style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.6rem)', lineHeight: 1.1, letterSpacing: '0.03em' }}
                >
                  {sub.title}
                </h4>
                <p
                  className="font-[family-name:var(--f-body)] text-[var(--warm-white)]"
                  style={{ fontSize: 'var(--size-sm)', lineHeight: 1.75, fontWeight: 400, opacity: 0.7 }}
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

