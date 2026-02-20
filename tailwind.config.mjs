/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Legacy (keep for backward compatibility during migration)
        brandingColor: "#142934",
        // Paper-like warm palette
        primary: "#2c2c2c",
        accent: "#b85c38",
        surface: "#f8f4e9",
        paper: "#faf6ed",
        border: "#e8e0d0",
        muted: "#6b6458",
      },
      fontFamily: {
        sans: ['Atkinson', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'Cambria', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  lineHeight: {
    relaxed: "1.75",
  },
};
