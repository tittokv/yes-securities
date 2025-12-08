import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView, Animated, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Reanimated, { FadeInRight } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors, GradientColors } from '@/constants/colors';
import { Spacing, BorderRadius, FontSizes, FontWeights } from '@/constants/typography';
import { useWatchlist } from '@/hooks/useWatchlist';
import { WatchlistStock } from '@/services/WatchlistService';

// Tab buttons here 
const WatchlistTabButton = ({
  label,
  isActive,
  onPress
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(isActive ? 1 : 0.96)).current;
  const opacityAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isActive ? 1 : 0.96,
        useNativeDriver: true,
        friction: 8,
        tension: 100,
      }),
      Animated.timing(opacityAnim, {
        toValue: isActive ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isActive]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={styles.tabButton}
    >
      <Animated.View
        style={[
          styles.tabContainer,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* gradient backgrong animation */}
        <Animated.View
          style={[
            styles.gradientContainer,
            { opacity: opacityAnim },
          ]}
        >
          <LinearGradient
            colors={GradientColors.secondary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          />
        </Animated.View>


        <Text
          style={[
            styles.tabText,
            isActive ? styles.activeText : styles.inactiveText,
          ]}
        >
          {label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

//  Stock Card widget
const StockCard = ({ item }: { item: WatchlistStock }) => (
  <Reanimated.View
    entering={FadeInRight.duration(300).delay(50)}
    style={styles.stockCard}
  >
    <View style={styles.stockLeft}>
      <View>
        <Text style={styles.stockSymbol}>{item.symbol}</Text>
        <Text style={styles.stockExchange}>{item.exchange}</Text>
      </View>
    </View>
    <View style={styles.stockRight}>
      <Text style={styles.stockPrice}>{item.price}</Text>
      <View style={styles.changeContainer}>
        <Ionicons
          name={item.isPositive ? "arrow-up" : "arrow-down"}
          size={12}
          color={item.isPositive ? '#10b981' : '#ef4444'}
        />
        <Text style={[
          styles.changeText,
          { color: item.isPositive ? '#10b981' : '#ef4444' }
        ]}>
          {item.change} ({item.changePercent})
        </Text>
      </View>
    </View>
  </Reanimated.View>
);



export default function WatchlistScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  const { watchlists, loading } = useWatchlist();

  const handleTabPress = (index: number) => {
    if (index === activeTab) return;


    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: -10,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setActiveTab(index);
      translateYAnim.setValue(10);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 10,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.spring(translateYAnim, {
          toValue: 0,
          friction: 10,
          tension: 50,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const currentWatchlist = watchlists.length > 0 ? watchlists[activeTab] : null;

  if (loading && watchlists.length === 0) {
    return (
      <View style={[styles.root, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <LinearGradient colors={GradientColors.background} style={styles.root}>
          {/* Header */}
          <LinearGradient
            colors={GradientColors.secondary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back-outline" size={24} color="#ffffff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Watchlist</Text>
              <View style={styles.headerActions}>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="search" size={24} color="#ffffff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="notifications-outline" size={24} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {/* Scrollable Tabs */}
          <View style={styles.tabsWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabsScrollContent}
            >
              {watchlists.map((tab, index) => (
                <WatchlistTabButton
                  key={tab.key}
                  label={tab.label}
                  isActive={activeTab === index}
                  onPress={() => handleTabPress(index)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Content */}
          <Animated.View
            style={[
              styles.contentContainer,
              {
                opacity: fadeAnim,
                transform: [
                  { scale: scaleAnim },
                  { translateY: translateYAnim },
                ],
              },
            ]}
          >
            {currentWatchlist && (
              <FlatList
                data={currentWatchlist.stocks}
                keyExtractor={(item, index) => `${item.symbol}-${item.exchange}-${index}`}
                renderItem={({ item }) => <StockCard item={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              />
            )}
          </Animated.View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#347ab6',
  },
  root: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
    marginLeft: 16,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 4,
  },
  tabsWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  tabsScrollContent: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    gap: Spacing.sm,
  },
  tabButton: {
    // No flex here - allows dynamic width
  },
  tabContainer: {
    position: 'relative',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: BorderRadius.md,
  },
  gradient: {
    flex: 1,
    borderRadius: BorderRadius.md,
  },
  tabText: {
    fontSize: FontSizes.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  activeText: {
    fontWeight: FontWeights.bold,
    color: Colors.white,
  },
  inactiveText: {
    fontWeight: FontWeights.semibold,
    color: Colors.text.secondary,
  },
  contentContainer: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  stockCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  stockLeft: {
    flex: 1,
  },
  stockSymbol: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  stockExchange: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  stockRight: {
    alignItems: 'flex-end',
  },
  stockPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 13,
    fontWeight: '600',
  },
});