// decker-lighting-cms/src/globals/SiteTexts.ts
import type { GlobalConfig } from 'payload'

export const SiteTexts: GlobalConfig = {
  slug: 'site-texts',
  label: 'Site Wide Texts',
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: 'shopIntroText',
      label: 'Shop Introduction Text',
      type: 'textarea',
      localized: true, // Assuming this text might need translation
    },
    {
      name: 'teamIntroText',
      label: 'Team Introduction Text',
      type: 'textarea',
      localized: true,
    },
    // Add other global text snippets here if needed
  ],
}
