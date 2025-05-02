import type En from '@/i18n/en'
import 'server-only'

// We enumerate all dictionaries here for better linting and TypeScript support
// We also get the default import for cleaner types
const dictionaries = {
  pt: () => import('@/i18n/pt'),
  en: () => import('@/i18n/en'),
} as const satisfies Record<string, () => Promise<{ default: typeof En }>>

export const getDictionary = async (
  locale: keyof typeof dictionaries,
): Promise<typeof En> => (await dictionaries[locale]()).default

export const getDirection = (locale: keyof typeof dictionaries) => {
  switch (locale) {
    case 'pt':
    case 'en':
    default:
      return 'ltr' as const
  }
}
