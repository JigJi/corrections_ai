import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // course color gradients are stored as strings in lib/lmsData.ts —
    // ensure all variants used there are emitted in case Tailwind misses them
    { pattern: /^from-(rose|orange|navy|purple|pink|emerald|teal|amber|yellow|red|sky|blue|lime|green|stone|zinc|violet|fuchsia|indigo|cyan|gold)-(400|500|600|700|800)$/ },
    { pattern: /^to-(rose|orange|navy|purple|pink|emerald|teal|amber|yellow|red|sky|blue|lime|green|stone|zinc|violet|fuchsia|indigo|cyan|gold)-(400|500|600|700|800)$/ },
    { pattern: /^via-(rose|orange|navy|purple|pink|emerald|teal|amber|yellow|red|sky|blue|lime|green|stone|zinc|violet|fuchsia|indigo|cyan|gold)-(400|500|600|700|800)$/ },
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#F0F4FB",
          100: "#D6E0F0",
          200: "#A8BBDB",
          300: "#7B96C7",
          400: "#4D71B2",
          500: "#2E54A0",
          600: "#1F3F85",
          700: "#162F66",
          800: "#0F2147",
          900: "#0A1632",
          950: "#060E20",
        },
        gold: {
          50: "#FBF6E9",
          100: "#F5E8C4",
          200: "#EDD589",
          300: "#E2BE4D",
          400: "#D4A22C",
          500: "#B8861A",
          600: "#946513",
          700: "#724B11",
          800: "#523510",
          900: "#36220C",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 33, 71, 0.04), 0 4px 16px rgba(15, 33, 71, 0.06)",
        glow: "0 0 0 4px rgba(46, 84, 160, 0.12)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
