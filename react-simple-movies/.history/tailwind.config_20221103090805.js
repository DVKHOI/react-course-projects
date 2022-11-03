/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["DM Sans", "san-serif"],
      },
      colors: {
        primary: "#F62682",
      },
    },
  },
  plugins: [],
};
