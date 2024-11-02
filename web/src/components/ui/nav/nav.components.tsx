import { List } from '@/components/ui'
import type { NavItemProps, NavProps } from './nav.types'

export const NavItemComponent = (props: NavItemProps) => <List.Item>{props.children}</List.Item>

export const NavComponent = (props: NavProps) => (
  <nav {...props}>
    <List>{props.children}</List>
  </nav>
)
