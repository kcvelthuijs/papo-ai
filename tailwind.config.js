// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // 👈 jouw app
    './logic/base-ui/**/*.{js,ts,jsx,tsx}', // base-ui
    './exercises/exercise-ui/**/*.{js,ts,jsx,tsx}', // exercise-ui
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
