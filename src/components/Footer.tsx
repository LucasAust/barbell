import Link from 'next/link'

interface FooterProps {
  instagramHandle?: string
  email?: string
  joinLink?: string
}

const NAV_LINKS = [
  { label: 'Events', href: '#events' },
  { label: 'News', href: '#news' },
  { label: 'Officers', href: '#officers' },
  { label: 'PR Board', href: '#pr-board' },
  { label: 'Join', href: '#join' },
]

export default function Footer({ instagramHandle, email, joinLink }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className="relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 110%, rgba(115,0,10,0.18) 0%, transparent 65%), var(--black)' }}
    >
      {/* Garnet top accent */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(165,0,16,0.7) 20%, rgba(255,80,80,0.85) 50%, rgba(165,0,16,0.7) 80%, transparent 100%)' }} />

      {/* Subtle diagonal texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(237,232,223,0.008) 60px, rgba(237,232,223,0.008) 61px)',
          opacity: 1,
        }}
      />

      <div className="wrap relative pt-24 pb-12">

        {/* Big wordmark row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-16 border-b border-[var(--rule)]">
          <div>
            <p
              className="font-[family-name:var(--f-display)] uppercase leading-none mb-3"
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                letterSpacing: '-0.02em',
                textShadow: '2px 2px 0 #3a0004, 4px 4px 0 #220003, 6px 6px 12px rgba(0,0,0,0.8)',
                color: 'var(--warm-white)',
              }}
            >
              Gamecock{' '}
              <span style={{ color: 'var(--garnet)' }}>Barbell</span>
            </p>
            <p
              className="font-[family-name:var(--f-body)] text-[var(--muted)]"
              style={{ fontSize: '0.95rem', lineHeight: 1.65, maxWidth: '44ch', fontWeight: 400 }}
            >
              USC&rsquo;s competitive powerlifting club — USAPL sanctioned, open to all experience levels.
            </p>
          </div>

          {joinLink && (
            <a
              href={joinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mag-btn shrink-0 self-start md:self-auto"
              style={{
                ['--btn-bg' as string]: 'var(--garnet)',
                ['--btn-fg' as string]: 'var(--warm-white)',
                ['--btn-hover-bg' as string]: 'var(--warm-white)',
                ['--btn-hover-fg' as string]: 'var(--black)',
              } as React.CSSProperties}
              data-cursor="hover"
            >
              Join the Club
            </a>
          )}
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-16">

          {/* Navigate */}
          <nav aria-label="Footer navigation">
            <div className="flex items-center gap-2 mb-6">
              <span className="block w-4 h-px bg-[var(--garnet)]" aria-hidden="true" />
              <p className="t-tag text-[rgba(237,232,223,0.5)] uppercase" style={{ letterSpacing: '0.14em' }}>Navigate</p>
            </div>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-[family-name:var(--f-body)] text-[var(--muted)] hover:text-[var(--warm-white)] transition-colors duration-200"
                    style={{ fontSize: '0.93rem', fontWeight: 500 }}
                    data-cursor="hover"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="block w-4 h-px bg-[var(--garnet)]" aria-hidden="true" />
              <p className="t-tag text-[rgba(237,232,223,0.5)] uppercase" style={{ letterSpacing: '0.14em' }}>Connect</p>
            </div>
            <div className="flex flex-col gap-3">
              {instagramHandle && (
                <a
                  href={`https://instagram.com/${instagramHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--f-body)] text-[var(--muted)] hover:text-[var(--warm-white)] transition-colors duration-200"
                  style={{ fontSize: '0.93rem', fontWeight: 500 }}
                  aria-label={`Instagram @${instagramHandle}`}
                  data-cursor="hover"
                >
                  @{instagramHandle}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="font-[family-name:var(--f-body)] text-[var(--muted)] hover:text-[var(--warm-white)] transition-colors duration-200"
                  style={{ fontSize: '0.93rem', fontWeight: 500 }}
                  data-cursor="hover"
                >
                  {email}
                </a>
              )}
            </div>
          </div>

          {/* Location / affiliation */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="block w-4 h-px bg-[var(--garnet)]" aria-hidden="true" />
              <p className="t-tag text-[rgba(237,232,223,0.5)] uppercase" style={{ letterSpacing: '0.14em' }}>Where</p>
            </div>
            <div className="flex flex-col gap-2">
              {[
                'Columbia, SC',
                'University of South Carolina',
                'USAPL Affiliated',
              ].map((line) => (
                <p key={line} className="font-[family-name:var(--f-body)] text-[var(--muted)]" style={{ fontSize: '0.93rem', fontWeight: 500 }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-[var(--rule)]">
          <p className="font-[family-name:var(--f-body)] text-[rgba(237,232,223,0.3)]" style={{ fontSize: '0.8rem', letterSpacing: '0.06em' }}>
            © {year} Gamecock Barbell Club · University of South Carolina
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://iqventoryllc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--f-body)] text-[rgba(237,232,223,0.55)] hover:text-[var(--warm-white)] transition-colors duration-200"
              style={{ fontSize: '0.88rem', letterSpacing: '0.06em', fontWeight: 600 }}
            >
              Powered by <span style={{ color: 'var(--garnet)' }}>Iqventory</span>
            </a>
            <a
              href="/studio"
              className="t-tag text-[rgba(237,232,223,0.18)] hover:text-[var(--muted)] transition-colors"
              aria-label="Admin login"
              data-cursor="hover"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
