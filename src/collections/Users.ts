import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    // auth: true implicitly sets up some access controls
    // verify: true, // Example: if you have email verification
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // By default, only logged-in users can read their own user doc, admins can read all.
    // create is usually admin-only or open depending on config.
    // Let's ensure admins can do everything on users for now.
    read: ({ req: { user } }) => {
      if (user?.collection === 'users') return true // Admins can read all users for simplicity now
      // Or more specific: if (user.roles.includes('admin')) return true;
      // if (req.id === user.id) return true; // Users can read their own
      return false
    },
    create: ({ req: { user } }) => {
      // Only allow admins to create other admin users typically
      if (user) return true // For now, any logged-in user can create for simplicity
      return false // Or make it more restrictive
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
      // Who can access the admin panel?
      // Example: return user?.roles?.includes('admin');
      return Boolean(user) // For now, any logged-in user can access admin
    },
  },
  fields: [
    // Email and Password fields are added by default
    // {
    //   name: 'roles',
    //   type: 'select',
    //   hasMany: true,
    //   options: ['admin', 'editor'],
    //   defaultValue: ['editor'],
    // }
  ],
}
