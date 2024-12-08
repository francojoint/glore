'use client'

import { forwardRef } from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

import { ClientOnly, IconButton, Skeleton, type IconButtonProps } from '@chakra-ui/react'
import { ThemeProvider, useTheme, type ThemeProviderProps } from 'next-themes'

export interface ColorModeProviderProps extends ThemeProviderProps {}

export const ColorModeProvider = (props: ColorModeProviderProps) => (
  <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
)

export const useColorMode = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }
  return {
    colorMode: resolvedTheme,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export const useColorModeValue = <T,>(light: T, dark: T) => {
  const { colorMode } = useColorMode()
  return colorMode === 'light' ? light : dark
}

export const ColorModeIcon = () => {
  const { colorMode } = useColorMode()
  return colorMode === 'light' ? <LuSun /> : <LuMoon />
}

interface ColorModeButtonProps extends Omit<IconButtonProps, 'aria-label'> {}

export const ColorModeButton = forwardRef<HTMLButtonElement, ColorModeButtonProps>((props, ref) => {
  const { toggleColorMode } = useColorMode()
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
        css={{
          _icon: {
            width: '5',
            height: '5',
          },
        }}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  )
})
