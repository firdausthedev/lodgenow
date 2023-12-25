/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": { max: "1475px" },
        xl: { max: "1201px" },
        lg: { max: "995px" },
        md: { max: "768px" },
        sm: { max: "640px" },
      },
      colors: {
        accent: {
          DEFAULT: "#FF385C",
          100: "#CC566B",
          200: "#995F6A",
          600: "#665457",
          700: "#33282A",
        },
        brown: { 200: "#f0efe9" },
        loadingGray: "#EBEBEB",
      },
      fontFamily: {
        primary: ["Anek Telugu", "sans-serif"],
        secondary: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
