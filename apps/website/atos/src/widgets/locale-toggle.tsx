'use client'

import { Toggle } from '@/components/ui/toggle'
import { useLocale } from '@/hooks'
import clsx from 'clsx'
import { addBasePath } from 'next/dist/client/add-base-path'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000

export default function LocaleToggle({
  className,
}: {
  className?: string
}) {
  const { currentLocale } = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const forceHideBanner = useCallback(() => {
    const banner = document.querySelector('.nextra-banner')
    if (!banner) {
      return
    }

    const isBannerDismissed = localStorage.getItem('starter-banner')
    if (isBannerDismissed) {
      banner.classList.add('x:hidden')
    }
  }, [])

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        forceHideBanner()
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
    forceHideBanner()
    return () => observer.disconnect()
  }, [forceHideBanner])

  const changeLocale = useCallback(() => {
    const currentPosition = window.scrollY
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight

    const nextHref = {
      value: '',
    }
    if (currentLocale === 'en') {
      nextHref.value = addBasePath(pathname.replace(`/en`, `/pt`))
    }
    else {
      nextHref.value = addBasePath(pathname.replace(`/pt`, `/en`))
    }

    const date = new Date(Date.now() + ONE_YEAR)
    document.cookie = `NEXT_LOCALE=${currentLocale}; expires=${date.toUTCString()}; path=/`

    router.replace(nextHref.value)

    // 在路由变化后恢复滚动位置
    requestAnimationFrame(() => {
      if (isAtBottom) {
        window.scrollTo(0, document.body.scrollHeight)
      }
      else {
        window.scrollTo(0, currentPosition)
      }
    })
  }, [currentLocale, pathname, router])

  return (
    <Toggle
      size="sm"
      className={clsx([
        'cursor-pointer',
        className,
      ])}
      onClick={changeLocale}
    >
      {
        currentLocale === 'en'
          ? <span className="text-sm">Pt</span>
          : <span className="text-sm">En</span>
      }
    </Toggle>
  )
}
