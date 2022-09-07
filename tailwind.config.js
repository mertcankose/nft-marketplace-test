/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-dark": "#111517",
        "pale-gray": "#eaeaea",
        "main-yellow": "#E0F96E",
        "pale-white": "#E3E4E4",
        "light-gray": "f3f3f3",
        "dark-gray": "#383636",
        "base-orange": "#EF5B0C",
        "box-gray": "#BABABA",
        "light-gray": "#E4E7EB",
      },
      lineHeight: {
        big: "5.9rem",
      },
      flex: {
        2: "2 2 0%",
      },
      width: {
        120: "26rem",
      },
      height: {
        120: "26rem",
      },
      borderRadius: {
        "4xl": "32px",
      },
    },
  },
  plugins: [],
};
