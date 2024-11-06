import { withCva } from '@/lib/cva'

import { BoxComponent } from './box.components'
import { box } from './box.styles'

export default withCva(BoxComponent, box)
export type { BoxProps } from './box.types'
