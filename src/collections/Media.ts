// decker-lighting-cms/src/collections/Media.ts
import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt', // Or 'filename'
    listSearchableFields: ['filename', 'alt'],
    description: 'Upload images, videos, and other media files.',
  },
  upload: {
    // This staticDir should exist at the root of your 'decker-lighting-cms' project
    staticDir: path.resolve(dirname, '../../media'), // Resolves to <project_root>/media
    // staticURL: '/media', // This is the default if staticDir is 'media' at the root
    mimeTypes: ['image/*', 'application/pdf'],
    adminThumbnail: 'thumbnail', // Assumes 'thumbnail' is defined in imageSizes
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        // withoutEnlargement: true, // Optional: prevent upscaling
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
        // withoutEnlargement: true,
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined, // Auto-height based on aspect ratio
        position: 'centre',
        // withoutEnlargement: true,
      },
    ],
    // Ensure sharp is configured in payload.config.ts
    crop: true, // Optional: enable admin UI cropping
    focalPoint: true, // Optional: enable admin UI focal point selection
  },
  access: {
    read: () => true, // Publicly readable for now
    create: ({ req: { user } }) => Boolean(user), // Requires logged-in user
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false, // Let's keep it required as per original setup
      label: 'Alt Text (Accessibility)',
      admin: {
        description: 'Describes the image for screen readers and SEO. Required.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
    },
  ],
  hooks: {
    // NO custom hooks for now
  },
}
