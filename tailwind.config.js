/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#030213",
        accent: "#155dfc",
        accentDeep: "#1c398e",
        paper: "#ffffff",
        mist: "#f3f3f5",
        line: "#e9ebef",
        subtle: "#717182",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      maxWidth: {
        prose: "70ch",
      },
    },
  },
  plugins: [],
};
