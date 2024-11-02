import cva from '@/lib/cva'

export const box = cva('', {
  variants: {
    margin: { 0: 'm-0', 2: 'm-2', 4: 'm-4', 8: 'm-8' },
    padding: { 0: 'p-0', 2: 'p-2', 4: 'p-4', 8: 'p-8' },
  },
  defaultVariants: {
    margin: 0,
    padding: 0,
  },
})
