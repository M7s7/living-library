/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: true,
  theme: {
    extend: {    
      colors: {
        primary: "white",
        secondary: "#AA0033",
        "text-base": "black",
      },
    },
  },
  plugins: [],
}
