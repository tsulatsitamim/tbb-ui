/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5867dd',
        secondary: '#e4e6ef',
        success: '#1bc5bd',
        danger: '#f64e60',
        warning: '#ffa800',
        info: '#8950fc',
        dark: '#181c32',
        light: '#f3f6f9',
        muted: '#b5b5c3'
      },
    },
  },
  plugins: [],
}
