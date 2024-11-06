import { withCva } from '@/lib/cva'
import { type NestedComponent } from '@/lib/types'

import { NavComponent, NavItemComponent } from './nav.components'
import { nav, navItem } from './nav.styles'
import type { NavItemProps, NavProps } from './nav.types'

const NavItem = withCva(NavItemComponent, navItem)
const NavBase = withCva(NavComponent, nav)

const Nav = NavBase as NestedComponent<typeof NavBase, { Item: typeof NavItem }>

Nav.Item = NavItem

export default Nav
export { NavItem, type NavProps, type NavItemProps }
