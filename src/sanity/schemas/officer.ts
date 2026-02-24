import { defineField, defineType } from 'sanity'

export const officer = defineType({
  name: 'officer',
  title: 'Officer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. President = 1.',
      initialValue: 99,
    }),
    defineField({
      name: 'major',
      title: 'Major / Year',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'email',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Just the handle, no @',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
