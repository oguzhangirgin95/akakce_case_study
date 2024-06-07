import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Blue: "#247ec5",
        Green:"#006400"
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
