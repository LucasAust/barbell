'use client'

import dynamic from 'next/dynamic'

// Lazy-load the entire studio (including sanity.config) so neither
// NextStudio nor the config are ever evaluated during SSR.
const StudioClient = dynamic(() => import('./StudioClient'), { ssr: false })

export default function StudioPage() {
  return <StudioClient />
}
