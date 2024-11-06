import { type ListItemProps } from '@/components/ui/list'

export interface NavItemProps extends ListItemProps {}

export interface NavProps extends React.HTMLAttributes<HTMLElement> {
  items?: React.ReactNode[]
}
