'use client'

import { useState } from 'react'
import TextReveal from './TextReveal'
import { FadeUp } from './MotionUtils'
import type { PRRecord } from '@/sanity/types'

interface PRBoardProps {
  records: PRRecord[]
}

type Division = 'all' | 'M' | 'W'

const COLS = ['Lifter', 'Division', 'Class', 'SQ', 'BP', 'DL', 'Total', 'DOTS', 'Meet']

export default function PRBoard({ records }: PRBoardProps) {
  const [division, setDivision] = useState<Division>('all')
  const safeRecords = records ?? []
  const filtered = division === 'all' ? safeRecords : safeRecords.filter((r) => r.sex === division)
  const isEmpty = filtered.length === 0

  return (
    <section id="pr-board" aria-labelledby="pr-heading">
      <div className="wrap">
        {/* Section header */}
        <div className="section-header">
          <TextReveal text="PR Board" as="h2" id="pr-heading" mode="chars" className="t-section text-[var(--warm-white)]" />
          <span className="section-index t-tag">05</span>
        </div>

        {/* Filter */}
        <FadeUp delay={0.1}>
          <div
            className="flex gap-6 w-fit mb-10 border-b border-[var(--rule)]"
            role="group"
            aria-label="Filter by division"
          >
            {(['all', 'M', 'W'] as Division[]).map((d) => (
              <button
                key={d}
                onClick={() => setDivision(d)}
                className={`t-tag px-1 py-3 transition-colors duration-200 border-b-2 -mb-px ${
                  division === d
                    ? 'border-[var(--garnet)] text-[var(--warm-white)]'
                    : 'border-transparent text-[var(--muted)] hover:text-[var(--warm-white)]'
                }`}
                style={{ fontSize: '0.95rem', letterSpacing: '0.08em' }}
                aria-pressed={division === d}
                data-cursor="hover"
              >
                {d === 'all' ? 'All' : d === 'M' ? 'Men' : 'Women'}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Table */}
        <FadeUp delay={0.15}>
          <div
            className="glass-card overflow-x-auto"
            tabIndex={0}
            aria-label="PR board table"
          >
            <table className="w-full border-collapse text-left" role="table">
              <thead>
                <tr className="border-b border-[var(--rule)]">
                  {COLS.map((col) => (
                    <th
                      key={col}
                      className="font-[family-name:var(--f-body)] text-[var(--stone)] px-6 py-5 whitespace-nowrap uppercase"
                      style={{ fontSize: '0.78rem', letterSpacing: '0.12em', fontWeight: 700 }}
                      scope="col"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                  {!isEmpty && filtered.map((r, i) => (
                  <tr
                    key={r._id}
                    className={`border-b border-[rgba(196,189,180,0.1)] hover:bg-[rgba(255,255,255,0.03)] transition-colors duration-200 ${
                      i === 0 && division !== 'all' ? 'ring-1 ring-inset ring-[rgba(212,0,26,0.4)]' : ''
                    }`}
                  >
                    <td className="px-6 py-5 font-[family-name:var(--f-display)] uppercase text-[rgba(237,232,223,0.95)] whitespace-nowrap" style={{ fontSize: '1rem', letterSpacing: '0.02em' }}>
                      {i === 0 && (
                        <span className="inline-block mr-2 text-[var(--garnet-text)]" aria-label="Top lifter">#1 </span>
                      )}
                      {r.lifterName}
                    </td>
                    <td className="px-6 py-5 t-tag text-[rgba(210,203,193,0.85)]">
                      {r.sex === 'M' ? 'Men' : r.sex === 'W' ? 'Women' : '—'}
                    </td>
                    <td className="px-6 py-5 t-tag text-[rgba(210,203,193,0.85)]">{r.weightClass || '—'}</td>
                    <Kg val={r.squat} />
                    <Kg val={r.bench} />
                    <Kg val={r.deadlift} />
                    <td className="px-6 py-5 font-[family-name:var(--f-display)] text-[#C8A96E] whitespace-nowrap" style={{ fontSize: '1rem' }}>
                      {r.total ?? '—'}
                    </td>
                    <td className="px-6 py-5 font-[family-name:var(--f-mono)] text-[rgba(237,232,223,0.95)]" style={{ fontSize: '0.9rem' }}>
                      {r.dots ? r.dots.toFixed(1) : '—'}
                    </td>
                    <td className="px-6 py-5 text-[rgba(199,192,184,0.85)] max-w-[180px] truncate font-[family-name:var(--f-body)]" style={{ fontSize: '0.88rem', fontWeight: 400 }} title={r.competition}>
                      {r.competition || '—'}
                    </td>
                  </tr>
                ))}

                {isEmpty && (
                  <tr className="border-b border-[rgba(196,189,180,0.14)]">
                    <td colSpan={9} className="px-6 py-14 text-center">
                      <p className="font-[family-name:var(--f-body)] text-[var(--garnet)] uppercase mb-4" style={{ fontSize: 'clamp(1.35rem, 2.4vw, 1.95rem)', letterSpacing: '0.06em', lineHeight: 1.05, fontWeight: 700 }}>
                        PR Board Is Active
                      </p>
                      <p className="font-[family-name:var(--f-body)] text-[rgba(232,226,216,0.96)]" style={{ fontSize: 'clamp(1.22rem, 2vw, 1.5rem)', lineHeight: 1.75, fontWeight: 400 }}>
                        Records will appear here once lifter PRs are published.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mt-8 font-[family-name:var(--f-body)] text-[rgba(199,192,184,0.92)] uppercase" style={{ fontSize: '0.95rem', letterSpacing: '0.08em', fontWeight: 600 }}>
            All weights in kg · Ranked by DOTS score
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

function Kg({ val }: { val?: number }) {
  return (
    <td className="px-6 py-5 font-[family-name:var(--f-mono)] text-[rgba(237,232,223,0.92)] whitespace-nowrap" style={{ fontSize: '0.9rem' }}>
      {val ? val : <span className="text-[rgba(199,192,184,0.82)]">—</span>}
    </td>
  )
}

