import { withCva } from '@/lib/cva'

import { TemplateComponent } from './template.components'
import { template } from './template.styles'

export default withCva(TemplateComponent, template)
export type { TemplateProps } from './template.types'
