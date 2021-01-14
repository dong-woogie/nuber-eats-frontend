const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
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
    },
  },
  plugins: [],
};
