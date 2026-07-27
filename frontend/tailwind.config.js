/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefbf6",
          100: "#d7f4e7",
          200: "#afebd0",
          300: "#7eddb3",
          400: "#4dc88f",
          500: "#24ae72",
          600: "#1b8b5c",
          700: "#176d4a",
          800: "#14553d",
          900: "#123d2f",
        },
        ink: "#0f172a",
        mist: "#f8fafc",
      },
      boxShadow: {
        glow: "0 20px 60px rgba(36, 174, 114, 0.18)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.18) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
