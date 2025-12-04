import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Colors, GradientColors } from '@/constants/colors';
import { BorderRadius, FontSizes, FontWeights, Shadows, Spacing } from '@/constants/typography';
import { StockItem } from '@/types/ipo';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

interface IPOCardProps {
    stock: StockItem;
}

export function IPOCard({ stock }: IPOCardProps) {
    const [scaleAnim] = useState(new Animated.Value(1));
    return (

        <View key={stock.id} style={styles.stockCard}>
            <View style={styles.stockHeader}>
                <View style={styles.stockTitleContainer}>
                    <Text style={styles.stockName}>{stock.name}</Text>
                    <Text style={styles.stockMeta}>
                        Avg. Price {stock.avgPrice.toFixed(2)} • Qty: {stock.quantity}
                    </Text>
                </View>
            </View>

            <View style={styles.stockDetails}>
                <View style={styles.stockDetailItem}>
                    <Text style={styles.detailLabel}>Invested</Text>
                    <Text style={styles.detailValue}>₹{stock.invested.toFixed(2)}</Text>
                </View>

                <View style={styles.stockDetailItem}>
                    <Text style={styles.detailLabel}>Current</Text>
                    <Text style={styles.detailValue}>₹{stock.current.toFixed(2)}</Text>
                </View>

                <View style={styles.stockDetailItem}>
                    <Text style={styles.detailLabel}>Profit/Loss</Text>
                    <View style={styles.plContainer}>
                        <Text style={[styles.detailValue, styles.lossText]}>
                            ₹{stock.profitLoss.toFixed(2)}
                        </Text>
                        <Text style={[styles.plPercent, styles.lossText]}>
                            {stock.profitLossPercent.toFixed(2)}%
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}





const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: Spacing.lg,
    },
    summaryCard: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        marginBottom: Spacing.lg,
        ...Shadows.large,
    },
    summaryGradient: {
        padding: Spacing.xl,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
    },
    summaryLabel: {
        fontSize: FontSizes.base,
        color: Colors.text.secondary,
        fontWeight: FontWeights.medium,
    },
    summaryValue: {
        fontSize: FontSizes.lg,
        color: Colors.text.primary,
        fontWeight: FontWeights.bold,
    },
    summaryRight: {
        alignItems: 'flex-end',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border.primary,
        marginVertical: Spacing.xs,
    },
    lossText: {
        color: '#ef4444',
    },
    percentText: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.semibold,
        marginTop: 2,
    },
    todayPLContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fee2e2',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        gap: Spacing.sm,
    },
    todayPLText: {
        fontSize: FontSizes.base,
        color: '#ef4444',
        fontWeight: FontWeights.bold,
    },
  
    stockCard: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        ...Shadows.medium,
        borderLeftWidth: 4,
        borderLeftColor: '#667eea',
    },
    stockHeader: {
        marginBottom: Spacing.md,
    },
    stockTitleContainer: {
        gap: Spacing.xs,
    },
    stockName: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.bold,
        color: Colors.text.primary,
    },
    stockMeta: {
        fontSize: FontSizes.sm,
        color: Colors.text.tertiary,
        fontWeight: FontWeights.medium,
    },
    stockDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.border.primary,
    },
    stockDetailItem: {
        flex: 1,
        gap: Spacing.xs,
    },
    detailLabel: {
        fontSize: FontSizes.xs,
        color: Colors.text.secondary,
        fontWeight: FontWeights.medium,
        textTransform: 'uppercase',
    },
    detailValue: {
        fontSize: FontSizes.base,
        fontWeight: FontWeights.bold,
        color: Colors.text.primary,
    },
    plContainer: {
        gap: 2,
    },
    plPercent: {
        fontSize: FontSizes.xs,
        fontWeight: FontWeights.bold,
    },
});