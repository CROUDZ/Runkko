import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}", // Pages et layouts Next.js
    "./src/components/**/*.{ts,tsx,js,jsx}", // Composants React
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        neutral: {
          white: "var(--neutral-white)",
          lightGray: "var(--neutral-light-gray)",
          darkGray: "var(--neutral-dark-gray)",
        },
        background: "var(--background)",
        text: "var(--text-color)",
        link: "var(--link-color)",
        button: "var(--button-color)",
        buttonHover: "var(--button-hover-color)",
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
