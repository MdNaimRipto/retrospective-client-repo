/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#ffb66e",

          "secondary": "#f3f4f6",

          "accent": "#ea580c",

          "neutral": "#23282F",

          "base-100": "#FFFFFF",

          "info": "#4fe1de",

          "success": "#a1d75e",

          "warning": "#d3d356",

          "error": "#c026d3",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
