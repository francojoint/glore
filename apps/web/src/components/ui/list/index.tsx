import { withCva } from '@/lib/cva'
import type { NestedComponent } from '@/lib/types'

import { ListComponent, ListItemComponent } from './list.components'
import { list, listItem } from './list.styles'
import type { ListItemProps, ListProps } from './list.types'

const ListItem = withCva(ListItemComponent, listItem)
const ListBase = withCva(ListComponent, list)

const List = ListBase as NestedComponent<typeof ListBase, { Item: typeof ListItem }>
List.Item = ListItem

export default List
export { ListItem, type ListProps, type ListItemProps }
