import { type Metadata } from 'next'

import config from '@/lib/config'

const { description, email, image, meta, partner, phone, slogan, title, url } = config

export const metadata: Metadata = {
  title: `${title} - ${slogan}`,
  appleWebApp: {
    title,
    startupImage: '/apple-splash.png',
    statusBarStyle: 'black-translucent',
  },
  applicationName: title,
  openGraph: {
    title: `${title} - ${slogan}`,
    description,
    emails: email,
    phoneNumbers: phone,
    siteName: title,
    locale: 'it_IT',
    alternateLocale: 'en_US',
    images: image,
    url,
    countryName: 'Italy',
    ttl: 60,
  },
  authors: partner,
  creator: partner.name,
  icons: [
    {
      url: '/favicon-48x48.png',
      type: 'image/png',
      sizes: '48x48',
    },
    {
      url: '/favicon.svg',
      type: 'image/svg+xml',
    },
    {
      url: '/favicon.ico',
      rel: 'shortcut icon',
    },
    {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      rel: 'apple-touch-icon',
    },
  ],
  manifest: '/manifest.webmanifest',
  category: 'Shopping',
  ...meta,
}
