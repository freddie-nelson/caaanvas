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

      colors: {
        primaryColor: colors.violet,
        accentColor: colors.pink,
        primaryColorDark: colors.orange,
        accentColorDark: colors.yellow,

        primary: {
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
        },
        accent: {
          100: "var(--accent-100)",
          200: "var(--accent-200)",
          300: "var(--accent-300)",
          400: "var(--accent-400)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          700: "var(--accent-700)",
          800: "var(--accent-800)",
          900: "var(--accent-900)",
        },

        transparent: "transparent",
        danger: colors.red,
        success: colors.green,

        coolGray: colors.coolGray,
        warmGray: colors.warmGray,

        "bg-dark": "var(--bg-dark)",
        "bg-light": "var(--bg-light)",
        "t-main": "var(--t-main)",
        "t-sub": "var(--t-sub)",
        "b-light": "var(--b-light)",
        "b-dark": "var(--b-dark)",
        "b-highlight": "var(--b-highlight)",
        "b-light-dark": "var(--b-light-dark)",
        "b-dark-dark": "var(--b-dark-dark)",
        "b-highlight-dark": "var(--b-highlight-dark)",
        "input-focus": "var(--input-focus)",
        "input-blur": "var(--input-blur)",
        "input-light": "var(--input-light)",
        "input-focus-dark": "var(--input-focus-dark)",
        "input-blur-dark": "var(--input-blur-dark)",
        "input-light-dark": "var(--input-light-dark)",
      },

      borderWidth: ["hover", "focus"],

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },

      boxShadow: {
        highlight: `0px 0px 0px .3rem inset var(--bg-dark)`,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
