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
        'secondary': '#323236',
        'tertiary': '#0000007a',

        'accent-light': '#2CF4CE',
        'highlight-light': '#009aff',
        'primary-light': '#fff',
        'secondary-light': '#f2f2f7',
        'tertiary-light': '#7676804d'
      }
    },
  },
  plugins: [],
}

