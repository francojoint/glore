import './globals.css'

import type { PropsWithChildren } from 'react'
import { Montserrat } from 'next/font/google'

import config from '@shared/config'

import Navbar from '@/components/layout/navbar'

const monserrat = Montserrat({ subsets: ['latin'] })

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang={config.lang}>
    <head>
      <meta name="mobile-web-app-capable" content="yes" />
    </head>
    <body className={monserrat.className}>
      <Navbar />
      {children}
    </body>
  </html>
)

export default RootLayout
export { metadata } from './meta'
