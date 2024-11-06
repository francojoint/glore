import { Container, List, Nav } from '@/components/ui'

import type { NavbarTopProps } from './navbar-top.types'

export const NavbarTop = (props: NavbarTopProps) => (
  <Nav {...props}>
    <Container flex justify="between" align="center">
      <List flex>
        <List.Item>{'Ciao'}</List.Item>
        <List.Item>{'Ciao'}</List.Item>
      </List>
      <List>
        <List.Item>{'Ciao'}</List.Item>
      </List>
    </Container>
  </Nav>
)
