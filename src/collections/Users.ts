import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration:7200,
    maxLoginAttempts: 5,
    lockTime: 2 * 60 * 1000, // 2 minutes

    
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'createdAt'],
    listSearchableFields: ['email', 'firstName', 'lastName'],
    description: 'User accounts for the application.',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.collection === 'users') return true
      return false
    },
    create: ({ req: { user } }) => {
      if (user) return true 
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
    admin: ({ req: { user } }) => {
      return Boolean(user) 
    },
  },
  fields: [
    // {
    //   name: 'roles',
    //   type: 'select',
    //   hasMany: true,
    //   options: ['admin', 'editor'],
    //   defaultValue: ['editor'],
    // }
  ],
}
