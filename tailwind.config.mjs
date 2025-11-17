/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: 'class',
  theme: {
    extend: {
		colors: {
			brandingColor: "#142934",
		}
	},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  lineHeight: {
    relaxed: "1.75",
  },
};
