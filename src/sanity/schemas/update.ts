import { defineField, defineType } from 'sanity'

export const update = defineType({
  name: 'update',
  title: 'News & Update',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Announcement', value: 'announcement' },
          { title: 'Result', value: 'result' },
          { title: 'News', value: 'news' },
          { title: 'Update', value: 'update' },
        ],
      },
      initialValue: 'announcement',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [{ title: 'URL', name: 'href', type: 'url' }],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'pinned',
      title: 'Pin this update',
      type: 'boolean',
      initialValue: false,
      description: 'Pinned updates appear at the top regardless of date.',
    }),
  ],
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
      category: 'category',
    },
    prepare({ title, date, category }) {
      const d = date ? new Date(date).toLocaleDateString() : ''
      return { title, subtitle: `${category} · ${d}` }
    },
  },
})
