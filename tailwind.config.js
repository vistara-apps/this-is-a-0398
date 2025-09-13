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
          DEFAULT: 'hsl(24 95% 53%)', // Warm orange for food theme
          50: 'hsl(24 95% 97%)',
          100: 'hsl(24 95% 92%)',
          200: 'hsl(24 95% 85%)',
          300: 'hsl(24 95% 75%)',
          400: 'hsl(24 95% 65%)',
          500: 'hsl(24 95% 53%)',
          600: 'hsl(24 95% 45%)',
          700: 'hsl(24 95% 35%)',
          800: 'hsl(24 95% 25%)',
          900: 'hsl(24 95% 15%)',
        },
        accent: {
          DEFAULT: 'hsl(142 76% 36%)', // Fresh green for healthy food
          50: 'hsl(142 76% 95%)',
          100: 'hsl(142 76% 90%)',
          200: 'hsl(142 76% 80%)',
          300: 'hsl(142 76% 70%)',
          400: 'hsl(142 76% 55%)',
          500: 'hsl(142 76% 36%)',
          600: 'hsl(142 76% 28%)',
          700: 'hsl(142 76% 20%)',
          800: 'hsl(142 76% 15%)',
          900: 'hsl(142 76% 10%)',
        },
        secondary: {
          DEFAULT: 'hsl(45 86% 83%)', // Warm yellow for highlights
          50: 'hsl(45 86% 97%)',
          100: 'hsl(45 86% 92%)',
          200: 'hsl(45 86% 85%)',
          300: 'hsl(45 86% 83%)',
          400: 'hsl(45 86% 75%)',
          500: 'hsl(45 86% 65%)',
          600: 'hsl(45 86% 55%)',
          700: 'hsl(45 86% 45%)',
          800: 'hsl(45 86% 35%)',
          900: 'hsl(45 86% 25%)',
        },
        background: 'hsl(40 100% 99%)', // Warm cream background
        surface: 'hsl(0 0% 100%)',
        'text-primary': 'hsl(24 20% 15%)', // Darker for better contrast
        'text-secondary': 'hsl(24 10% 45%)',
        'text-muted': 'hsl(24 8% 55%)',
        border: 'hsl(24 20% 90%)',
        success: 'hsl(142 76% 36%)',
        warning: 'hsl(45 86% 65%)',
        error: 'hsl(0 84% 60%)',
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
