import type { CollectionConfig } from 'payload'

export const ShopPackages: CollectionConfig = {
  slug: 'shop-packages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'updatedAt'],
    description: 'Packages available for purchase in the shop.',
  },
  access: {
    read: () => true,
  },
  orderable: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'price',
      type: 'text',
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
        },
      ],
    },
    {
      name: 'whatsappLink',
      type: 'text',
      label: 'WhatsApp Inquiry Link',
    },
  ],
}
