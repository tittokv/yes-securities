export const Colors = {
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    secondary: '#8b5cf6',
    secondaryDark: '#7c3aed',

    success: '#10b981',
    successDark: '#059669',
    error: '#ef4444',
    errorDark: '#dc2626',
    warning: '#f59e0b',
    warningDark: '#d97706',

    background: {
        gradient1: '#f0f9ff',
        gradient2: '#e0f2fe',
        gradient3: '#f8fafc',
    },

    text: {
        primary: '#1e293b',
        secondary: '#64748b',
        tertiary: '#94a3b8',
        light: '#cbd5e1',
    },

    border: {
        light: 'rgba(148, 163, 184, 0.1)',
        medium: 'rgba(148, 163, 184, 0.2)',
        primary: 'rgba(99, 102, 241, 0.1)',
    },

    white: '#ffffff',
    transparent: 'transparent',
} as const;

export const GradientColors = {
    primary: [Colors.primary, Colors.secondary],
    success: ['rgba(16, 185, 129, 0.9)', 'rgba(5, 150, 105, 0.85)'],
    error: ['rgba(239, 68, 68, 0.9)', 'rgba(220, 38, 38, 0.85)'],
    purple: ['rgba(139, 92, 246, 0.9)', 'rgba(124, 58, 237, 0.85)'],
    blue: ['rgba(99, 102, 241, 0.9)', 'rgba(79, 70, 229, 0.85)'],
    card: ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)'],
    background: [Colors.background.gradient1, Colors.background.gradient2, Colors.background.gradient3],
} as const;
