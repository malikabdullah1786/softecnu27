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
        heading: '#173D32',
        hover: 'rgba(23, 61, 50, 0.72)',
        'logo-light-yellow': '#F2F3EB',
        'logo-maroon-dark': '#173D32',
        'logo-maroon-deep': '#07110E',
        'logo-maroon-medium': '#173D32',
        'logo-black': '#07110E',
      },
      boxShadow: {
        input: '0 0 0 0.2rem rgba(23, 61, 50, 0.25)',
      },
    },
  },
  plugins: [],
}
