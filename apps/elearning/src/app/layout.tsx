import { Montserrat } from 'next/font/google'
import { type PropsWithChildren } from 'react'

import { Provider } from '@/components/ui'
import config from '@/lib/config'

const monserrat = Montserrat({ subsets: ['latin'] })

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang={config.lang} suppressHydrationWarning>
    <head>
      <meta name="mobile-web-app-capable" content="yes" />
    </head>
    <body className={monserrat.className}>
      <Provider>{children}</Provider>
    </body>
  </html>
)

export default RootLayout
export { metadata } from './meta'
