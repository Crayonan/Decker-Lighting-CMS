import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'email', 'updatedAt'],
    description: 'Team members and their roles.',
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
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'richText',
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
      type: 'select',
      hasMany: true,
      options: [
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
