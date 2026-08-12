import type { Config } from "tailwindcss";

// Design system: black / white / gray only. No bright colors, no gradients.
// Light and dark values map to CSS variables set in styles/globals.css so
// the same Tailwind classes work in both modes via the `dark:` variant.
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        border: "var(--color-border)",
        card: "var(--color-card)",
      },
      transitionDuration: {
        DEFAULT: "200ms", // within the 150-250ms spec range
      },
    },
  },
  plugins: [],
};

export default config;
