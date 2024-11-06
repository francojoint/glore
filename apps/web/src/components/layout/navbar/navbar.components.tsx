import Header from '@/components/ui/header'

import NavbarTop from './navbar-top'
import type { NavbarProps } from './navbar.types'

export const Navbar = (props: NavbarProps) => (
  <Header {...props}>
    <NavbarTop />
  </Header>
)
