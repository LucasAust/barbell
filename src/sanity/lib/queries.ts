import { groq } from 'next-sanity'

// Auto-archive cutoff: events that ended more than 30 days ago become archived
// We show: future events AND events within the last 30 days
const ARCHIVE_CUTOFF = () => {
  const d = new Date()
  d.setDate(d.getDate() - 30)
  return d.toISOString()
}

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    clubName,
    tagline,
    about,
    aboutStats,
    duesAmount,
    meetingInfo,
    instagramHandle,
    email,
    joinLink,
    showPRBoard
  }
`

export const UPCOMING_EVENTS_QUERY = groq`
  *[_type == "event" && dateTime(date) >= dateTime($cutoff)]
  | order(date asc) {
    _id,
    title,
    date,
    endDate,
    location,
    description,
    registrationLink,
    eventType,
    featured
  }
`

export const ARCHIVED_EVENTS_QUERY = groq`
  *[_type == "event" && dateTime(date) < dateTime($cutoff)]
  | order(date desc) [0...20] {
    _id,
    title,
    date,
    location,
    eventType
  }
`

export const UPDATES_QUERY = groq`
  *[_type == "update"] | order(pinned desc, publishedAt desc) [0...10] {
    _id,
    title,
    publishedAt,
    category,
    body,
    pinned
  }
`

export const OFFICERS_QUERY = groq`
  *[_type == "officer"] | order(order asc) {
    _id,
    name,
    role,
    order,
    major,
    email,
    instagram
  }
`

export const PR_RECORDS_QUERY = groq`
  *[_type == "prRecord"] | order(dots desc) {
    _id,
    lifterName,
    weightClass,
    sex,
    squat,
    bench,
    deadlift,
    total,
    dots,
    setAt,
    competition
  }
`

export function getArchiveCutoff() {
  return ARCHIVE_CUTOFF()
}
