const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Arial", "Segoe UI", "sans-serif"],
      },
    },
    colors: {
      transparent: "transparent",
      primary: colors.violet,
      accent: colors.pink,
      "bg-dark": colors.coolGray[800],
      "bg-light": colors.coolGray[50],
      "t-main": colors.coolGray[900],
      "t-sub": colors.coolGray[400],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
