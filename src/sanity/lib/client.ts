import { createClient } from 'next-sanity'

function makeClient(useCdn: boolean, token?: string) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  // Only create a real client if the project ID looks valid (a-z, 0-9, dashes)
  const isValid = projectId && /^[a-z0-9-]+$/.test(projectId)
  if (!isValid) {
    return createClient({
      projectId: 'placeholder',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
    })
  }
  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn,
    token,
  })
}

export const client = makeClient(true)
export const writeClient = makeClient(false, process.env.SANITY_API_TOKEN)
