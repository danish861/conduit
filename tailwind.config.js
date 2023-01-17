/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        Titillium: ["Titillium Web"],
        "source-sans-pro": ["Source Sans Pro"],
      },
      colors: {
        green: "#5cb85c",
        green_1: "rgb(61,139,61)",
        cornflower: "#8cc3ee",
        mildBlack: "#333333",
        darkGray: "#f3f3f3",
        logoutColor: "#b85c5c",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};

//...defaultTheme.fontFamily.sans
