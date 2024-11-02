import { withCva } from '@/lib/cva'

import { Navbar } from './navbar.components'
import { navbar } from './navbar.styles'
import type { NavbarProps } from './navbar.types'

export default withCva(Navbar, navbar)
export { Navbar, navbar, type NavbarProps }
