/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // specify your project files here
  ],
  theme: {
    extend: {
      colors: {
        'dark-maroon': '#1F1D20',
        'deep-red': '#803E2F',
        'earthy-terracotta': '#A79986',
        'light-terracotta': '#D1A58B',
        'warm-brown': '#3E3D38',
      },
    },
  },
  plugins: [],
};
