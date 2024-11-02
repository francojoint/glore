import type { MetadataRoute } from 'next'

import config from '@shared/config'

export default () =>
  ({
    name: config.title,
    short_name: config.title,
    description: config.description,
    start_url: '/',
    display: 'standalone',
    background_color: config.colors.light,
    theme_color: config.colors.dark,
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }) satisfies MetadataRoute.Manifest
