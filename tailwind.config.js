/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(220 80% 45%)',
          50: 'hsl(220 80% 95%)',
          100: 'hsl(220 80% 90%)',
          200: 'hsl(220 80% 80%)',
          300: 'hsl(220 80% 70%)',
          400: 'hsl(220 80% 60%)',
          500: 'hsl(220 80% 45%)',
          600: 'hsl(220 80% 35%)',
          700: 'hsl(220 80% 25%)',
          800: 'hsl(220 80% 15%)',
          900: 'hsl(220 80% 10%)',
        },
        accent: {
          DEFAULT: 'hsl(140 60% 50%)',
          50: 'hsl(140 60% 95%)',
          100: 'hsl(140 60% 90%)',
          200: 'hsl(140 60% 80%)',
          300: 'hsl(140 60% 70%)',
          400: 'hsl(140 60% 60%)',
          500: 'hsl(140 60% 50%)',
          600: 'hsl(140 60% 40%)',
          700: 'hsl(140 60% 30%)',
          800: 'hsl(140 60% 20%)',
          900: 'hsl(140 60% 10%)',
        },
        background: 'hsl(220 20% 98%)',
        surface: 'hsl(0 0% 100%)',
        'text-primary': 'hsl(220 20% 15%)',
        'text-secondary': 'hsl(220 20% 40%)',
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        md: '10px',
        lg: '16px',
        xl: '24px',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '32px',
      },
      boxShadow: {
        card: '0 4px 16px hsla(220, 20%, 15%, 0.08)',
        modal: '0 12px 32px hsla(220, 20%, 15%, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 250ms cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}