/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  // darkMode: 'media',
  // ...
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        "main-font": "bebas neue"
      }
    },
  },
  plugins: [
     require('flowbite/plugin'),
  ],
}