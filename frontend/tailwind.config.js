const { withTV } = require("tailwind-variants/transformer")

/** @type {import('tailwindcss').Config} */
module.exports = withTV({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        base: "0px -2px 4px 0px rgba(0, 0, 0, 0.12)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        instagram:
          "conic-gradient(from 0deg at 50% 50%,#eb54ee -45.66deg,#9854ee 40.61deg,#eec354 140.69deg,#ee5454 226.49deg,#eb54ee 314.34deg,#9854ee 400.61deg)",
      },
      height: {
        screen: ["100vh", "100dvh"],
      },
    },
  },
  plugins: [
    require("tailwindcss-radix-colors"),
    require("@tailwindcss/line-clamp"),
  ],
})
