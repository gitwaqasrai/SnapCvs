/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bodoni: ['"Bodoni Old Fashion Caps"', "serif"], // Add your custom font
        roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },

      colors: {
        blue: {
          400: "#4facfe",
          500: "#1e90ff",
        },
        purple: {
          500: "#9b59b6",
          400: "#ab7ac4",
        },
      },
    },
  },
  plugins: [],
};
