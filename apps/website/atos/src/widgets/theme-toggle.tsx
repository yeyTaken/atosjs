'use client'

import { Toggle } from '@/components/ui/toggle'
import clsx from 'clsx'
import { useTheme } from 'nextra-theme-docs'
import { useCallback } from 'react'

export default function ThemeToggle({
  className,
}: {
  className?: string
}) {
  const { setTheme, theme } = useTheme()

  const changeTheme = useCallback(() => {
    if (theme === 'dark') {
      setTheme('light')
    }
    else {
      setTheme('dark')
    }
  }, [setTheme, theme])

  return (
    <Toggle
      size="sm"
      className={clsx([
        'cursor-pointer',
        className,
      ])}
      onClick={changeTheme}
    >
      <span className="icon-[ri--sun-fill] dark:icon-[ri--moon-clear-fill]"></span>
    </Toggle>
  )
}
