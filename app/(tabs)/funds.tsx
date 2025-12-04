
import { FundLimitsScreen } from "@/components/funds/FundLimits";
import { TransactionHistory } from "@/components/funds/TransactionHistory";
import { TabView, Tab } from "@/components/ui/TabView";

import { GradientColors } from "@/constants/colors";
import { Spacing } from "@/constants/typography";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function FundsScreen() {
  const tabs: Tab[] = [
    {
      key: "FundLimitsScreen",
      label: "Fund/Limits",
      content: <FundLimitsScreen />,
    },
    {
      key: "TransactionHistory",
      label: "Transaction History",
      content: <TransactionHistory />,
    },
  ];

  return (
    <LinearGradient colors={GradientColors.background} style={styles.root}>
      <View style={styles.tabWrapper}>
        <TabView tabs={tabs} defaultTab="FundLimitsScreen" />
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
