import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'clubName',
      title: 'Club Name',
      type: 'string',
      initialValue: 'Gamecock Barbell Club',
    }),
    defineField({
      name: 'tagline',
      title: 'Hero Tagline',
      type: 'string',
      initialValue: 'Lift Heavy. Compete Hard. Represent USC.',
    }),
    defineField({
      name: 'about',
      title: 'About the Club',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'aboutStats',
      title: 'Stats (shown in About section)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    }),
    defineField({
      name: 'duesAmount',
      title: 'Dues Amount',
      type: 'string',
      initialValue: '$20/semester',
    }),
    defineField({
      name: 'meetingInfo',
      title: 'Meeting Info',
      type: 'string',
      description: 'e.g. "Tuesdays & Thursdays · 6–8 PM · Strom Thurmond Wellness Center"',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'No @',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'joinLink',
      title: 'Join / Sign-up Link',
      type: 'url',
    }),
    defineField({
      name: 'showPRBoard',
      title: 'Show PR Board section',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
