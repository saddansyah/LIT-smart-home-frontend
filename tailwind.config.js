/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'state-pulse': 'pulse 1s ease-in-out infinite'
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
