import type { GlobalConfig } from 'payload'

export const SiteTexts: GlobalConfig = {
  slug: 'site-texts',
  admin: {
    description: 'Change the Shop and Team introduction texts.',
  },
  label: 'Site Wide Texts',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'shopIntroText',
      label: 'Shop Introduction Text',
      type: 'textarea',
    },
    {
      name: 'teamIntroText',
      label: 'Team Introduction Text',
      type: 'textarea',
    },
  ],
}
