export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#CEEF55',
        secondary: '#173D32',
        tertiary: '#D5A47D',
        light: '#F2F3EB',
        dark: '#07110E',
        'surface-dark': '#0b1512',
        'surface-low': '#131e1a',
        'surface-card': '#17221e',
        'surface-high': '#222c29',
        'surface-highest': '#2c3733',
        'on-surface-muted': '#c6c9b0',
        'outline-subtle': '#454936',
        heading: '#173D32',
        hover: 'rgba(23, 61, 50, 0.78)',
      },
      boxShadow: {
        input: '0 0 0 0.2rem rgba(206, 239, 85, 0.3)',
        glow: '0 0 24px rgba(206, 239, 85, 0.28)',
      },
    },
  },
  plugins: [],
}
