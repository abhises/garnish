import type { CollectionConfig } from 'payload';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'tenant', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'tenant',
      type: 'select',
      required: true,
      index: true,
      defaultValue: 'www',
      options: [
        { label: 'Main (www)', value: 'www' },
        { label: 'Los Angeles (la)', value: 'la' },
        { label: 'New York (ny)', value: 'ny' },
        { label: 'Berlin (ber)', value: 'ber' },
        { label: 'Nashville (nsh)', value: 'nsh' },
        { label: 'Tokyo (tyo)', value: 'tyo' },
        { label: 'Barcelona (bcn)', value: 'bcn' },
        { label: 'Seattle (sea)', value: 'sea' },
        { label: 'Miami (mia)', value: 'mia' },
        { label: 'Houston (hou)', value: 'hou' },
        { label: 'Sydney (syd)', value: 'syd' },
        { label: 'Lisbon (lis)', value: 'lis' },
        { label: 'San Francisco (sf)', value: 'sf' },
        { label: 'Singapore (sg)', value: 'sg' },
        { label: 'Portland (pdx)', value: 'pdx' },
      ],
    },
    {
      name: 'wpPostId',
      type: 'number',
      label: 'Original WordPress Post ID',
      index: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'htmlFallback',
      type: 'textarea',
      label: 'Raw HTML content (migrated from WordPress post_content)',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
  ],
};
