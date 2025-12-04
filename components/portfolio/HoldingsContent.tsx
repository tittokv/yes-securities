import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from '@/components/ui/SearchBar';
import { Colors, GradientColors } from '@/constants/colors';
import { BorderRadius, FontSizes, FontWeights, Shadows, Spacing } from '@/constants/typography';

type HoldingItem = {
  id: string;
  symbol: string;
  exchange: string;
  ltp: number;
  quantity: number;
  currentValue: number;
};

const MOCK_HOLDINGS: HoldingItem[] = [
  { id: '1', symbol: 'BAJAJHIND', exchange: 'NSE', ltp: 21.14, quantity: 1, currentValue: 21.14 },
  { id: '2', symbol: 'BANKBEES', exchange: 'NSE', ltp: 583.29, quantity: 12, currentValue: 583.29 },
  { id: '3', symbol: 'BCLIND', exchange: 'NSE', ltp: 39.11, quantity: 8, currentValue: 39.11 },
  { id: '4', symbol: 'CPSEETF', exchange: 'NSE', ltp: 92.39, quantity: 34, currentValue: 92.39 },
  { id: '5', symbol: 'CUB', exchange: 'NSE', ltp: 213.10, quantity: 2, currentValue: 213.10 },
  { id: '6', symbol: 'DHARAN', exchange: 'NSE', ltp: 0.57, quantity: 67, currentValue: 0.57 },
];

export function HoldingsContent() {
  const [searchQuery, setSearchQuery] = useState('');

  const totalHoldingValue = 126480.74;

  const handleFilterPress = () => {
    console.log('Holdings filter pressed');
    // Add filter logic
  };

  // Filter holdings based on search query
  const filteredHoldings = MOCK_HOLDINGS.filter(holding =>
    holding.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.wrapper}>
      <SearchBar
        placeholder="Search holdings..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFilterPress={handleFilterPress}
        filterIcon="funnel-outline"
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Total Value Card */}
        <LinearGradient
          colors={['#347ab6', '#5ba3d0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.totalValueCard}
        >
          <Text style={styles.totalValueLabel}>Total Holding Value</Text>
          <Text style={styles.totalValueAmount}>₹{totalHoldingValue.toLocaleString('en-IN')}</Text>
          <View style={styles.iconContainer}>
            <Ionicons name="trending-up" size={40} color="rgba(255,255,255,0.3)" />
          </View>
        </LinearGradient>

        {/* Holdings Title */}
        <Text style={styles.sectionTitle}>My Holdings</Text>

        {/* Holdings List */}
        <View style={styles.holdingsList}>
          {filteredHoldings.map((holding) => (
            <View key={holding.id} style={styles.holdingCard}>
              <View style={styles.holdingLeft}>
                <View style={styles.symbolContainer}>
                  <Text style={styles.symbol}>{holding.symbol}</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{holding.exchange}</Text>
                  </View>
                </View>
                <View style={styles.metaRow}>
                  <Ionicons name="pricetag-outline" size={14} color={Colors.text.tertiary} />
                  <Text style={styles.metaText}>LTP {holding.ltp.toFixed(2)}</Text>
                  <Text style={styles.metaSeparator}>•</Text>
                  <Ionicons name="cube-outline" size={14} color={Colors.text.tertiary} />
                  <Text style={styles.metaText}>{holding.quantity}</Text>
                </View>
              </View>
              <View style={styles.holdingRight}>
                <Text style={styles.currentValueLabel}>Current value</Text>
                <Text style={styles.currentValueAmount}>{holding.currentValue.toFixed(2)}</Text>
              </View>
            </View>
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
  totalValueCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.xl,
    ...Shadows.large,
    position: 'relative',
    overflow: 'hidden',
  },
  totalValueLabel: {
    fontSize: FontSizes.base,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: FontWeights.medium,
    marginBottom: Spacing.xs,
  },
  totalValueAmount: {
    fontSize: FontSizes['3xl'],
    color: Colors.white,
    fontWeight: FontWeights.bold,
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  holdingsList: {
    gap: Spacing.md,
    paddingBottom: Spacing['3xl'],
  },
  holdingCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Shadows.medium,
    borderLeftWidth: 3,
    borderLeftColor: '#347ab6',
  },
  holdingLeft: {
    flex: 1,
    gap: Spacing.sm,
  },
  symbolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  symbol: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: Colors.text.primary,
  },
  badge: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  badgeText: {
    fontSize: FontSizes.xs,
    color: '#347ab6',
    fontWeight: FontWeights.bold,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: FontSizes.sm,
    color: Colors.text.tertiary,
    fontWeight: FontWeights.medium,
  },
  metaSeparator: {
    fontSize: FontSizes.sm,
    color: Colors.text.tertiary,
    marginHorizontal: 4,
  },
  holdingRight: {
    alignItems: 'flex-end',
    gap: Spacing.xs,
  },
  currentValueLabel: {
    fontSize: FontSizes.xs,
    color: Colors.text.secondary,
    fontWeight: FontWeights.medium,
  },
  currentValueAmount: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.text.primary,
  },
});