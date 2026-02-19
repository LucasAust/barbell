import { defineField, defineType } from 'sanity'

const weightClasses = [
  '52kg', '56kg', '60kg', '67.5kg', '75kg', '82.5kg',
  '90kg', '100kg', '110kg', '125kg', '140kg', '140kg+',
]

export const prRecord = defineType({
  name: 'prRecord',
  title: 'PR Record',
  type: 'document',
  fields: [
    defineField({
      name: 'lifterName',
      title: 'Lifter Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'weightClass',
      title: 'Weight Class',
      type: 'string',
      options: {
        list: weightClasses.map((wc) => ({ title: wc, value: wc })),
      },
    }),
    defineField({
      name: 'sex',
      title: 'Division',
      type: 'string',
      options: {
        list: [
          { title: 'Men', value: 'M' },
          { title: 'Women', value: 'W' },
        ],
      },
    }),
    defineField({
      name: 'squat',
      title: 'Squat (kg)',
      type: 'number',
    }),
    defineField({
      name: 'bench',
      title: 'Bench (kg)',
      type: 'number',
    }),
    defineField({
      name: 'deadlift',
      title: 'Deadlift (kg)',
      type: 'number',
    }),
    defineField({
      name: 'total',
      title: 'Total (kg)',
      type: 'number',
    }),
    defineField({
      name: 'dots',
      title: 'DOTS Score',
      type: 'number',
    }),
    defineField({
      name: 'setAt',
      title: 'Date Set',
      type: 'date',
    }),
    defineField({
      name: 'competition',
      title: 'Competition Name',
      type: 'string',
    }),
  ],
  orderings: [
    {
      title: 'DOTS Score',
      name: 'dotsDesc',
      by: [{ field: 'dots', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'lifterName',
      weightClass: 'weightClass',
      sex: 'sex',
      total: 'total',
    },
    prepare({ title, weightClass, sex, total }) {
      return {
        title,
        subtitle: `${sex || ''} ${weightClass || ''} — ${total ? total + 'kg total' : 'no total'}`,
      }
    },
  },
})
