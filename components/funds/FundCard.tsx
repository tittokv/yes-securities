import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { BorderRadius, FontSizes, FontWeights, Spacing } from '@/constants/typography';
import { FundCardData } from '@/types/fund';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface FundCardProps {
    fund: FundCardData;
}

export function FundCard({ fund }: FundCardProps) {
    return (
        <AnimatedCard gradientColors={fund.gradientColors} style={styles.card}>
            <View style={styles.header}>
                <View style={styles.iconCircle}>
                    <Ionicons name={fund.icon as any} size={24} color="#fff" />
                </View>
                <Text style={styles.title}>{fund.title}</Text>
            </View>

            <Text style={styles.amount}>
                ₹ {fund.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>

            {fund.subtitle && <Text style={styles.subtitle}>{fund.subtitle}</Text>}
        </AnimatedCard>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        marginBottom: Spacing.lg,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: BorderRadius.md,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.bold,
        color: '#ffffff',
        letterSpacing: 0.3,
    },
    amount: {
        fontSize: FontSizes['4xl'],
        fontWeight: FontWeights.bold,
        color: '#ffffff',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: FontSizes.sm,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: FontWeights.semibold,
    },
});
