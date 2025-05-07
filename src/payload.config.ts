import path from 'path'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Users } from './collections/Users' 
import { Media } from './collections/Media'
import { Photos } from './collections/Photos'
import { Tags } from './collections/Tags'
import { TeamMembers } from './collections/TeamMembers'
import { ShopPackages } from './collections/ShopPackages'
import { SiteTexts } from './globals/SiteTexts'
import CustomLogo from './components/CustomLogo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      graphics: {
        Logo: path.resolve(dirname, 'components/CustomLogo.tsx'),
        Icon: path.resolve(dirname, 'components/CustomIcon.tsx'),
      }
    }
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
    email: nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_FROM_ADDRESS || 'noreply@example.com',
      defaultFromName: process.env.SMTP_FROM_NAME || 'Decker Lighting CMS',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: (process.env.SMTP_PORT || '587') === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    }),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      addRandomSuffix: false,
      clientUploads: true,
    }),
  ],
  upload: {
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB 
    },
  },
  cors: [process.env.BACKEND_URL || '', process.env.FRONTEND_URL || ''],

  csrf: [process.env.BACKEND_URL || ''],
})
