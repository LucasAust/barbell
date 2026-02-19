import { Suspense } from 'react'
import { client } from '@/sanity/lib/client'
import {
  SITE_SETTINGS_QUERY,
  UPCOMING_EVENTS_QUERY,
  ARCHIVED_EVENTS_QUERY,
  UPDATES_QUERY,
  OFFICERS_QUERY,
  PR_RECORDS_QUERY,
  getArchiveCutoff,
} from '@/sanity/lib/queries'
import type {
  SiteSettings,
  Event,
  Update,
  Officer,
  PRRecord,
} from '@/sanity/types'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Events from '@/components/Events'
import News from '@/components/News'
import Officers from '@/components/Officers'
import PRBoard from '@/components/PRBoard'
import Join from '@/components/Join'
import Footer from '@/components/Footer'
import {
  EventsSkeleton,
  NewsSkeleton,
  OfficersSkeleton,
} from '@/components/Skeletons'

// ISR: revalidate every 60 seconds
export const revalidate = 60

async function getData() {
  // Don't attempt Sanity fetches if no valid project ID is configured
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId || !/^[a-z0-9-]+$/.test(projectId)) {
    return {
      settings: null,
      upcoming: [] as Event[],
      archived: [] as Event[],
      updates: [] as Update[],
      officers: [] as Officer[],
      prRecords: [] as PRRecord[],
    }
  }

  const cutoff = getArchiveCutoff()

  try {
    const [settings, upcoming, archived, updates, officers, prRecords] =
      await Promise.all([
        client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
        client.fetch<Event[]>(UPCOMING_EVENTS_QUERY, { cutoff }),
        client.fetch<Event[]>(ARCHIVED_EVENTS_QUERY, { cutoff }),
        client.fetch<Update[]>(UPDATES_QUERY),
        client.fetch<Officer[]>(OFFICERS_QUERY),
        client.fetch<PRRecord[]>(PR_RECORDS_QUERY),
      ])

    return { settings, upcoming: upcoming ?? [], archived: archived ?? [], updates: updates ?? [], officers: officers ?? [], prRecords: prRecords ?? [] }
  } catch {
    return {
      settings: null,
      upcoming: [] as Event[],
      archived: [] as Event[],
      updates: [] as Update[],
      officers: [] as Officer[],
      prRecords: [] as PRRecord[],
    }
  }
}

export default async function Home() {
  const { settings, upcoming, archived, updates, officers, prRecords } =
    await getData()

  const aboutText = settings?.about
    ? settings.about
        .filter((b) => b._type === 'block')
        .map((b) => b.children.map((c) => c.text).join(''))
        .join(' ')
    : undefined

  return (
    <>
      <Navigation />

      {/* Skip to main content — accessibility */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-[#73000A] focus:text-[#F0EBE1] focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest"
      >
        Skip to main content
      </a>

      <main id="main-content">
        <Hero tagline={settings?.tagline} />

        <About
          aboutText={aboutText}
          stats={settings?.aboutStats}
          meetingInfo={settings?.meetingInfo}
        />

        <Suspense fallback={<EventsSkeleton />}>
          <Events upcoming={upcoming ?? []} archived={archived ?? []} />
        </Suspense>

        <Suspense fallback={<NewsSkeleton />}>
          <News updates={updates ?? []} />
        </Suspense>

        <Suspense fallback={<OfficersSkeleton />}>
          <Officers officers={officers ?? []} />
        </Suspense>

        <PRBoard records={prRecords ?? []} />

        <Join
          duesAmount={settings?.duesAmount}
          meetingInfo={settings?.meetingInfo}
          joinLink={settings?.joinLink}
          email={settings?.email}
          instagramHandle={settings?.instagramHandle}
        />
      </main>

      <Footer
        instagramHandle={settings?.instagramHandle}
        email={settings?.email}
        joinLink={settings?.joinLink}
      />
    </>
  )
}
