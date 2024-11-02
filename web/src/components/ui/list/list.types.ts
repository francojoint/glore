export type ListProps =
  | ({ ordered?: true } & React.HTMLAttributes<HTMLOListElement>)
  | ({ ordered?: false } & React.HTMLAttributes<HTMLUListElement>)

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {}
