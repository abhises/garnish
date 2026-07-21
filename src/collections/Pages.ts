import type { CollectionConfig } from 'payload';
import { TENANT_OPTIONS } from './constants';
import { HeroBlock } from '../blocks/HeroBlock';
import { CourseGridBlock } from '../blocks/CourseGridBlock';
import { FeatureGridBlock } from '../blocks/FeatureGridBlock';
import { CTABlock } from '../blocks/CTABlock';
import { RichTextBlock } from '../blocks/RichTextBlock';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'tenant', 'updatedAt'],
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
      label: 'Original WordPress Post ID (for tracking migration)',
      index: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        CourseGridBlock,
        FeatureGridBlock,
        CTABlock,
        RichTextBlock,
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
};
