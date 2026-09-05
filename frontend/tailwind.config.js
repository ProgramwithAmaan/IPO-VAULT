/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0a0a0a",
          card: "#111111",
          charcoal: "#141414",
          border: "#2a2a2a",
        },

        accent: {
          red: "#dc2626",
          "red-hover": "#b91c1c",
          "red-light": "#f87171",
        },

        text: {
          primary: "#ffffff",
          secondary: "#9a9a9a",
          muted: "#666666",
        },
      },

      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },

      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },

        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(220, 38, 38, 0.1)",
          },

          "50%": {
            boxShadow: "0 0 40px rgba(220, 38, 38, 0.25)",
          },
        },
      },
    },
  },

  plugins: [],
};