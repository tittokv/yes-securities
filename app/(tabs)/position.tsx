
import { PositionOverallScreen } from "@/components/position/overall";
import { PositionTodayScreen } from "@/components/position/today";
import { TabView, Tab } from "@/components/ui/TabView";

import { GradientColors } from "@/constants/colors";
import { Spacing } from "@/constants/typography";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function PositionScreen() {
  const tabs: Tab[] = [
    {
      key: "PositionOverallScreen",
      label: "Overall",
      content: <PositionOverallScreen />,
    },
    {
      key: "PositionTodayScreen",
      label: "Today",
      content: <PositionTodayScreen />,
    },
  ];

  return (
    <LinearGradient colors={GradientColors.background} style={styles.root}>
      <View style={styles.tabWrapper}>
        <TabView tabs={tabs} defaultTab="PositionOverallScreen" />
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
