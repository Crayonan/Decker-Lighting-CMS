// decker-lighting-cms/src/collections/Photos.ts
import type { CollectionConfig } from 'payload'

export const Photos: CollectionConfig = {
  slug: 'photos',
  admin: {
    /* ... */
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      // Explicitly allow create if user is logged in
      if (user) {
        // You can add role checks here if needed, e.g., user.roles.includes('admin')
        return true
      }
      return false
    },
    update: ({ req: { user } }) => {
      // Good to add update and delete too
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
      relationTo: 'tags', // Relate to the new 'tags' collection
      hasMany: true,
    },
  ],
}
