import type { Config } from 'tailwindcss'
import { heroui } from '@heroui/theme'

export default {
  content: [
    './node_modules/@heroui/theme/dist/components/(snippet|button|ripple|spinner|popover).js',
  ],
  plugins: [heroui()],
} satisfies Config
