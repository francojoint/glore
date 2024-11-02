export interface Component<T extends React.HTMLAttributes<HTMLElement>> {
  (props: T): JSX.Element
}

export type NestedComponent<T, U extends Record<string, any>> = T & U
