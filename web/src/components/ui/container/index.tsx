import { withCva } from '@/lib/cva'

import { ContainerComponent } from './container.components'
import { container } from './container.styles'

export default withCva(ContainerComponent, container)
export type { ContainerProps } from './container.types'
