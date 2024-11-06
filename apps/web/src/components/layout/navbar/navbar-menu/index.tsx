import { withCva } from '@/lib/cva'

import { NavbarMenu } from './navbar-menu.components'
import { navbarMenu } from './navbar-menu.styles'
import type { NavbarMenuProps } from './navbar-menu.types'

export default withCva(NavbarMenu, navbarMenu)
export { NavbarMenu, navbarMenu, type NavbarMenuProps }
