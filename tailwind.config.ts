/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",         // ✅ Needed for App Router files like layout.tsx, page.tsx, etc.
    "./components/**/*.{js,ts,jsx,tsx}",  // ✅ Local shared components
    "./lib/**/*.{js,ts,jsx,tsx}",         // ✅ If you use Tailwind in utility functions/components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
