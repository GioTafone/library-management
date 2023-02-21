/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        BookFont: ["Gentium Book Basic", "serif"],
        BodyFont: ["Space Grotesk", "sans-serif"],
      },
    },
    colors: {
      primaryZinc: "#f4f4f5",
      primaryWhite: "#fafafa",
      primaryOrange: "#ff9a00",
      primaryBlue: "#1F8298",
      secondaryZinc: "#dddddd",
      primarySeaGreen: "#20B2AA",
      bookPage: "#fefbf3",
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "media",
};
