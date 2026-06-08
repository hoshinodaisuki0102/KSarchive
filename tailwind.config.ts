import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff8ff",
          100: "#dff1ff",
          200: "#b9e4ff",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49"
        },
        ink: {
          900: "#07111f",
          800: "#0b1727",
          700: "#13243a"
        }
      },
      boxShadow: {
        card: "0 24px 70px rgba(15, 23, 42, 0.12)",
        glow: "0 28px 90px rgba(14, 165, 233, 0.28)",
        neon: "0 0 0 1px rgba(125, 211, 252, 0.25), 0 24px 90px rgba(14, 165, 233, 0.28)",
        deep: "0 30px 90px rgba(2, 8, 23, 0.38)"
      },
      backgroundImage: {
        "mesh-light": "radial-gradient(circle at 12% 12%, rgba(56,189,248,.35), transparent 28%), radial-gradient(circle at 82% 8%, rgba(99,102,241,.22), transparent 24%), radial-gradient(circle at 55% 88%, rgba(20,184,166,.16), transparent 25%), linear-gradient(180deg, #f8fbff 0%, #eef7ff 44%, #ffffff 100%)",
        "mesh-dark": "radial-gradient(circle at top left, rgba(14,165,233,.33), transparent 32%), radial-gradient(circle at top right, rgba(99,102,241,.28), transparent 28%), linear-gradient(135deg, #07111f 0%, #0b1727 54%, #10243f 100%)",
        "grid-fade": "linear-gradient(rgba(14,165,233,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,.08) 1px, transparent 1px)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSoft: "pulseSoft 3.8s ease-in-out infinite",
        shimmer: "shimmer 2.8s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        }
      }
    }
  },
  plugins: []
};

export default config;
