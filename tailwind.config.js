export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
    extend: {
      colors: {
        ...colors,
      }
    },
  },

  plugins: [
    require("tailwindcss-animate"), // ← si lo estás usando
  ],
  plugins: [],
};