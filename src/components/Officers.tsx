'use client'

import { motion } from 'framer-motion'
import TextReveal from './TextReveal'
import type { Officer } from '@/sanity/types'

interface OfficersProps {
  officers: Officer[]
}

export default function Officers({ officers }: OfficersProps) {
  const safeOfficers = officers ?? []
  const isEmpty = safeOfficers.length === 0

  return (
    <section id="officers" aria-labelledby="officers-heading" className="bg-[var(--panel)]">
      <div className="wrap">
        {/* Section header */}
        <div className="section-header">
          <TextReveal text="Officers" as="h2" id="officers-heading" mode="chars" className="t-section text-[var(--warm-white)]" />
          <span className="section-index t-tag">04</span>
        </div>

        {!isEmpty ? (
          /* Grid wrapper gives every row the SAME column template → roles snap into one column */
          <div
            className="border-t border-[var(--rule)]"
            style={{ display: 'grid', gridTemplateColumns: '1fr' }}
          >
            {safeOfficers.map((officer, i) => (
              <OfficerRow key={officer._id} officer={officer} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-12">
            <p className="font-[family-name:var(--f-display)] text-[var(--garnet)] uppercase mb-4" style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.9rem)', letterSpacing: '0.08em', lineHeight: 1 }}>
              Officer Lineup Coming Soon
            </p>
            <p className="font-[family-name:var(--f-body)] text-[rgba(237,232,223,0.86)]" style={{ fontSize: 'clamp(1.08rem, 1.8vw, 1.3rem)', lineHeight: 1.75, fontWeight: 400, maxWidth: '58ch' }}>
              This section will fill in as officer profiles are published.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function OfficerRow({ officer, index }: { officer: Officer; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-4% 0px' }}
      transition={{ duration: 0.5, delay: index * 0.055, ease: [0.16, 1, 0.3, 1] }}
      className="group relative border-b border-[var(--rule)] overflow-hidden cursor-default"
      style={{
        display: 'grid',
        gridTemplateColumns: '2.5rem 1fr 22ch',
        alignItems: 'center',
        gap: '0 clamp(1rem, 3vw, 2.5rem)',
        padding: 'clamp(1.35rem, 2.5vw, 1.9rem) 0.5rem clamp(1.35rem, 2.5vw, 1.9rem) 1.25rem',
      }}
      aria-label={`${officer.name}, ${officer.role}`}
    >
      {/* Garnet left accent — sweeps in on hover */}
      <span
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--garnet)] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 ease-out"
        aria-hidden="true"
      />

      {/* Index */}
      <span
        className="font-[family-name:var(--f-mono)] text-[var(--garnet-text)] opacity-30 group-hover:opacity-60 transition-opacity duration-300 w-8 shrink-0 text-right select-none"
        style={{ fontSize: '0.68rem', letterSpacing: '0.2em' }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-[family-name:var(--f-display)] uppercase text-[var(--warm-white)]"
          style={{ fontSize: 'clamp(1.05rem, 2.6vw, 1.55rem)', letterSpacing: '0.02em', lineHeight: 1 }}
        >
          {officer.name}
        </h3>
      </div>

      {/* Role — always in the same column because of parent grid */}
      <p
        className="t-tag text-[var(--garnet-text)]"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {officer.role}
      </p>

      {/* Optional links */}
      {(officer.email || officer.instagram) && (
        <div className="hidden md:flex items-center gap-5 shrink-0">
          {officer.email && (
            <a
              href={`mailto:${officer.email}`}
              className="t-tag text-[var(--muted)] hover:text-[var(--garnet)] transition-colors duration-200"
              aria-label={`Email ${officer.name}`}
              data-cursor="hover"
            >
              Email
            </a>
          )}
          {officer.instagram && (
            <a
              href={`https://instagram.com/${officer.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="t-tag text-[var(--muted)] hover:text-[var(--garnet)] transition-colors duration-200"
              aria-label={`${officer.name}'s Instagram`}
              data-cursor="hover"
            >
              IG
            </a>
          )}
        </div>
      )}
    </motion.article>
  )
}


