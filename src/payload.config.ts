// decker-lighting-cms/src/payload.config.ts
import path from 'path'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
// Import your new collection and global configs
import { Users } from './collections/Users' // Assuming Users.ts is in src/collections
import { Media } from './collections/Media'
import { Photos } from './collections/Photos'
import { Tags } from './collections/Tags'
import { TeamMembers } from './collections/TeamMembers'
import { ShopPackages } from './collections/ShopPackages'
import { SiteTexts } from './globals/SiteTexts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug, // Use the slug from your Users collection
  },
  collections: [Users, Media, Photos, Tags, TeamMembers, ShopPackages],
  globals: [SiteTexts],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  editor: lexicalEditor({}),
  // email: nodemailerAdapter({
  //   defaultFromAddress: process.env.SMTP_FROM_ADDRESS || 'noreply@example.com',
  //   defaultFromName: process.env.SMTP_FROM_NAME || 'Decker Lighting CMS',
  //   transportOptions: {
  //     host: process.env.SMTP_HOST,
  //     port: parseInt(process.env.SMTP_PORT || '587', 10),
  //     secure: (process.env.SMTP_PORT || '587') === '465',
  //     auth: {
  //       user: process.env.SMTP_USER,
  //       pass: process.env.SMTP_PASS,
  //     },
  //   },
  // }),
  plugins: [
    // <--- Add the plugins array
    vercelBlobStorage({
      // Enabled collections
      collections: {
        media: true, // Enable Vercel Blob for the 'media' collection
        // Add other upload collections here if you have them
      },
      // Environment variable containing the Vercel Blob token
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      // Optional: Add a random suffix to filenames to prevent overwrites
      addRandomSuffix: false,
      // Optional: Set custom cache-control max-age for uploaded files
      // cacheControlMaxAge: 60 * 60 * 24 * 365, // 1 year (default)
      // RECOMMENDED FOR VERCEL: Enable client-side uploads
      // to bypass Vercel Function size limits for uploads
      clientUploads: true,
    }),
  ],
  upload: {
    limits: {
      fileSize: 15 * 1024 * 1024, // 15MB in bytes (example)
    },
  },
  cors: [
    'http://localhost:5173',
    'http://localhost:3000', // Your Vite dev server origin
    // Add any other origins you need to allow, like your deployed frontend URL later
  ],

  csrf: ['http://localhost:3000', 'http://localhost:5173'],
  // Your Vite dev server origin
  // It's also good practice to configure CSRF if you plan to use cookie-based auth from the frontend
})
