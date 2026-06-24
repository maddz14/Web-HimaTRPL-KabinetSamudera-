/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
        extend: {
                fontFamily: {
                        display: ['"Clash Display"', '"Space Grotesk"', 'sans-serif'],
                        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                colors: {
                        // Digital Ocean palette
                        abyss: '#001219',       // Deep Navy
                        deep: '#001f2e',
                        ocean: '#005F73',       // Ocean Blue
                        lagoon: '#0A9396',      // Cyan-Teal
                        cyan: {
                                DEFAULT: '#0A9396',
                                50: '#E6F7F7',
                                100: '#C1ECEC',
                                200: '#8DDDDD',
                                300: '#58CDCE',
                                400: '#2AAEAF',
                                500: '#0A9396',
                                600: '#087478',
                                700: '#065357',
                                800: '#043638',
                                900: '#021C1D',
                        },
                        sand: {
                                DEFAULT: '#E9D8A6',
                                50: '#FBF8EF',
                                100: '#F6EED9',
                                200: '#F0E3BF',
                                300: '#E9D8A6',
                                400: '#DEC478',
                                500: '#D2AF4A',
                        },
                        coral: '#EE9B00',
                        sunset: '#CA6702',
                        // shadcn tokens
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                },
                backgroundImage: {
                        'ocean-gradient': 'linear-gradient(135deg, #001219 0%, #005F73 55%, #0A9396 100%)',
                        'wave-gradient': 'linear-gradient(180deg, rgba(0,18,25,0) 0%, rgba(10,147,150,0.15) 100%)',
                        'grid-cyan': "radial-gradient(circle at 1px 1px, rgba(10,147,150,0.15) 1px, transparent 0)",
                },
                boxShadow: {
                        'glow-cyan': '0 0 40px rgba(10,147,150,0.35)',
                        'glow-sand': '0 0 40px rgba(233,216,166,0.25)',
                        'glass': '0 8px 32px 0 rgba(0, 18, 25, 0.37)',
                },
                keyframes: {
                        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
                        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
                        'float': {
                                '0%, 100%': { transform: 'translateY(0px)' },
                                '50%': { transform: 'translateY(-20px)' },
                        },
                        'wave': {
                                '0%': { transform: 'translateX(0) translateZ(0) scaleY(1)' },
                                '50%': { transform: 'translateX(-25%) translateZ(0) scaleY(0.8)' },
                                '100%': { transform: 'translateX(-50%) translateZ(0) scaleY(1)' },
                        },
                        'shimmer': {
                                '0%': { backgroundPosition: '-200% 0' },
                                '100%': { backgroundPosition: '200% 0' },
                        },
                        'blink': {
                                '0%, 50%': { opacity: '1' },
                                '51%, 100%': { opacity: '0' },
                        },
                        'pulse-glow': {
                                '0%, 100%': { boxShadow: '0 0 20px rgba(10,147,150,0.4)' },
                                '50%': { boxShadow: '0 0 40px rgba(10,147,150,0.8)' },
                        },
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'float': 'float 6s ease-in-out infinite',
                        'wave': 'wave 12s linear infinite',
                        'shimmer': 'shimmer 3s linear infinite',
                        'blink': 'blink 1s step-end infinite',
                        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                        'marquee': 'marquee 40s linear infinite',
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};
