'use client'

import { motion } from 'framer-motion'
import TextReveal from './TextReveal'
import { FadeUp, Stagger, StaggerItem, itemVariants } from './MotionUtils'
import type { Update } from '@/sanity/types'

interface NewsProps {
  updates: Update[]
}

const CATEGORY_STYLES: Record<string, { dot: string; text: string }> = {
  announcement: { dot: 'bg-[var(--garnet)]', text: 'text-[var(--garnet)]' },
  result: { dot: 'bg-[#6EC88B]', text: 'text-[#6EC88B]' },
  news: { dot: 'bg-[#C8A96E]', text: 'text-[#C8A96E]' },
  update: { dot: 'bg-[var(--muted)]', text: 'text-[var(--muted)]' },
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function renderBody(body?: Update['body']): string {
  if (!body) return ''
  return body
    .filter((b) => b._type === 'block')
    .map((b) => b.children.map((c) => c.text).join(''))
    .join(' ')
    .slice(0, 180)
    .trim()
}

export default function News({ updates }: NewsProps) {
  const safeUpdates = updates ?? []
  const isEmpty = safeUpdates.length === 0

  const pinned = safeUpdates.filter((u) => u.pinned)
  const rest = safeUpdates.filter((u) => !u.pinned)

  return (
    <section id="news" aria-labelledby="news-heading">
      <div className="wrap">
        {/* Section header */}
        <div className="section-header">
          <TextReveal text="News" as="h2" id="news-heading" mode="chars" className="t-section text-[var(--warm-white)]" />
          <span className="section-index t-tag">03</span>
        </div>

        {/* Pinned — full-width featured card */}
        {pinned.length > 0 && (
          <div className="mb-px">
            {pinned.map((u, i) => (
              <motion.div
                key={u._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <UpdateCard update={u} pinned />
              </motion.div>
            ))}
          </div>
        )}

        {/* Grid */}
        {!isEmpty ? (
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--rule)]">
            {rest.map((update) => (
              <StaggerItem key={update._id} variants={itemVariants}>
                <UpdateCard update={update} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <FadeUp>
            <div className="p-12">
              <p className="font-[family-name:var(--f-display)] text-[var(--garnet)] uppercase mb-4" style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.9rem)', letterSpacing: '0.08em', lineHeight: 1 }}>
                No News Yet
              </p>
              <p className="font-[family-name:var(--f-body)] text-[rgba(237,232,223,0.86)]" style={{ fontSize: 'clamp(1.08rem, 1.8vw, 1.3rem)', lineHeight: 1.75, fontWeight: 500, maxWidth: '58ch' }}>
                This section is live and will populate automatically when updates are added.
              </p>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  )
}

function UpdateCard({ update, pinned }: { update: Update; pinned?: boolean }) {
  const body = renderBody(update.body)
  const cat = update.category || 'update'
  const catStyle = CATEGORY_STYLES[cat] ?? CATEGORY_STYLES.update

  return (
    <article
      className={`p-7 flex flex-col gap-4 hover:bg-[rgba(165,0,16,0.05)] transition-all duration-300 h-full border ${pinned ? 'border-[rgba(165,0,16,0.45)]' : 'border-transparent hover:border-[rgba(165,0,16,0.28)]'}`}
      aria-label={update.title}
    >
      {/* Meta */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${catStyle.dot}`} aria-hidden="true" />
          <span className={`t-tag ${catStyle.text} capitalize`}>{cat}</span>
        </div>
        <time dateTime={update.publishedAt} className="t-tag text-[var(--muted)]">
          {timeAgo(update.publishedAt)}
        </time>
      </div>

      {/* Title */}
      <h3
        className="font-[family-name:var(--f-display)] uppercase text-[var(--warm-white)]"
        style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', lineHeight: 1.1 }}
      >
        {update.title}
      </h3>

      {/* Body excerpt */}
      {body && (
        <p
          className="font-[family-name:var(--f-body)] text-[var(--muted)]"
          style={{ fontSize: '0.98rem', lineHeight: 1.65, fontWeight: 500 }}
        >
          {body}{body.length >= 179 ? '…' : ''}
        </p>
      )}

      {pinned && (
        <p className="t-tag text-[var(--garnet)] mt-auto" aria-label="Pinned post">
          — Pinned
        </p>
      )}
    </article>
  )
}


interface NewsProps {
  updates: Update[]
}

