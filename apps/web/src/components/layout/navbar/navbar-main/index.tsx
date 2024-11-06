import { withCva } from '@/lib/cva'

import { NavbarMain } from './navbar-main.components'
import { navbarMain } from './navbar-main.styles'
import type { NavbarMainProps } from './navbar-main.types'

export default withCva(NavbarMain, navbarMain)
export { NavbarMain, navbarMain, type NavbarMainProps }
