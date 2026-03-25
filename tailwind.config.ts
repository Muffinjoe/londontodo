import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff1f3',
          100: '#ffe0e5',
          200: '#ffc7d0',
          300: '#ffa0af',
          400: '#ff6681',
          500: '#ff2d58',
          600: '#ed1148',
          700: '#c8083b',
          800: '#a80a38',
          900: '#8f0d35',
        },
        ink: {
          50:  '#f6f6f7',
          100: '#e2e3e5',
          200: '#c4c6cb',
          300: '#9fa2a9',
          400: '#7b7e87',
          500: '#60636c',
          600: '#4c4e56',
          700: '#3e4047',
          800: '#35363b',
          900: '#1a1b1e',
          950: '#0d0d0f',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1a1b1e',
            a: { color: '#ed1148', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            h2: { fontFamily: 'var(--font-display)', fontWeight: '700', marginTop: '2em' },
            h3: { fontFamily: 'var(--font-display)', fontWeight: '600' },
            p:  { lineHeight: '1.8' },
            blockquote: { borderLeftColor: '#ed1148' },
          },
        },
      },
      maxWidth: {
        article: '720px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
