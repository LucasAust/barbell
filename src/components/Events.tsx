'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextReveal from './TextReveal'
import { FadeUp, Stagger, StaggerItem, itemVariants } from './MotionUtils'
import type { Event } from '@/sanity/types'

interface EventsProps {
  upcoming: Event[]
  archived: Event[]
}

const BADGE_MAP: Record<string, string> = {
  competition: 'badge-comp',
  meet: 'badge-meet',
  practice: 'badge-prac',
  social: 'badge-social',
  other: 'badge-other',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  })
}
function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
}
function formatDay(iso: string) {
  return new Date(iso).getDate()
}

export default function Events({ upcoming, archived }: EventsProps) {
  const [showArchive, setShowArchive] = useState(false)
  const featured = upcoming.filter((e) => e.featured)
  const regular = upcoming.filter((e) => !e.featured)

  return (
    <section id="events" aria-labelledby="events-heading">
      <div className="wrap">
        {/* Section header */}
        <div className="section-header">
          <TextReveal text="Events" as="h2" id="events-heading" mode="chars" className="t-section text-[var(--warm-white)]" />
          <span className="section-index t-tag">02</span>
        </div>

        {/* Intro text */}
        <FadeUp delay={0.08}>
          <p
            className="font-[family-name:var(--f-body)] text-[var(--stone)] mb-10 max-w-[58ch]"
            style={{ fontSize: 'var(--size-md)', lineHeight: 1.7, fontWeight: 400 }}
          >
            Outside of athletics and the gym, we are all hard-working and dedicated students who are trying to further our education. We don&apos;t always do events related to the gym &mdash; sometimes it&apos;s about setting up something fun with friends.
          </p>
        </FadeUp>

        {/* Event types — badge row */}
        <FadeUp delay={0.14}>
          <div className="flex flex-wrap gap-3 mb-14">
            {['Protein Bar Tastings', 'Game Nights', 'Fundraisers', 'Mental Health & Wellness'].map((tag) => (
              <span key={tag} className="badge badge-social">{tag}</span>
            ))}
          </div>
        </FadeUp>

        {upcoming.length === 0 ? (
          <FadeUp>
            <p className="font-[family-name:var(--f-body)] text-[var(--muted)]" style={{ fontSize: '1.1rem', fontWeight: 400 }}>
              No upcoming events right now — check back soon.
            </p>
          </FadeUp>
        ) : (
          <>
            {/* Featured — large cards */}
            {featured.length > 0 && (
              <Stagger
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
              >
                {featured.map((event) => (
                  <StaggerItem key={event._id} variants={itemVariants}>
                    <EventCard event={event} />
                  </StaggerItem>
                ))}
              </Stagger>
            )}

            {/* Regular — editorial rows */}
            <div className="grid grid-cols-1">
              {regular.map((event, i) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-5% 0px' }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <EventRow event={event} />
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Archive toggle */}
        {archived.length > 0 && (
          <FadeUp delay={0.2}>
            <div className="mt-14">
              <button
                onClick={() => setShowArchive((v) => !v)}
                className="t-tag text-[var(--muted)] hover:text-[var(--warm-white)] transition-colors flex items-center gap-3"
                aria-expanded={showArchive}
                aria-controls="event-archive"
                data-cursor="hover"
              >
                <motion.span
                  animate={{ rotate: showArchive ? 90 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-block"
                  aria-hidden="true"
                >
                  ▶
                </motion.span>
                Past Events ({archived.length})
              </button>

              <AnimatePresence>
                {showArchive && (
                  <motion.div
                    id="event-archive"
                    key="archive"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden mt-6"
                  >
                    <div className="grid grid-cols-1 opacity-60">
                      {archived.map((event) => (
                        <EventRow key={event._id} event={event} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  )
}

/* ── EventCard (featured / large) ───────────────────────────────────── */
function EventCard({ event }: { event: Event }) {
  return (
    <article
      className="p-8 lg:p-12 flex flex-col gap-5 group border border-[var(--rule)] hover:border-[rgba(165,0,16,0.5)] transition-all duration-500 relative"
      aria-label={event.title}
    >
      <div className="flex items-start justify-between gap-4">
        <DateBlock date={event.date} large />
        {event.eventType && (
          <span className={`badge ${BADGE_MAP[event.eventType] ?? 'badge-other'}`}>
            {event.eventType}
          </span>
        )}
      </div>
      <h3
        className="font-[family-name:var(--f-display)] uppercase text-[var(--warm-white)]"
        style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', lineHeight: 1.05 }}
      >
        {event.title}
      </h3>
      {event.location && (
        <p className="t-tag text-[var(--muted)]">{event.location}</p>
      )}
      {event.description && (
        <p className="font-[family-name:var(--f-body)] text-[var(--muted)]" style={{ fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 400 }}>
          {event.description}
        </p>
      )}
      {event.registrationLink && (
        <a
          href={event.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="t-tag text-[var(--garnet)] hover:text-[var(--warm-white)] transition-colors mt-auto"
          data-cursor="hover"
        >
          Register →
        </a>
      )}
    </article>
  )
}

/* ── EventRow (list view) ────────────────────────────────────────────── */
function EventRow({ event }: { event: Event }) {
  return (
    <article
      className="event-row transition-all duration-500"
      aria-label={event.title}
    >
      <DateBlock date={event.date} />
      <div className="min-w-0">
        <h3
          className="font-[family-name:var(--f-display)] uppercase text-[var(--warm-white)] truncate"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', lineHeight: 1.1 }}
        >
          {event.title}
        </h3>
        {event.location && (
          <p className="t-tag text-[var(--muted)] mt-1 truncate">{event.location}</p>
        )}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {event.eventType && (
          <span className={`badge hidden sm:inline-flex ${BADGE_MAP[event.eventType] ?? 'badge-other'}`}>
            {event.eventType}
          </span>
        )}
        {event.registrationLink && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="t-tag text-[var(--garnet)] hover:text-[var(--warm-white)] transition-colors whitespace-nowrap"
            aria-label={`Register for ${event.title}`}
            data-cursor="hover"
          >
            Register →
          </a>
        )}
      </div>
    </article>
  )
}

/* ── DateBlock ───────────────────────────────────────────────────────── */
function DateBlock({ date, large }: { date: string; large?: boolean }) {
  return (
    <div
      className="flex flex-col items-center justify-center border border-[var(--garnet)] shrink-0"
      style={{ minWidth: large ? '68px' : '52px', padding: large ? '10px 14px' : '8px 10px' }}
      aria-label={formatDate(date)}
    >
      <span className="font-[family-name:var(--f-mono)] text-[var(--garnet)]" style={{ fontSize: '0.66rem', letterSpacing: '0.12em', fontWeight: 600 }}>
        {formatMonth(date)}
      </span>
      <span
        className="font-[family-name:var(--f-display)] text-[var(--warm-white)]"
        style={{ fontSize: large ? '2.2rem' : '1.6rem', lineHeight: 1 }}
      >
        {formatDay(date)}
      </span>
    </div>
  )
}


interface EventsProps {
  upcoming: Event[]
  archived: Event[]
}

