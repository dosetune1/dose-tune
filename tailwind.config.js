/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#734395',
        secondary: '#444',
        'light-text': '#777',
        'shadow-color': 'rgb(186, 173, 210)',
        'dark-shadow': 'rgb(65, 65, 65)',
      },
      boxShadow: {
        'custom': '0.5rem 0.5rem 0 rgb(186, 173, 210)',
      },
      textShadow: {
        'custom': '0.4rem 0.4rem 0 rgba(85, 68, 68, 0.2)',
        'dark': '0.4rem 0.4rem 0 rgb(65, 65, 65)',
      },
    },
  },
  plugins: [],
};
