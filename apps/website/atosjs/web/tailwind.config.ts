import {heroui} from '@heroui/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(snippet|button|ripple|spinner|popover).js"
  ],
  theme: {
    extend: {
      colors: {
        text: "var(--color-text)",
        paragraph: "var(--color-paragraph)",
        error: "var(--color-error)",
        paper: "var(--color-paper)",
        primary: "var(--color-primary)",
        background: "var(--color-background)",
        "primary-contrast": "var(--color-primary-contrast)",
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
