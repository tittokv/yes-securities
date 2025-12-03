import { TextStyle } from 'react-native';

export const FontSizes = {
    xs: 12,
    sm: 13,
    base: 14,
    md: 15,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 36,
} as const;

export const FontWeights = {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
} as const;

export const Typography: Record<string, TextStyle> = {
    h1: {
        fontSize: FontSizes['3xl'],
        fontWeight: FontWeights.bold,
        letterSpacing: 0.5,
    },
    h2: {
        fontSize: FontSizes['2xl'],
        fontWeight: FontWeights.bold,
        letterSpacing: 0.3,
    },
    h3: {
        fontSize: FontSizes.xl,
        fontWeight: FontWeights.bold,
        letterSpacing: 0.3,
    },
    body: {
        fontSize: FontSizes.base,
        fontWeight: FontWeights.medium,
    },
    bodyLarge: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.semibold,
    },
    caption: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.semibold,
    },
    small: {
        fontSize: FontSizes.xs,
        fontWeight: FontWeights.semibold,
    },
} as const;

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
} as const;

export const BorderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    full: 9999,
} as const;

export const Shadows = {
    small: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    medium: {
        shadowColor: '#6366f1',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        elevation: 5,
    },
    large: {
        shadowColor: '#6366f1',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 16,
        elevation: 8,
    },
} as const;
