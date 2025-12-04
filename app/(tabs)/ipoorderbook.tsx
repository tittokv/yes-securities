import { IPOCard } from '@/components/ipo/IPOCard';
import { SummaryCard } from '@/components/ui/SummaryCard';
import { Colors, GradientColors } from '@/constants/colors';
import { BorderRadius, FontSizes, FontWeights, Spacing } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Define IPOApplication type locally for this screen only
interface IPOApplication {
    id: string;
    companyName: string;
    applicationNumber: string;
    bidPrice: number;
    quantity: number;
    totalAmount: number;
    status: 'Allotted' | 'Applied' | 'Rejected';
    allottedQuantity: number;
    appliedDate: string;
}

const IPO_APPLICATIONS: IPOApplication[] = [
    { id: '1', companyName: 'TechCorp Industries Ltd', applicationNumber: 'IPO2024001234', bidPrice: 450, quantity: 100, totalAmount: 45000, status: 'Allotted', allottedQuantity: 100, appliedDate: '2024-11-15' },
    { id: '2', companyName: 'Green Energy Solutions', applicationNumber: 'IPO2024005678', bidPrice: 320, quantity: 150, totalAmount: 48000, status: 'Applied', allottedQuantity: 0, appliedDate: '2024-11-28' },
    { id: '3', companyName: 'FinTech Innovations Pvt', applicationNumber: 'IPO2024009012', bidPrice: 580, quantity: 75, totalAmount: 43500, status: 'Rejected', allottedQuantity: 0, appliedDate: '2024-10-20' },
    { id: '4', companyName: 'Healthcare Plus Ltd', applicationNumber: 'IPO2024003456', bidPrice: 275, quantity: 200, totalAmount: 55000, status: 'Allotted', allottedQuantity: 50, appliedDate: '2024-11-01' },
];

export default function IPOOrderBookScreen() {
    const totalApplications = IPO_APPLICATIONS.length;
    const allottedCount = IPO_APPLICATIONS.filter(app => app.status === 'Allotted').length;
    const pendingCount = IPO_APPLICATIONS.filter(app => app.status === 'Applied').length;

    return (
        <LinearGradient colors={GradientColors.background} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>


                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Your Applications</Text>
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="filter-outline" size={18} color={Colors.primary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.applicationsList}>
                    {IPO_APPLICATIONS.map((application) => {
                        // Transform application to stock format for IPOCard
                        const stockData = {
                            id: application.id,
                            name: application.companyName,
                            avgPrice: application.bidPrice,
                            quantity: application.quantity,
                            invested: application.totalAmount,
                            current: application.totalAmount, // Using same as invested for IPO
                            profitLoss: 0, // No P/L for IPO applications
                            profitLossPercent: 0,
                        };
                        return <IPOCard key={application.id} stock={stockData} />;
                    })}
                </View>

                {IPO_APPLICATIONS.length === 0 && (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-outline" size={64} color={Colors.text.light} />
                        <Text style={styles.emptyStateText}>No IPO applications yet</Text>
                        <Text style={styles.emptyStateSubtext}>Your IPO applications will appear here</Text>
                    </View>
                )}
            </ScrollView>
        </LinearGradient>
    );
}

function SummaryItem({ icon, value, label }: { icon: string; value: string; label: string }) {
    return (
        <View style={styles.summaryItem}>
            <Ionicons name={icon as any} size={24} color="rgba(255, 255, 255, 0.9)" />
            <Text style={styles.summaryValue}>{value}</Text>
            <Text style={styles.summaryLabel}>{label}</Text>
        </View>
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
    summaryRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    summaryItem: {
        flex: 1,
        alignItems: 'center',
        gap: Spacing.sm,
    },
    summaryDivider: {
        width: 1,
        height: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    summaryValue: {
        fontSize: FontSizes['4xl'],
        fontWeight: FontWeights.bold,
        color: Colors.white,
    },
    summaryLabel: {
        fontSize: FontSizes.sm,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: FontWeights.semibold,
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
    filterButton: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.md,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    applicationsList: {
        gap: Spacing.lg,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyStateText: {
        fontSize: FontSizes.xl,
        fontWeight: FontWeights.bold,
        color: Colors.text.secondary,
        marginTop: Spacing.lg,
    },
    emptyStateSubtext: {
        fontSize: FontSizes.base,
        color: Colors.text.tertiary,
        marginTop: Spacing.sm,
    },
});
