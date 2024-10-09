/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'av-accent': '#007A7C',
        'av-accent-light': '#2CF4CE',

        'av-highlight': '#6689F7',
        'av-highlight-light': '#3737B7',

        'av-tertiary': '#f0f4f8',
        'av-tertiary-light': '#1a1a1a',

        'av-bg-primary': '#1a1a1a',
        'av-bg-primary-light': '#f0f4f8',

        'av-bg-secondary': '#252525',
        'av-bg-secondary-light': '#ffffff',

        'av-secondary': '#d4d7dd',
        'av-secondary-light': '#252525',

        'av-primary': '#f0f4f8',
        'av-primary-light': '#1a1a1a'
      }
    },
  },
  plugins: [],
}

