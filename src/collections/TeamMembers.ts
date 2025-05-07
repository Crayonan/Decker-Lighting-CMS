// decker-lighting-cms/src/collections/TeamMembers.ts
import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'email', 'updatedAt'],
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
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'richText', // Using richText for potentially formatted bios
    },
    {
      name: 'profilePicture',
      label: 'Profile Picture',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'specialties',
      type: 'select', // Similar to Photos tags, consider a 'Tags' collection for more complex needs
      hasMany: true,
      options: [
        // Add predefined specialties
        { label: 'Lighting Design', value: 'lighting-design' },
        { label: 'Event Production', value: 'event-production' },
        { label: 'Photography Support', value: 'photography-support' },
      ],
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
  ],
}
