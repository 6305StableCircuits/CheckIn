/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontSize: {
      'xs': 'var(--step--2)',
      'sm': 'var(--step--1)',
      'base': 'var(--step-0)',
      'lg': 'var(--step-1)',
      'xl': 'var(--step-2)',
      '2xl': 'var(--step-3)',
      '3xl': 'var(--step-4)',
      '4xl': 'var(--step-5)',
      '5xl': ['var(--step-6)', '1'],
      '6xl': ['var(--step-7)', '1'],
      '7xl': ['var(--step-8)', '1'],
      '8xl': ['var(--step-9)', '1'],
      '9xl': ['var(--step-10)', '1'],
    },
    extend: {
      spacing: {
        '3xs': 'var(--space-3xs)',
        '2xs': 'var(--space-2xs)',
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-s)',
        'md': 'var(--space-m)',
        'lg': 'var(--space-l)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
        '3xs-2xs': 'var(--space-3xs-2xs)',
        '2xs-xs': 'var(--space-2xs-xs)',
        'xs-sm': 'var(--space-xs-s)',
        'sm-md': 'var(--space-s-m)',
        'md-lg': 'var(--space-m-l)',
        'lg-xl': 'var(--space-l-xl)',
        'xl-2xl': 'var(--space-xl-2xl)',
        '2xl-3xl': 'var(--space-2xl-3xl)',
        '3xs-xl': 'var(--space-3xs-xl)'
      },
      boxShadow: {
        'low': 'var(--shadow-elevation-low)',
        'medium': 'var(--shadow-elevation-medium)',
        'high': 'var(--shadow-elevation-high)',
        'd-low': 'var(--dark-shadow-elevation-low)',
        'd-medium': 'var(--dark-shadow-elevation-medium)',
        'd-high': 'var(--dark-shadow-elevation-high)',
      },
    }
  },
  plugins: []
};