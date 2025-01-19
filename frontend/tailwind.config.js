/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ExtraBold: ["ExtraBold", "sans-serif"],
        SemiBold: ["SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [import("daisyui")],
};
