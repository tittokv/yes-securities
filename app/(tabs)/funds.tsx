import { FundCard } from '@/components/funds/FundCard';
import { InfoCard } from '@/components/ui/InfoCard';
import { Colors, GradientColors } from '@/constants/colors';
import { BorderRadius, FontSizes, FontWeights, Spacing } from '@/constants/typography';
import { FundCardData, FundsData } from '@/types/fund';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FUNDS_DATA: FundsData = {
    availableBalance: 125000.50,
    usedMargin: 45000.00,
    availableMargin: 80000.50,
    collateralValue: 200000.00,
    withdrawableBalance: 75000.50,
};

const FUND_CARDS: FundCardData[] = [
    { title: 'Used Margin', amount: FUNDS_DATA.usedMargin, icon: 'trending-down-outline', gradientColors: GradientColors.error, subtitle: 'Currently in use' },
    { title: 'Available Margin', amount: FUNDS_DATA.availableMargin, icon: 'trending-up-outline', gradientColors: GradientColors.success, subtitle: 'Ready to trade' },
    { title: 'Collateral Value', amount: FUNDS_DATA.collateralValue, icon: 'shield-checkmark-outline', gradientColors: GradientColors.blue, subtitle: 'Total collateral' },
    { title: 'Withdrawable', amount: FUNDS_DATA.withdrawableBalance, icon: 'wallet-outline', gradientColors: GradientColors.purple, subtitle: 'Available to withdraw' },
];

export default function FundsScreen() {
    return (
        <LinearGradient colors={GradientColors.background} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.mainCard}>
                    <LinearGradient
                        colors={[Colors.primary, Colors.secondary, '#a855f7']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.mainCardGradient}
                    >
                        <Text style={styles.mainCardLabel}>Total Available Balance</Text>
                        <Text style={styles.mainCardAmount}>
                            ₹ {FUNDS_DATA.availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </Text>

                        <View style={styles.quickActions}>
                            <QuickActionButton icon="add-circle-outline" label="Add Funds" />
                            <View style={styles.quickActionDivider} />
                            <QuickActionButton icon="arrow-up-circle-outline" label="Withdraw" />
                        </View>
                    </LinearGradient>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Fund Details</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllText}>View History</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.cardsGrid}>
                    {FUND_CARDS.map((fund, index) => (
                        <FundCard key={index} fund={fund} />
                    ))}
                </View>

                <InfoCard
                    title="Fund Information"
                    icon="information-circle"
                    items={[
                        'Funds are updated in real-time',
                        'Withdrawals are processed within 24 hours',
                        'Margin requirements vary by instrument',
                    ]}
                />
            </ScrollView>
        </LinearGradient>
    );
}

function QuickActionButton({ icon, label }: { icon: string; label: string }) {
    return (
        <TouchableOpacity style={styles.quickActionButton}>
            <View style={styles.quickActionIconContainer}>
                <Ionicons name={icon as any} size={20} color="#fff" />
            </View>
            <Text style={styles.quickActionText}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: Spacing.lg,
        paddingBottom: Spacing['3xl'],
    },
    mainCard: {
        borderRadius: BorderRadius['2xl'],
        overflow: 'hidden',
        marginBottom: Spacing['2xl'],
        shadowColor: Colors.primary,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 16,
        elevation: 8,
    },
    mainCardGradient: {
        padding: Spacing['2xl'],
    },
    mainCardLabel: {
        fontSize: FontSizes.base,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: FontWeights.semibold,
        marginBottom: Spacing.sm,
        letterSpacing: 0.5,
    },
    mainCardAmount: {
        fontSize: FontSizes['5xl'],
        fontWeight: FontWeights.bold,
        color: Colors.white,
        marginBottom: Spacing['2xl'],
        letterSpacing: 0.5,
    },
    quickActions: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: BorderRadius.lg,
        padding: 4,
    },
    quickActionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.md,
        gap: Spacing.sm,
    },
    quickActionIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quickActionDivider: {
        width: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginVertical: Spacing.sm,
    },
    quickActionText: {
        fontSize: FontSizes.base,
        fontWeight: FontWeights.bold,
        color: Colors.white,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    sectionTitle: {
        fontSize: FontSizes['2xl'],
        fontWeight: FontWeights.bold,
        color: Colors.text.primary,
        letterSpacing: 0.3,
    },
    viewAllText: {
        fontSize: FontSizes.base,
        fontWeight: FontWeights.semibold,
        color: Colors.primary,
    },
    cardsGrid: {
        gap: Spacing.lg,
        marginBottom: Spacing['2xl'],
    },
});
