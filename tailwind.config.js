/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '430px',  // Custom breakpoint for screens smaller than 320px
        'sm': '640px',  // The default 'sm' breakpoint
        'md': '768px',  // The default 'md' breakpoint
        'lg': '1024px', // The default 'lg' breakpoint
        'xl': '1280px', // The default 'xl' breakpoint
      },
    },
  },
  plugins: [],
}