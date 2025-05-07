import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'updatedAt'],
    listSearchableFields: ['name'],
    description: 'Tags to categorize photos.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
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
