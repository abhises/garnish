import type { CollectionConfig } from 'payload';

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
  ],
};
