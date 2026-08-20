export const designTokens = {
  typography: {
    fontFamily: {
      sans: "'Poppins', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    },
    fontSize: {
      xs: 'clamp(0.7rem, 0.65rem + 0.25vw, 0.75rem)',    // 11.2px -> 12px
      sm: 'clamp(0.8rem, 0.75rem + 0.25vw, 0.875rem)',  // 12.8px -> 14px
      md: 'clamp(0.9rem, 0.85rem + 0.35vw, 1rem)',      // 14.4px -> 16px
      lg: 'clamp(1rem, 0.95rem + 0.45vw, 1.125rem)',    // 16px -> 18px
      xl: 'clamp(1.1rem, 1.05rem + 0.5vw, 1.25rem)',    // 17.6px -> 20px
      '2xl': 'clamp(1.25rem, 1.15rem + 0.75vw, 1.5rem)',// 20px -> 24px
      '3xl': 'clamp(1.5rem, 1.35rem + 1vw, 1.875rem)',  // 24px -> 30px
      '4xl': 'clamp(1.85rem, 1.6rem + 1.25vw, 2.25rem)',// 29.6px -> 36px
      '5xl': 'clamp(2.25rem, 1.85rem + 2vw, 3rem)',     // 36px -> 48px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },
  spacing: {
    '0': '0px',
    '1': '0.25rem',  // 4px
    '2': '0.5rem',   // 8px
    '3': '0.75rem',  // 12px
    '4': '1rem',      // 16px
    '5': '1.25rem',  // 20px
    '6': '1.5rem',   // 24px
    '8': '2rem',      // 32px
    '10': '2.5rem',  // 40px
    '12': '3rem',    // 48px
    '16': '4rem',    // 64px
    '20': '5rem',    // 80px
  },
  borderRadius: {
    none: '0px',
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 25px -5px rgba(99, 102, 241, 0.4)',
    none: 'none',
  },
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1920px',
    '4k': '2560px',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    backdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
    toast: 1700,
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
  opacity: {
    disabled: '0.5',
    hover: '0.85',
    focus: '0.95',
  },
  iconSize: {
    xs: '14px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
} as const;

export type DesignTokens = typeof designTokens;
