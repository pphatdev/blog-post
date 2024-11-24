import type { Config } from 'tailwindcss'

export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.tsx",
    "./resources/**/**/*.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

