import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}", // Pages et layouts Next.js
    "./src/components/**/*.{ts,tsx,js,jsx}", // Composants React
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#2824FF",
          violet: "#5E24FF",
        },
        secondary: {
          blue: "#A3A0FF",
          violet: "#C3A6FF",
        },
        neutral: {
          white: "#FFFFFF",
          "light-gray": "#F5F5F5",
          "dark-gray": "#333333",
        },
      },
      screens: {
        "2xs": "320px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
