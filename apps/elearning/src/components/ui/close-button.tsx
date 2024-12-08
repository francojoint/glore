import { forwardRef } from 'react'
import { LuX } from 'react-icons/lu'

import { IconButton as ChakraIconButton, type ButtonProps } from '@chakra-ui/react'

export type CloseButtonProps = ButtonProps

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => (
  <ChakraIconButton variant="ghost" aria-label="Close" ref={ref} {...props}>
    {props.children ?? <LuX />}
  </ChakraIconButton>
))
