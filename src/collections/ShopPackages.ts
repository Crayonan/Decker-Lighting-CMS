// decker-lighting-cms/src/collections/ShopPackages.ts
import type { CollectionConfig } from 'payload'

export const ShopPackages: CollectionConfig = {
  slug: 'shop-packages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'updatedAt'],
  },
  access: {
    read: () => true, // Publicly readable
  },
  orderable: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true, // Assuming package names might need translation
    },
    {
      name: 'description',
      type: 'textarea', // Textarea for potentially longer descriptions
      localized: true,
    },
    {
      name: 'price',
      type: 'text', // Using text for price to accommodate currencies/formatting e.g., "€199 / day"
      // If it's always a number, 'number' type is also an option.
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      minRows: 1,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'whatsappLink',
      type: 'text', // URL field type can also be used if you prefer stricter validation
      label: 'WhatsApp Inquiry Link',
    },
  ],
}
