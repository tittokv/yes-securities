import { PortfolioCard } from '@/components/portfolio/PortfolioCard';
import { Colors, GradientColors } from '@/constants/colors';
import { BorderRadius, FontSizes, FontWeights, Shadows, Spacing } from '@/constants/typography';
import { PortfolioSection } from '@/types/portfolio';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SECTIONS: PortfolioSection[] = [
  {
    title: 'WatchList',
    icon: 'eye-outline',
    data: [
      { id: 'w1', label: 'INFY', value: '+1.25%', isPositive: true },
      { id: 'w2', label: 'TCS', value: '-0.40%', isPositive: false },
    ],
  },
  {
    title: 'Portfolio',
    icon: 'briefcase-outline',
    data: [
      { id: 'p1', label: 'Total Value', value: '₹ 2,45,000', isPositive: true },
      { id: 'p2', label: 'P&L', value: '+₹ 12,300', isPositive: true },
    ],
  },
  {
    title: 'Positions',
    icon: 'trending-up-outline',
    data: [
      { id: 'pos1', label: 'NIFTY FUT', value: '+₹ 1,500', isPositive: true },
      { id: 'pos2', label: 'BANKNIFTY FUT', value: '-₹ 800', isPositive: false },
    ],
  },
  {
    title: 'Orderbook',
    icon: 'receipt-outline',
    data: [
      { id: 'o1', label: 'INFY BUY', value: 'Executed', isPositive: true },
      { id: 'o2', label: 'SBIN SELL', value: 'Pending', isPositive: false },
    ],
  },
];

export default function HomeScreen() {
  return (
    <LinearGradient colors={GradientColors.background} style={styles.root}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInnerContainer}>
          <Ionicons name="search" size={20} color={Colors.text.secondary} style={styles.searchIcon} />
          <TextInput
            placeholder="Search UCC..."
            style={styles.searchInput}
            placeholderTextColor={Colors.text.tertiary}
          />
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => router.push('/(tabs)/search')}
        >
          <LinearGradient
            colors={GradientColors.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.filterGradient}
          >
            <Ionicons name="options-outline" size={20} color={Colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <SectionList
        style={styles.list}
        sections={SECTIONS}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <>
            <View style={styles.bannerContainer}>
              <Image
                source={{ uri: 'https://picsum.photos/800/300' }}
                style={styles.bannerImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.3)']}
                style={styles.bannerOverlay}
              />
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>Market Overview</Text>
                <Text style={styles.bannerSubtitle}>Track your investments in real-time</Text>
              </View>
            </View>
            <View style={{ height: Spacing.lg }} />
          </>
        }
        renderItem={({ section, index }) => {
          if (index !== 0) return null;
          return <PortfolioCard section={section} />;
        }}
        ItemSeparatorComponent={() => <View style={styles.sectionSeparator} />}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },
  searchInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    ...Shadows.small,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.text.primary,
    fontWeight: FontWeights.medium,
  },
  filterButton: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  filterGradient: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  bannerContainer: {
    width: '100%',
    height: 200,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.large,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  bannerContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  bannerTitle: {
    fontSize: FontSizes['3xl'],
    fontWeight: FontWeights.bold,
    color: Colors.white,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bannerSubtitle: {
    fontSize: FontSizes.base,
    color: '#f1f5f9',
    fontWeight: FontWeights.medium,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  sectionSeparator: {
    height: Spacing.lg,
  },
});
