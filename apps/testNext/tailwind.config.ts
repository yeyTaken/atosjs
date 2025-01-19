import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "var(--color-text)",
        error: "var(--color-error)",
        paper: "var(--color-error)",
        primary: "var(--color-primary)",
        background: "var(--color-background)",
        "primary-contrast": "var(--color-primary-contrast)",
      },
    },
  },
  plugins: [],
} satisfies Config;
