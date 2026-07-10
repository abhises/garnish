import type { Block } from 'payload';

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Sub-badge / City Tag',
      defaultValue: 'Garnish Academy',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Main Heading',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading / Description',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background / Featured Image',
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Action Buttons',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary Accent', value: 'primary' },
            { label: 'Secondary / Outline', value: 'secondary' },
          ],
        },
      ],
    },
  ],
};
