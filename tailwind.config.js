/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#DEDBC8",
        cream: {
          light: "#F5F4EC",
          DEFAULT: "#E1E0CC",
          dark: "#DEDBC8",
          muted: "rgba(225, 224, 204, 0.8)",
          subtle: "rgba(225, 224, 204, 0.4)",
        },
        surface: {
          black: "#000000",
          card: "#101010",
          secondary: "#212121",
          elevated: "#181818",
          border: "#282828",
        },
        brand: {
          green: "#10B981",
          emerald: "#059669",
          sky: "#38BDF8",
          amber: "#F59E0B",
          violet: "#A78BFA",
          rose: "#FB7185",
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['"Almarai"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
