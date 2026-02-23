'use client'

import Image from 'next/image'
import TextReveal from './TextReveal'
import { Stagger, StaggerItem, itemVariants } from './MotionUtils'
import { urlFor } from '@/sanity/lib/image'
import type { Officer } from '@/sanity/types'

interface OfficersProps {
  officers: Officer[]
}

export default function Officers({ officers }: OfficersProps) {
  const safeOfficers = officers ?? []
  const isEmpty = safeOfficers.length === 0

  return (
    <section id="officers" aria-labelledby="officers-heading">
      <div className="wrap">
        {/* Section header */}
        <div className="section-header">
          <TextReveal text="Officers" as="h2" id="officers-heading" mode="chars" className="t-section text-[var(--warm-white)]" />
          <span className="section-index t-tag">04</span>
        </div>

        {!isEmpty ? (
          <Stagger
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
          >
            {safeOfficers.map((officer) => (
              <StaggerItem key={officer._id} variants={itemVariants}>
                <OfficerCard officer={officer} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <div className="p-12">
            <p className="font-[family-name:var(--f-display)] text-[var(--garnet)] uppercase mb-4" style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.9rem)', letterSpacing: '0.08em', lineHeight: 1 }}>
              Officer Lineup Coming Soon
            </p>
            <p className="font-[family-name:var(--f-body)] text-[rgba(237,232,223,0.86)]" style={{ fontSize: 'clamp(1.08rem, 1.8vw, 1.3rem)', lineHeight: 1.75, fontWeight: 500, maxWidth: '58ch' }}>
              This section stays visible and will fill in as officer profiles are published.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function OfficerCard({ officer }: { officer: Officer }) {
  const photoUrl = officer.photo
    ? urlFor(officer.photo).width(400).height(500).fit('crop').url()
    : null

  return (
    <article
      className="p-5 flex flex-col gap-3 group border border-[var(--rule)] hover:border-[rgba(165,0,16,0.5)] transition-all duration-500"
      aria-label={`${officer.name}, ${officer.role}`}
    >
      {/* Photo */}
      <div
        className="img-hover w-full aspect-[4/5] overflow-hidden mb-1 relative bg-[#1e1e1e]"
        aria-hidden={!officer.photo}
      >
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={`${officer.name} — ${officer.role}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center font-[family-name:var(--f-display)] text-[var(--muted)]"
            style={{ fontSize: '4rem' }}
            aria-hidden="true"
          >
            GBC
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--garnet)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      </div>

      {/* Name & role */}
      <div>
        <h3
          className="font-[family-name:var(--f-display)] uppercase text-[var(--warm-white)]"
          style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', lineHeight: 1.1 }}
        >
          {officer.name}
        </h3>
        <p className="t-tag text-[var(--garnet)] mt-1">{officer.role}</p>
      </div>

      {officer.major && (
        <p className="font-[family-name:var(--f-body)] text-[var(--muted)]" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
          {officer.major}
        </p>
      )}

      {/* Links */}
      <div className="flex gap-5 mt-auto pt-2">
        {officer.email && (
          <a
            href={`mailto:${officer.email}`}
            className="t-tag text-[var(--muted)] hover:text-[var(--garnet)] transition-colors"
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
            className="t-tag text-[var(--muted)] hover:text-[var(--garnet)] transition-colors"
            aria-label={`${officer.name}'s Instagram`}
            data-cursor="hover"
          >
            IG
          </a>
        )}
      </div>
    </article>
  )
}


