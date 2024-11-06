import './globals.css'

import { Montserrat } from 'next/font/google'
import { type PropsWithChildren } from 'react'

import { Navbar } from '@/components/layout'
import config from '@/lib/config'

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
