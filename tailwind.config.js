/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#e11d48",

          "secondary": "#f3f4f6",

          "accent": "#ea580c",

          "neutral": "#23282F",

          "base-100": "#FFFFFF",

          "info": "#0092D6",

          "success": "#15803d",

          "warning": "#facc15",

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
