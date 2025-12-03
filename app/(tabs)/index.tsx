import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Dummy data for each card/section
const SECTIONS = [
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

function AnimatedCard({ section, index }: any) {
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  if (index !== 0) return null;

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
          style={styles.cardGradient}
        >
          {/* Card title with icon */}
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardTitleContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name={section.icon as any} size={20} color="#6366f1" />
              </View>
              <Text style={styles.cardTitle}>{section.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </View>

          {/* Divider */}
          <View style={styles.cardDivider} />

          {/* All rows inside the same card */}
          {section.data.map((item: any, idx: number) => (
            <View
              key={item.id}
              style={[
                styles.cardItemRow,
                idx === section.data.length - 1 && styles.lastItemRow
              ]}
            >
              <View style={styles.cardItemColumn}>
                <Text style={styles.itemLabel}>{item.label}</Text>
                <Text
                  style={[
                    styles.itemValue,
                    item.isPositive ? styles.positiveValue : styles.negativeValue
                  ]}
                >
                  {item.value}
                </Text>
              </View>
            </View>
          ))}
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#f8fafc']}
      style={styles.root}
    >
      {/* FIXED SEARCH BAR AT TOP */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInnerContainer}>
          <Ionicons name="search" size={20} color="#64748b" style={styles.searchIcon} />
          <TextInput
            placeholder="Search UCC..."
            style={styles.searchInput}
            placeholderTextColor="#94a3b8"
          />
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => router.push('/(tabs)/search')}
        >
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.filterGradient}
          >
            <Ionicons name="options-outline" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* SCROLLABLE CONTENT BELOW */}
      <SectionList
        style={styles.list}
        sections={SECTIONS}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <>
            {/* --- BANNER IMAGE --- */}
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

            <View style={{ height: 16 }} />
          </>
        }
        renderItem={({ section, index }) => (
          <AnimatedCard section={section} index={index} />
        )}
        ItemSeparatorComponent={() => <View style={styles.sectionSeparator} />}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  // SEARCH BAR (fixed)
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 12,
  },
  searchInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#6366f1',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1e293b',
    fontWeight: '500',
  },
  filterButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#6366f1',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  filterGradient: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // SCROLL AREA
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  // BANNER IMAGE
  bannerContainer: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 8,
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
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#f1f5f9',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // CARD (single box per section)
  cardWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#6366f1',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 6,
  },
  cardGradient: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: 0.3,
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(148, 163, 184, 0.2)',
    marginVertical: 12,
  },

  // rows inside card
  cardItemRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.1)',
  },
  lastItemRow: {
    borderBottomWidth: 0,
  },
  cardItemColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  itemValue: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  positiveValue: {
    color: '#10b981',
  },
  negativeValue: {
    color: '#ef4444',
  },

  sectionSeparator: {
    height: 16,
  },
});
