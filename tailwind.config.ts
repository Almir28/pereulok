import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F5F5F7",
        ink: "#1D1D1F",
        muted: "#6E6E73",
        accent: "#E11D2E",
        night: "#050810",
        "night-2": "#0A1020",
        "night-3": "#111828",
        panel: "#131C2E",
        mist: "#F0F4FF",
        "mist-soft": "#C4CFEA",
        "mist-muted": "#8A98B6",
        cobalt: "#3B82F6",
        "cobalt-soft": "#93C5FD",
        jade: "#4ADE80"
      },
      scale: {
        102: "1.02"
      },
      boxShadow: {
        card: "0 10px 30px rgba(0, 0, 0, 0.05)",
        cardHover: "0 18px 44px rgba(0, 0, 0, 0.10)",
        soft: "0 24px 70px rgba(0, 0, 0, 0.10)",
        editorial: "0 28px 90px rgba(2, 6, 23, 0.36)",
        editorialSoft: "0 18px 50px rgba(2, 6, 23, 0.22)",
        glow: "0 0 0 1px rgba(59, 130, 246, 0.16), 0 22px 60px rgba(59, 130, 246, 0.18)"
      },
      maxWidth: {
        shell: "1440px"
      },
      fontFamily: {
        sans: ["var(--font-ui)", "Inter", "Segoe UI", "sans-serif"],
        brand: ["var(--font-brand)", "Inter", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"]
      }
    }
  },
  plugins: [typography]
};

export default config;
