import { ThemeSchema } from './lightTheme';

export const darkTheme: ThemeSchema = {
  name: 'dark',
  colors: {
    // Brand & Accent
    primary: '#6366f1',
    primaryHover: '#818cf8',
    primaryActive: '#4f46e5',
    primarySubtle: 'rgba(99, 102, 241, 0.15)',

    accent: '#ec4899',
    accentHover: '#f472b6',
    accentSubtle: 'rgba(236, 72, 153, 0.15)',

    // Surfaces & Backgrounds
    background: '#090d16',
    surface: '#111827',
    surfaceHover: '#1f2937',
    surfaceActive: '#374151',
    surfaceMuted: '#1f2937',

    // Card & Elevates
    cardBg: 'rgba(17, 24, 39, 0.8)',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    overlay: 'rgba(0, 0, 0, 0.75)',
    glassBg: 'rgba(17, 24, 39, 0.75)',
    glassBorder: 'rgba(255, 255, 255, 0.08)',

    // Text & Content
    textPrimary: '#f8fafc',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    textInverse: '#0f172a',

    // Borders & Dividers
    border: '#1f2937',
    borderHover: '#374151',
    borderFocus: '#6366f1',

    // Status Colors
    success: '#10b981',
    successSubtle: 'rgba(16, 185, 129, 0.15)',
    warning: '#f59e0b',
    warningSubtle: 'rgba(245, 158, 11, 0.15)',
    error: '#ef4444',
    errorSubtle: 'rgba(239, 68, 68, 0.15)',
    info: '#3b82f6',
    infoSubtle: 'rgba(59, 130, 246, 0.15)',
  },
};
