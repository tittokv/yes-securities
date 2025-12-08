import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Colors, GradientColors } from '@/constants/colors';
import { FontSizes, FontWeights, Spacing } from '@/constants/typography';
import { Position } from '@/types/position';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface PositionCardProps {
    position: Position;
}

export function PositionCard({ position }: PositionCardProps) {
    const isProfit = position.pnl >= 0;
    return (
        <AnimatedCard style={styles.card}>
            <View style={styles.header}>
                <View style={styles.symbolContainer}>
                    <View style={[styles.symbolBadge, isProfit ? styles.profitBadge : styles.lossBadge]}>
                        <Ionicons
                            name={isProfit ? 'trending-up' : 'trending-down'}
                            size={16}
                            color="#ffffff"
                        />
                    </View>
                    <Text style={styles.symbol}>{position.symbol}</Text>
                </View>
                <StatusBadge
                    status={`${isProfit ? '+' : ''}${position.pnlPercent.toFixed(2)}%`}
                    color={Colors.text.primary}
                    backgroundColor={isProfit ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}
                />
            </View>

            <View style={styles.divider} />

            <View style={styles.details}>
                <DetailRow label="Quantity" value={position.quantity.toString()} />
                <DetailRow label="Buy Price" value={`₹ ${position.buyPrice.toFixed(2)}`} />
                <DetailRow label="Current Price" value={`₹ ${position.currentPrice.toFixed(2)}`} />
                <DetailRow
                    label="P&L"
                    value={`${isProfit ? '+' : ''}₹ ${position.pnl.toFixed(2)}`}
                    valueColor={isProfit ? Colors.success : Colors.error}
                />
            </View>

            <View style={styles.actions}>
                <GradientButton title="Exit" gradientColors={[Colors.error, Colors.errorDark]} />
                <GradientButton title="Details" gradientColors={[Colors.primary, Colors.primary]} />
            </View>
        </AnimatedCard>
    );
}

function DetailRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={[styles.detailValue, valueColor && { color: valueColor }]}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    symbolContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    symbolBadge: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profitBadge: {
        backgroundColor: Colors.success,
    },
    lossBadge: {
        backgroundColor: Colors.error,
    },
    symbol: {
        fontSize: FontSizes['2xl'],
        fontWeight: FontWeights.bold,
        color: Colors.text.primary,
        letterSpacing: 0.5,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border.medium,
        marginBottom: Spacing.lg,
    },
    details: {
        gap: Spacing.md,
        marginBottom: Spacing.xl,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: FontSizes.base,
        color: Colors.text.secondary,
        fontWeight: FontWeights.semibold,
    },
    detailValue: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.bold,
        color: Colors.text.primary,
    },
    actions: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
});
