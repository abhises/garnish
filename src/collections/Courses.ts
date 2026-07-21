import type { CollectionConfig } from 'payload';
import { TENANT_OPTIONS } from './constants';

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
      options: TENANT_OPTIONS,
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
