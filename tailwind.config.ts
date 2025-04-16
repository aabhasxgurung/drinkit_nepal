import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        wine: {
          DEFAULT: "#7B0323",
          light: "#95203F",
          dark: "#600219",
          50: "#fef2f4",
          100: "#fde6ea",
          200: "#fbd0d9",
          300: "#f7aabb",
          400: "#f27a97",
          500: "#e54d70",
          600: "#d12a52",
          700: "#b01d40",
          800: "#911a38",
          900: "#7B0323",
          950: "#4a0012",
        },
      },
      fontFamily: {
        serif: ["var(--font-dm-serif-display)"],
        trajan: ["var(--font-trajan)", "serif"],
        league: ["var(--font-league-spartan)"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "San Francisco",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
