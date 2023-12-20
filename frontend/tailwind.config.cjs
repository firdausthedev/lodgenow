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
