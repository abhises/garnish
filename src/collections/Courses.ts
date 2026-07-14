import type { CollectionConfig } from 'payload';

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'tenant', 'duration', 'price'],
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
        { label: 'London (london)', value: 'london' },
        { label: 'United Kingdom (uk)', value: 'uk' },
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
      label: 'Original WordPress Post/Product ID',
      index: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Full Syllabus / Description (or HTML content)',
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Duration (e.g. 360 hours, 6 months)',
    },
    {
      name: 'price',
      type: 'text',
      label: 'Tuition / Price',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};
