import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from '@/components/ui/SearchBar';
import { Colors, GradientColors } from '@/constants/colors';
import { BorderRadius, FontSizes, FontWeights, Shadows, Spacing } from '@/constants/typography';
import { IPOCard } from '../ipo/IPOCard';

type StockItem = {
  id: string;
  name: string;
  avgPrice: number;
  quantity: number;
  invested: number;
  current: number;
  profitLoss: number;
  profitLossPercent: number;
};

const MOCK_STOCKS: StockItem[] = [
  {
    id: '1',
    name: 'Mashu',
    avgPrice: 6267.51,
    quantity: 12.0,
    invested: 6267.51,
    current: 584.58,
    profitLoss: -5684.22,
    profitLossPercent: -90.69,
  },
  {
    id: '2',
    name: 'BCL INDUSTRIES LIMITED',
    avgPrice: 440.8,
    quantity: 8.0,
    invested: 440.8,
    current: 39.98,
    profitLoss: -401.69,
    profitLossPercent: -91.13,
  },
  {
    id: '3',
    name: 'CPSE ETF',
    avgPrice: 3375.11,
    quantity: 34.0,
    invested: 3375.11,
    current: 92.39,
    profitLoss: -3282.72,
    profitLossPercent: -97.26,
  },
];

export function PortfolioContent() {
  const [searchQuery, setSearchQuery] = useState('');

  const totalValue = 127440.58;
  const amountInvested = 1151945.12;
  const totalProfitLoss = -24506.97;
  const totalProfitLossPercent = -9.69;
  const todayPL = -26471.30;
  const todayPLPercent = -13.57;

  const handleFilterPress = () => {
    console.log('Portfolio filter pressed');
    // need to add logic 
  };

  // 
  const filteredStocks = MOCK_STOCKS.filter(stock =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.wrapper}>
      <SearchBar
        placeholder="Search portfolio..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        showFilter={false}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <LinearGradient
            colors={['rgba(52, 122, 182, 0.1)', 'rgba(91, 163, 208, 0.05)']}
            style={styles.summaryGradient}
          >
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Current Value</Text>
              <Text style={styles.summaryValue}>₹{totalValue.toLocaleString('en-IN')}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Amount Invested</Text>
              <Text style={styles.summaryValue}>₹{amountInvested.toLocaleString('en-IN')}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Profit/Loss</Text>
              <View style={styles.summaryRight}>
                <Text style={[styles.summaryValue, styles.lossText]}>
                  ₹{totalProfitLoss.toLocaleString('en-IN')}
                </Text>
                <Text style={[styles.percentText, styles.lossText]}>
                  ({totalProfitLossPercent}%)
                </Text>
              </View>
            </View>
          </LinearGradient>


          <View style={styles.todayPLContainer}>
            <Ionicons name="trending-down" size={20} color="#ef4444" />
            <Text style={styles.todayPLText}>
              Today's P/L: ₹{todayPL.toLocaleString('en-IN')} ({todayPLPercent}%)
            </Text>
          </View>
        </View>

        {/* Stock List */}
        <View style={styles.stockList}>
          {filteredStocks.map((stock) => (
            <IPOCard key={stock.id} stock={stock} />
          ))}
        </View>
      </ScrollView>
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
  stockList: {
    gap: Spacing.md,
    paddingBottom: Spacing['3xl'],
  },
  stockCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.medium,
    borderLeftWidth: 4,
    borderLeftColor: '#347ab6',
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