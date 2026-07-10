import type { Block } from 'payload';

export const CourseGridBlock: Block = {
  slug: 'courseGrid',
  labels: {
    singular: 'Course Grid',
    plural: 'Course Grids',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Featured Music Production Courses',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Section Subheading',
    },
    {
      name: 'selectedCourses',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: true,
      label: 'Select Courses to Display (leave empty to show all for this tenant)',
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
  ],
};
