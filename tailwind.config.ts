import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
    },
    extend: {
      colors: {
        gray: {
          50: '#F9FAFB',
          100: '#F5F5F5',
          200: '#EAECF0',
          300: '#D0D5DD',
          600: '#667085',
          700: '#475467',
          800: '#344054',
          900: '#101828',
        },
        purple: {
          300: '#D6BBFB',
          500: '#7F56D9',
          600: '#6941C6',
        },
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
