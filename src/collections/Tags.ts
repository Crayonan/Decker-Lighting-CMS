import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'updatedAt'],
    listSearchableFields: ['name'], // Allow searching by tag name in list view
  },
  access: {
    read: () => true, // Tags are publicly readable
    create: () => true, // Allow creating tags (you can restrict this if needed)
    update: () => true, // Allow updating tags
    delete: () => true, // Allow deleting tags
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true, // Ensure tag names are unique
      index: true, // Good for querying
      localized: true, // If tag names need to be translated
    },
    // You could add a 'slug' field here if you want URL-friendly slugs for tags,
    // otherwise Payload will use the ID for filtering.
    // {
    //   name: 'slug',
    //   type: 'text',
    //   unique: true,
    //   index: true,
    //   admin: {
    //     position: 'sidebar',
    //   },
    //   hooks: {
    //     beforeValidate: [
    //       ({ value, data }) => {
    //         if (!value && data?.name) {
    //           return data.name.toLowerCase().replace(/\s+/g, '-');
    //         }
    //         return value;
    //       }
    //     ]
    //   }
    // }
  ],
}
