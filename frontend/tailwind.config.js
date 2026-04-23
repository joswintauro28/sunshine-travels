/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-navy': '#0A1A2F',
        'accent-orange': '#FF8C00',
        'warm-sand': '#F5F5DC',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
