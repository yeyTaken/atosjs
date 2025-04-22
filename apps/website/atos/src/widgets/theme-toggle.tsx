'use client'

import { Toggle } from '@/components/ui/toggle'
import clsx from 'clsx'
import { useTheme } from 'nextra-theme-docs'
import { useCallback } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa' // Importando os ícones

export default function ThemeToggle({
  className,
}: {
  className?: string
}) {
  const { setTheme, theme } = useTheme()

  const changeTheme = useCallback(() => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
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
      {theme === 'dark' ? (
        <FaSun /> // Ícone de Sol para o tema claro
      ) : (
        <FaMoon /> // Ícone de Lua para o tema escuro
      )}
    </Toggle>
  )
}
