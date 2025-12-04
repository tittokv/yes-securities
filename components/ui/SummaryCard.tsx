import { GradientColors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing } from '@/constants/typography';
import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface SummaryCardProps {
    children: ReactNode;
    gradientColors?: string[];
}

export function SummaryCard({ children, gradientColors = GradientColors.primary }: SummaryCardProps) {
    return (
        <View style={styles.card}>
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                {children}
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        padding: 10,
        ...Shadows.large,
    },
    gradient: {
        padding: Spacing.xl,
    },
});
