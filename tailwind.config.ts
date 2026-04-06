import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 24px 80px rgba(37, 99, 235, 0.18)",
        card: "0 18px 40px rgba(15, 23, 42, 0.08)"
      },
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d9efff",
          200: "#bce3ff",
          300: "#8ed1ff",
          400: "#55b7ff",
          500: "#2495ff",
          600: "#1373f4",
          700: "#1559df",
          800: "#1849b3",
          900: "#183e8d"
        }
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(19,115,244,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(19,115,244,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;