/** @type {import('tailwindcss').Config} */
module.exports = {
  // Paths to all of your components where Tailwind CSS classes might be used
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // Adding responsive breakpoints
      screens: {
        'xs': '480px', // Extra small devices
        'sm': '640px', // Small devices
        'md': '768px', // Medium devices
        'lg': '1024px', // Large devices
        'xl': '1280px', // Extra large devices
        '2xl': '1536px', // Extra extra large devices
      },

      // Extending colors with CSS variables
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      // Extending font sizes for more control
      fontSize: {
        'xs': '.75rem',     // Extra small text
        'sm': '.875rem',    // Small text
        'base': '1rem',     // Base text size
        'lg': '1.125rem',   // Large text
        'xl': '1.25rem',    // Extra large text
        '2xl': '1.5rem',    // 2x large text
        '3xl': '1.875rem',  // 3x large text
        '4xl': '2.25rem',   // 4x large text
        '5xl': '3rem',      // 5x large text
        '6xl': '4rem',      // 6x large text
      },
    },
  },

  // Adding Tailwind plugins for common utilities
  plugins: [
    require('@tailwindcss/forms'),    // For better form elements styling
    require('@tailwindcss/typography') // For improved typographic features
  ],
};
