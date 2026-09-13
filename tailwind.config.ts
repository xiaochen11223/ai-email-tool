import type { Config } from "tailwindcss";

// Tailwind configuration.
// Design language: clean, Apple-like minimalism — white canvas, generous whitespace,
// dark grey text, soft shadows, 16px radii. Brand accent: deep British blue.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dce7fd",
          200: "#c0d4fc",
          300: "#94b8fa",
          400: "#6191f6",
          500: "#3d6bef",
          600: "#274be3",
          700: "#1f3ad0",
          800: "#2032a9",
          900: "#1f2f85",
        },
        ink: {
          DEFAULT: "#1d1d1f", // primary text
          soft: "#4b4b52", // secondary text
          mute: "#86868b", // tertiary text
        },
        paper: "#ffffff",
        mist: "#f5f5f7", // section background
      },
      borderRadius: {
        card: "16px",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0, 0, 0, 0.06)",
        lift: "0 12px 32px rgba(0, 0, 0, 0.10)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        prose: "46rem",
      },
    },
  },
  plugins: [],
};

export default config;
