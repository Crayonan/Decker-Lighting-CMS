import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/', // Redirect from the root path
        destination: '/admin', // Redirect to the Payload admin path
        permanent: true, // Use false for non-SEO related redirects like this
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
