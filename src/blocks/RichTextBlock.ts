import type { Block } from 'payload';

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: {
    singular: 'Rich Text / Content Block',
    plural: 'Rich Text Blocks',
  },
  fields: [
    {
      name: 'htmlContent',
      type: 'textarea',
      label: 'HTML or Migrated WPBakery Content',
      required: true,
      maxLength: 2000000,
    },
    {
      name: 'containerWidth',
      type: 'select',
      defaultValue: 'prose',
      options: [
        { label: 'Standard Prose (max-w-4xl)', value: 'prose' },
        { label: 'Full Width', value: 'full' },
      ],
    },
  ],
};
