import { heroui } from '@heroui/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
     "./node_modules/@heroui/theme/dist/components/(snippet|button|ripple|spinner|popover).js"
  ],
  plugins: [heroui()],
} satisfies Config;