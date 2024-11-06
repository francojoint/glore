import { createElement } from 'react'

import type { ListItemProps, ListProps } from './list.types'

export const ListComponent = (props: ListProps) => {
  const { ordered, ...rest } = props
  return createElement(ordered ? 'ol' : 'ul', rest)
}

export const ListItemComponent = (props: ListItemProps) => <li {...props} />
