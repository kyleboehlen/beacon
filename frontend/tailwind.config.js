/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {},
  plugins: [],
  safelist: [
    // Player border colors
    'border-red-700',
    'border-green-700',
    'border-yellow-300',
    'border-blue-700',
    'border-white',
    // Player text colors
    'text-red-700',
    'text-green-700',
    'text-yellow-300',
    'text-blue-700',
    'text-white',
    // Player background colors
    'bg-red-700',
    'bg-green-700',
    'bg-yellow-300',
    'bg-blue-700',
    'bg-white',
    // Additional badge colors
    'bg-red-400',
    'bg-red-500',
    'bg-green-400',
    'bg-green-500',
    'bg-yellow-400',
    'bg-yellow-500',
  ],
}
