export const lightTheme = {
  name: 'light',
  colors: {
    // Brand & Accent
    primary: '#4f46e5',
    primaryHover: '#4338ca',
    primaryActive: '#3730a3',
    primarySubtle: 'rgba(79, 70, 229, 0.08)',

    accent: '#ec4899',
    accentHover: '#db2777',
    accentSubtle: 'rgba(236, 72, 153, 0.08)',

    // Surfaces & Backgrounds
    background: '#f8fafc',
    surface: '#ffffff',
    surfaceHover: '#f1f5f9',
    surfaceActive: '#e2e8f0',
    surfaceMuted: '#f1f5f9',

    // Card & Elevates
    cardBg: '#ffffff',
    cardBorder: '#e2e8f0',
    overlay: 'rgba(15, 23, 42, 0.5)',
    glassBg: 'rgba(255, 255, 255, 0.92)',
    glassBorder: 'rgba(226, 232, 240, 0.9)',

    // Text & Content
    textPrimary: '#0f172a',
    textSecondary: '#334155',
    textMuted: '#64748b',
    textInverse: '#ffffff',

    // Borders & Dividers
    border: '#e2e8f0',
    borderHover: '#cbd5e1',
    borderFocus: '#6366f1',

    // Status Colors
    success: '#10b981',
    successSubtle: 'rgba(16, 185, 129, 0.1)',
    warning: '#f59e0b',
    warningSubtle: 'rgba(245, 158, 11, 0.1)',
    error: '#ef4444',
    errorSubtle: 'rgba(239, 68, 68, 0.1)',
    info: '#3b82f6',
    infoSubtle: 'rgba(59, 130, 246, 0.1)',
  },
};

export type ThemeSchema = typeof lightTheme;
