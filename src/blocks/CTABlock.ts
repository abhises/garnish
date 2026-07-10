import type { Block } from 'payload';

export const CTABlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      required: true,
      defaultValue: 'Enroll Now',
    },
    {
      name: 'buttonUrl',
      type: 'text',
      required: true,
      defaultValue: '/contact',
    },
    {
      name: 'theme',
      type: 'select',
      defaultValue: 'accent',
      options: [
        { label: 'Primary Accent Box', value: 'accent' },
        { label: 'Dark Slate Box', value: 'dark' },
        { label: 'Light Border Box', value: 'light' },
      ],
    },
  ],
};
