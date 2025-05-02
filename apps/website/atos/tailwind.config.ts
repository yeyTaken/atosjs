import type { Config } from 'tailwindcss'
import { heroui } from '@heroui/theme'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.js',
  ],
  plugins: [heroui()],
} satisfies Config
