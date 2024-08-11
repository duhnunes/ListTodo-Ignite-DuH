/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    '.index.html',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  important: true,
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      boxShadow: {
        shape:
          '0px 8px 8px rgba(0 0 0 / 0.1), 0px 4px 4px rgba(0 0 0 / 0.1), 0px 2px 2px rgba(0 0 0 / 0.1), 0px 0px 0px 1px rgba(0 0 0 / 0.1), inset 0px 0px 0px 1px rgba(255 255 255 / 0.03), inset 0px 1px 0px rgba(255 255 255 / 0.03)',
        input:
          '0px 8px 8px rgba(0 0 0 / 0.1), 0px 4px 4px rgba(0 0 0 / 0.1), 0px 2px 2px rgba(0 0 0 / 0.1), 0px 0px 0px 1px rgba(0 0 0 / 0.1), -1px 2px 35px 3px rgba(0 0 0 / 0.3) inset, 0 4px 5px rgba(0 0 0 / 0.2) inset',
        code: 'inset 0px 8px 8px rgba(0 0 0 / 0.3), inset 0px 4px 4px rgba(0 0 0 / 0.2), inset 0px 2px 2px rgba(0 0 0 / 0.3), inset 0px 0px 0px 1px rgba(0 0 0 / 0.3), inset 0px 0px 0px 1px rgba(0 0 0 / 0.2), inset 0px -1px 0px rgba(0 0 0 / 0.1)',
        button:
          '0px 8px 8px rgba(0, 0, 0, 0.3), 0px 4px 4px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.3), 0px 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 0px 0px 1px rgba(0, 0, 0, 0.2), 0px -1px 0px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        blue: {
          dark: '#1E6F9F',
          light: '#4EA8DE',
        },
        purple: {
          dark: '#5E60CE',
          light: '#8284FA',
        },
        gray: {
          700: '#0D0D0D',
          600: '#1A1A1A',
          500: '#262626',
          400: '#333333',
          300: '#808080',
          200: '#D9D9D9',
          100: '#F2F2F2',
        },
        danger: '#E25858',
        black: '#000',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function addPreBlockCodeStyles({ addComponents }) {
      addComponents({
        'pre[class*="language-"], code[class*="language-"]': {
          '@apply !whitespace-break-spaces block w-[260px] sm:w-full overflow-y-auto font-mono':
            {},
        },
        'code[class*="language-"]': {
          '@apply max-h-[240px]': {},
        },
        'pre[class*="language-"]': {
          '@apply !p-0 !pl-2 !py-2': {},
        },
      })
    },
    function checkedBoxChecked({ addComponents }) {
      addComponents({
        '.checkboxCheckedCss': {
          '@apply !text-gray-300/30 line-through': {},
        },
        '.checkboxCheckedCss a': {
          '@apply !text-gray-300/30 line-through': {},
        },
        '.checkboxCheckedCss a:hover': {
          '@apply !text-gray-300/30 line-through': {},
        },
      })
    },
  ],
}
