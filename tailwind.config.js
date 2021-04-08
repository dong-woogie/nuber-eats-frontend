const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["responsive", "hover", "focus", "active"],
      textColor: ["responsive", "hover", "focus", "active"],
      opacity: ["responsive", "hover", "focus", "active"],
      transform: ["responsive", "hover", "focus", "active"],
      scale: ["responsive", "hover", "focus", "active"],
    },
  },
  plugins: [],
};
