/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        display: ["'Playfair Display'", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        accent: {
          DEFAULT: "#E8FF47",
          dark: "#C8DF2A",
        },
        "glow-cyan": "#06b6d4",
        "glow-purple": "#a855f7",
        "glow-pink": "#ec4899",
        surface: {
          DEFAULT: "rgba(255, 255, 255, 0.03)",
          light: "rgba(255, 255, 255, 0.06)",
          hover: "rgba(255, 255, 255, 0.08)",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        skeleton: "skeleton 1.5s ease-in-out infinite",
        "float-slow": "floatSlow 20s ease-in-out infinite",
        "float-mid": "floatMid 15s ease-in-out infinite",
        "float-fast": "floatFast 12s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        skeleton: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
        floatSlow: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(100px, -50px) scale(1.1)" },
          "50%": { transform: "translate(-50px, 100px) scale(0.95)" },
          "75%": { transform: "translate(80px, 50px) scale(1.05)" },
        },
        floatMid: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-80px, 60px) scale(1.08)" },
          "66%": { transform: "translate(60px, -80px) scale(0.92)" },
        },
        floatFast: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(70px, -40px) scale(1.1)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 0.8 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      backdropBlur: {
        "3xl": "64px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
