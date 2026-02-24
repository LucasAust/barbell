import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'oalieqsu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const officers = [
  { name: 'Malachi Quarles', role: 'President',           order: 1 },
  { name: 'Ryan Garma',      role: 'Vice President',      order: 2 },
  { name: 'Kaitlyn Williams',role: 'Secretary',           order: 3 },
  { name: 'Paige Amos',      role: 'Treasurer',           order: 4 },
  { name: 'Jess Dianda',     role: 'Social Media Chair',  order: 5 },
  { name: 'AJ Moringlane',   role: 'Powerlifting Chair',  order: 6 },
  { name: 'Nathan McCloud',  role: 'Bodybuilding Chair',  order: 7 },
  { name: 'Tony Freeman',    role: 'Weightlifting Chair', order: 8 },
]

const docs = officers.map((o) => ({
  _type: 'officer',
  name: o.name,
  role: o.role,
  order: o.order,
}))

const transaction = client.transaction()
docs.forEach((doc) => transaction.create(doc))

try {
  const result = await transaction.commit()
  console.log(`✅ Seeded ${docs.length} officers:`, result.results.map((r) => r.id))
} catch (err) {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
}
