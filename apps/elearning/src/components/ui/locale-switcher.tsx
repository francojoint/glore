'use client'

import { useCallback, useMemo, useTransition } from 'react'

import { Select, type SelectProps } from '@/components/ui'
import { useLocale } from '@/hooks/use-locale'
import { type Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'

export interface LocaleSwitcherProps extends SelectProps {}

export const LocaleSwitcher = (props: LocaleSwitcherProps) => {
  const { locale, setLocale } = useLocale()
  const [isPending, startTransition] = useTransition()

  const items = useMemo(
    () => [
      {
        icon: '🌐',
        label: 'English',
        value: 'en',
      },
      {
        icon: '🇮🇹',
        label: 'Italiano',
        value: 'it',
      },
    ],
    [],
  )

  const activeItem = useMemo(() => items.find(item => item.value === locale), [items, locale])

  const onChange = useCallback(
    (locale: Locale) => {
      startTransition(async () => {
        await setLocale(locale)
      })
    },
    [setLocale],
  )

  return (
    <Select defaultValue={locale} onValueChange={onChange} {...props}>
      <Select.Trigger
        className={cn(
          'hover:bg-slate-200 rounded-sm p-2 transition-colors',
          isPending && 'pointer-events-none opacity-60',
        )}
      >
        <span>
          {activeItem?.label} {activeItem?.icon}
        </span>
      </Select.Trigger>
      <Select.Content
        align="end"
        className="bg-white min-w-[8rem] overflow-hidden rounded-sm py-1 shadow-md"
        position="popper"
      >
        {items.map(item => (
          <Select.Item
            className="data-[highlighted]:bg-slate-100 flex cursor-default items-center px-3 py-2 text-base"
            key={item.value}
            value={item.value}
          >
            <span className="text-slate-900">{item.label}</span>
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  )
}
