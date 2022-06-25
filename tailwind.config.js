/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/**/**/*.{js,jsx,ts,tsx}",
    "./components/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./components/**/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./pages/**/**/*.{js,jsx,ts,tsx}",
    "./pages/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {},
    extend: {},
  },
  plugins: [],
};