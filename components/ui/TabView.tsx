import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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

  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
    onTabChange?.(tabKey);
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
      {activeTabContent}
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
});