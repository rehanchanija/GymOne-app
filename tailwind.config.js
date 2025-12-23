/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0f1115',
        card: '#151821',
        text: '#e5e7eb',
        muted: '#9ca3af',
        accent: {
          green: '#22c55e',
          orange: '#f59e0b',
        },
      },
      borderRadius: {
        xl: '16px',
      },
    },
  },
  plugins: [],
}
