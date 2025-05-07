import type { CollectionConfig } from 'payload'

export const Photos: CollectionConfig = {
  slug: 'photos',
  admin: {
    useAsTitle: 'image',
    defaultColumns: ['image', 'description', 'tags', 'createdAt'],
    listSearchableFields: ['description'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      if (user) {
        return true
      }
      return false
    },
    update: ({ req: { user } }) => {
      if (user) return true
      return false
    },
    delete: ({ req: { user } }) => {
      if (user) return true
      return false
    },
  },

  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description (Optional)',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
  ],
}
