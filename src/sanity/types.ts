export interface SiteSettings {
  clubName: string
  tagline: string
  about: PortableTextBlock[]
  aboutStats: Array<{ value: string; label: string }>
  duesAmount: string
  meetingInfo: string
  instagramHandle: string
  email: string
  joinLink: string
  showPRBoard: boolean
}

export interface Event {
  _id: string
  title: string
  date: string
  endDate?: string
  location?: string
  description?: string
  registrationLink?: string
  eventType?: 'competition' | 'meet' | 'practice' | 'social' | 'other'
  featured?: boolean
}

export interface Update {
  _id: string
  title: string
  publishedAt: string
  category?: 'announcement' | 'result' | 'news' | 'update'
  body?: PortableTextBlock[]
  pinned?: boolean
}

export interface Officer {
  _id: string
  name: string
  role: string
  order: number
  major?: string
  email?: string
  instagram?: string
}

export interface PRRecord {
  _id: string
  lifterName: string
  weightClass?: string
  sex?: 'M' | 'W'
  squat?: number
  bench?: number
  deadlift?: number
  total?: number
  dots?: number
  setAt?: string
  competition?: string
}

// Sanity image type (kept for potential future use)
export type SanityImage = {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
}

// Minimal portable text block type
export type PortableTextBlock = {
  _type: 'block'
  _key: string
  style?: string
  children: Array<{ _type: 'span'; _key: string; text: string; marks?: string[] }>
  markDefs?: Array<{ _type: string; _key: string; href?: string }>
}
