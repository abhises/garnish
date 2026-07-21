import type { CollectionConfig } from 'payload';
import { TENANT_OPTIONS } from './constants';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      defaultValue: 'admin',
      options: [
        { label: 'Network Super Admin', value: 'admin' },
        { label: 'City Subdomain Editor', value: 'editor' },
      ],
      required: true,
    },
    {
      name: 'allowedTenants',
      type: 'select',
      hasMany: true,
      label: 'Allowed City Subdomains for this Editor',
      options: TENANT_OPTIONS,
    },
  ],
};
