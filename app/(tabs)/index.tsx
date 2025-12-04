import { TabView, Tab } from '@/components/ui/TabView';
import { PortfolioContent } from '@/components/portfolio/PortfolioContent';
import { HoldingsContent } from '@/components/portfolio/HoldingsContent';
import { GradientColors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const tabs: Tab[] = [
    {
      key: 'portfolio',
      label: 'Portfolio',
      content: <PortfolioContent />,
    },
    {
      key: 'holdings',
      label: 'Holdings',
      content: <HoldingsContent />,
    },
  ];

  return (
    <LinearGradient colors={GradientColors.background} style={styles.root}>
      <View style={styles.tabWrapper}>
        <TabView tabs={tabs} defaultTab="portfolio" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tabWrapper: {
    flex: 1,
    paddingTop: Spacing.md,
  },
});