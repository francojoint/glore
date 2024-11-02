import { cva, type VariantProps } from 'class-variance-authority'
import type { ClassProp } from 'class-variance-authority/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import filterDOMProps from '@/lib/filter-dom-props'
import type { Component } from '@/lib/types'

export { cva }

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const withCva = <
  T extends Record<string, any>,
  U extends React.HTMLAttributes<HTMLElement>,
  K extends (props?: ClassProp | undefined) => string,
>(
  Component: Component<U>,
  style: K,
) => {
  const CvaComponent: React.FunctionComponent<U & VariantProps<K>> | T = (props: U & VariantProps<K>) => {
    const className = cn(style(props as ClassProp), props.className)
    return (
      <Component {...filterDOMProps(props)} className={className}>
        {props.children}
      </Component>
    )
  }
  return CvaComponent
}
