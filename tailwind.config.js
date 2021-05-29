const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Arial", "Segoe UI", "sans-serif"],
        mono: [
          "Roboto Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
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
      "b-light": colors.coolGray[400],
      "b-dark": colors.coolGray[600],
      "b-highlight": colors.purple[400],
      "input-focus": colors.coolGray[700],
      "input-blur": colors.coolGray[500],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
