/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        blue: "#262e42",
        black: "#000000",
        white: "#ffffff",
        bgcolor: "#f3f3f3",
        green: "#57bb71",
      },
    },
    fontFamily: {
      merri: ["Merriweather", "serif"],
      mont: ["Montserrat", "sans-serif"],
    },
    fontSize: {
      "1v": "1vw",
      "2v": "2vw",
      "3v": "3vw",
      "4v": "4vw",
      "5v": "5vw",
      "6v": "6vw",
      "7v": "7vw",
      "8v": "8vw",
      "9v": "9vw",
      "10v": "10vw",
    },
  },
  plugins: [],
};
