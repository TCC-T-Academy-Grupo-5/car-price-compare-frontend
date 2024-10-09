/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'accent': '#007A7C',
        'highlight': '#3737B7',
        'primary': '#1a1a1a',
        'secondary': '#252525',
        'tertiary': '#4a4a4a',

        'accent-light': '#2CF4CE',
        'highlight-light': '#6689F7',
        'primary-light': '#f0f4f8',
        'secondary-light': '#d4d7dd',
        'tertiary-light': '#84878d'
      }
    },
  },
  plugins: [],
}

