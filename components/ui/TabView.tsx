import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { TabButton } from './TabButton';
import { BorderRadius, Spacing } from '@/constants/typography';

export type Tab = {
  key: string;
  label: string;
  content: React.ReactNode;
};

type Props = {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (tabKey: string) => void;
};

export function TabView({ tabs, defaultTab, onTabChange }: Props) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.key || '');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  const handleTabPress = (tabKey: string) => {
    if (tabKey === activeTab) return;

    // Ultra-smooth transition animation
    Animated.parallel([
      // Fade out current content
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      // Scale down slightly
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 200,
        useNativeDriver: true,
      }),
      // Slide up slightly
      Animated.timing(translateYAnim, {
        toValue: -10,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Change tab
      setActiveTab(tabKey);
      onTabChange?.(tabKey);

      // Reset position instantly
      translateYAnim.setValue(10);

      // Fade in and slide up new content with spring
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

  const activeTabContent = tabs.find(tab => tab.key === activeTab)?.content;

  return (
    <>
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TabButton
            key={tab.key}
            label={tab.label}
            isActive={activeTab === tab.key}
            onPress={() => handleTabPress(tab.key)}
          />
        ))}
      </View>

      {/* Animated Content Container with multiple transforms */}
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
        {activeTabContent}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: BorderRadius.lg,
    padding: 0,
    gap: Spacing.sm,
  },
  contentContainer: {
    flex: 1,
  },
});