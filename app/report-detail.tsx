import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, GradientColors } from '@/constants/colors';
import { Spacing, BorderRadius, FontSizes, FontWeights } from '@/constants/typography';
import { Dropdown } from '@/components/reports/Dropdown';
import reportDetails from '@/data/report-details.json';

export default function ReportDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const reportId = params.reportId as string;
    const reportTitle = params.reportTitle as string || 'Report Details';
    const segmentId = params.segmentId as string;
    const dateRangeId = params.dateRangeId as string;

    // load report data based on reportId this is dynamic data
    const reportData: any = (reportDetails as any)[reportId];

    // show message if no data
    if (!reportData) {
        return (
            <>
                <Stack.Screen options={{ headerShown: false }} />
                <SafeAreaView style={styles.safeArea} edges={['top']}>
                    <LinearGradient colors={GradientColors.background} style={styles.root}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                                <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>{reportTitle}</Text>
                            <View style={styles.placeholder} />
                        </View>
                        <View style={styles.centerContent}>
                            <Ionicons name="document-text-outline" size={80} color={Colors.text.tertiary} />
                            <Text style={styles.noDataText}>No data available for this report</Text>
                            <Text style={styles.noDataSubtext}>Report ID: {reportId}</Text>
                        </View>
                    </LinearGradient>
                </SafeAreaView>
            </>
        );
    }

    const data = reportData;
    const [selectedSegment, setSelectedSegment] = useState(segmentId || 'equity');
    const [selectedDateRange, setSelectedDateRange] = useState(dateRangeId || 'current-fy-25-26');

    const segments = [
        { id: 'equity', label: 'Equity' },
        { id: 'commodity', label: 'Commodity' },
        { id: 'currency', label: 'Currency' },
        { id: 'fno', label: 'F&O' },
    ];

    const dateRanges = [
        { id: 'current-fy-25-26', label: 'Current FY(25-26)' },
        { id: 'last-fy-24-25', label: 'Last FY(24-25)' },
    ];

    const formatCurrency = (amount: number) => {
        return `₹${Math.abs(amount).toFixed(2)}`;
    };

    const formatPercent = (percent: number) => {
        return `(${percent > 0 ? '+' : ''}${percent.toFixed(2)}%)`;
    };

    const renderTransaction = ({ item }: any) => (
        <View style={styles.transactionCard}>
            <View style={styles.transactionHeader}>
                <View style={styles.transactionLeft}>
                    <Text style={styles.companyName}>{item.companyName}</Text>
                    <View style={styles.transactionMeta}>
                        <Ionicons name="mail-outline" size={14} color={Colors.text.tertiary} />
                        <Text style={styles.metaText}>{item.quantity}</Text>
                        <Text style={styles.metaDot}>•</Text>
                        <Text style={styles.typeText}>{item.type}</Text>
                    </View>
                </View>
                <View style={styles.transactionRight}>
                    <Text style={[
                        styles.gainLossAmount,
                        { color: item.gainLoss >= 0 ? Colors.success : Colors.error }
                    ]}>
                        {item.gainLoss >= 0 ? '+' : '-'}{formatCurrency(item.gainLoss)}
                    </Text>
                    <Text style={[
                        styles.gainLossPercent,
                        { color: item.gainLoss >= 0 ? Colors.success : Colors.error }
                    ]}>
                        {formatPercent(item.gainLossPercent)}
                    </Text>
                </View>
            </View>

            <View style={styles.amountRow}>
                <View style={styles.amountColumn}>
                    <Text style={styles.amountLabel}>Buy Amount</Text>
                    <Text style={styles.amountValue}>{formatCurrency(item.buyAmount)}</Text>
                </View>
                <View style={styles.amountColumn}>
                    <Text style={styles.amountLabel}>Sell Amount</Text>
                    <Text style={styles.amountValue}>{formatCurrency(item.sellAmount)}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <LinearGradient colors={GradientColors.background} style={styles.root}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>{reportTitle}</Text>
                        <View style={styles.placeholder} />
                    </View>

                    {/* Filters Bar */}
                    <View style={styles.filtersBar}>
                        <View style={styles.filterItem}>
                            <TouchableOpacity style={styles.filterButton}>
                                <Text style={styles.filterButtonText}>
                                    {segments.find(s => s.id === selectedSegment)?.label}
                                </Text>
                                <Ionicons name="chevron-down" size={16} color={Colors.text.secondary} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.filterItem}>
                            <TouchableOpacity style={styles.filterButton}>
                                <Text style={styles.filterButtonText}>Current F...</Text>
                                <Ionicons name="chevron-down" size={16} color={Colors.text.secondary} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.filterIconButton}>
                            <Ionicons name="filter" size={20} color={Colors.text.primary} />
                        </TouchableOpacity>
                    </View>

                    {/* Summary Cards */}
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Short term gain/loss</Text>
                                <Text style={[
                                    styles.summaryValue,
                                    { color: data.summary.shortTermGainLoss >= 0 ? Colors.success : Colors.error }
                                ]}>
                                    {data.summary.shortTermGainLoss >= 0 ? '+' : '-'}
                                    {formatCurrency(data.summary.shortTermGainLoss)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.summaryRow}>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Long term gain/loss</Text>
                                <Text style={styles.summaryValue}>
                                    {formatCurrency(data.summary.longTermGainLoss)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.summaryRow}>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Intraday gain/loss</Text>
                                <Text style={[
                                    styles.summaryValue,
                                    { color: data.summary.intradayGainLoss >= 0 ? Colors.success : Colors.error }
                                ]}>
                                    {data.summary.intradayGainLoss >= 0 ? '+' : ''}
                                    {formatCurrency(data.summary.intradayGainLoss)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.chargesRow}>
                            <Text style={styles.chargesLabel}>Charges {formatCurrency(data.summary.charges)}</Text>
                            <TouchableOpacity>
                                <Text style={styles.viewBreakdown}>View breakdown</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Results Header */}
                    <View style={styles.resultsHeader}>
                        <Text style={styles.resultsCount}>{data.transactions.length} result</Text>
                        <View style={styles.actionButtons}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="download-outline" size={24} color={Colors.text.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="mail-outline" size={24} color={Colors.text.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Transactions List */}
                    <FlatList
                        data={data.transactions}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTransaction}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                </LinearGradient>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    root: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        backgroundColor: Colors.white,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: FontSizes.xl,
        fontWeight: FontWeights.bold,
        color: Colors.text.primary,
    },
    placeholder: {
        width: 32,
    },
    filtersBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        gap: Spacing.sm,
        backgroundColor: Colors.white,
    },
    filterItem: {
        flex: 1,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.background.gradient1,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: Colors.border.light,
    },
    filterButtonText: {
        fontSize: FontSizes.sm,
        color: Colors.text.secondary,
        fontWeight: FontWeights.medium,
    },
    filterIconButton: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.background.gradient1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border.light,
    },
    summaryContainer: {
        backgroundColor: Colors.white,
        marginHorizontal: Spacing.lg,
        marginTop: Spacing.md,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    summaryRow: {
        paddingVertical: Spacing.sm,
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: FontSizes.md,
        color: Colors.text.primary,
        fontWeight: FontWeights.medium,
    },
    summaryValue: {
        fontSize: FontSizes.md,
        color: Colors.text.primary,
        fontWeight: FontWeights.bold,
    },
    chargesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Spacing.md,
        marginTop: Spacing.sm,
        borderTopWidth: 1,
        borderTopColor: Colors.border.light,
    },
    chargesLabel: {
        fontSize: FontSizes.sm,
        color: Colors.text.secondary,
        fontWeight: FontWeights.medium,
    },
    viewBreakdown: {
        fontSize: FontSizes.sm,
        color: Colors.primary,
        fontWeight: FontWeights.semibold,
    },
    resultsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
    },
    resultsCount: {
        fontSize: FontSizes.sm,
        color: Colors.text.tertiary,
        fontWeight: FontWeights.medium,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    actionButton: {
        padding: 4,
    },
    listContent: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.xl,
    },
    transactionCard: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: Colors.border.light,
    },
    transactionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.md,
    },
    transactionLeft: {
        flex: 1,
    },
    companyName: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.bold,
        color: Colors.text.primary,
        marginBottom: 4,
    },
    transactionMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: FontSizes.sm,
        color: Colors.text.tertiary,
    },
    metaDot: {
        fontSize: FontSizes.sm,
        color: Colors.text.tertiary,
    },
    typeText: {
        fontSize: FontSizes.sm,
        color: '#f59e0b',
        fontWeight: FontWeights.medium,
    },
    transactionRight: {
        alignItems: 'flex-end',
    },
    gainLossAmount: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.bold,
        marginBottom: 2,
    },
    gainLossPercent: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.medium,
    },
    amountRow: {
        flexDirection: 'row',
        backgroundColor: Colors.background.gradient1,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
    },
    amountColumn: {
        flex: 1,
    },
    amountLabel: {
        fontSize: FontSizes.xs,
        color: Colors.text.tertiary,
        marginBottom: 4,
    },
    amountValue: {
        fontSize: FontSizes.md,
        color: Colors.text.primary,
        fontWeight: FontWeights.semibold,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
    },
    noDataText: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.semibold,
        color: Colors.text.primary,
        marginTop: Spacing.lg,
        textAlign: 'center',
    },
    noDataSubtext: {
        fontSize: FontSizes.sm,
        color: Colors.text.tertiary,
        marginTop: Spacing.sm,
        textAlign: 'center',
    },
});
