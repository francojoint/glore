import { withCva } from '@/lib/cva'

import { HeaderComponent } from './header.components'
import { header } from './header.styles'

export default withCva(HeaderComponent, header)
export type { HeaderProps } from './header.types'
