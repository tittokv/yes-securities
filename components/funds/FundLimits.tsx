import { IPOCard } from "@/components/ipo/IPOCard";
import { Colors, GradientColors } from "@/constants/colors";
import {
  BorderRadius,
  FontSizes,
  FontWeights,
  Spacing,
} from "@/constants/typography";
import { StockItem } from "@/types/ipo";
import { Position, PositionTab } from "@/types/position";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ExpandableBox } from "../ui/ExpandableBox";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 64;

export function FundLimitsScreen() {
  const [activeTab, setActiveTab] = useState<PositionTab>("overall");
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (CARD_WIDTH + 16));
    setCurrentCardIndex(index);
  };

  return (
    <LinearGradient colors={GradientColors.background} style={styles.container}>
      <View style={styles.summaryRow}>
        <Text style={styles.positionMainCardTitle}>Total Available Limit</Text>
        <Text style={styles.positionMainCardAmount}>₹10,909</Text>
      </View>

      <View style={styles.fundHistoryHead}>
        <Text style={styles.fundHistoryHeadTitle}>Fund History</Text>
      </View>

      <View style={styles.expandableBoxSet}>
        <ExpandableBox
          title="Total Limit"
          value={157}
          rows={[
            { label: "Ledger Balance", value: 2330 },
            { label: "Fund Hold", value: 0 },
            { label: "Receivables", value: 0 },
            { label: "Adhoc Limit", value: 0 },
            { label: "Collateral Limit", value: 0 },
          ]}
        />
      </View>

      <View style={styles.expandableBoxSet}>
        <ExpandableBox
          title="Total Utilization"
          value={146}
          rows={[
            { label: "Equity Delivery", value: 123 },
            { label: "Equity Intraday", value: 0 },
            { label: "Margin Funding (MTF)", value: 5 },
          ]}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fundHistoryHead: {
    marginLeft: 16,
  },
  expandableBoxSet: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 30,
  },

  fundHistoryHeadTitle: {
    fontSize: 20,
    fontWeight: FontWeights.medium,
  },

  stockList: {
    gap: Spacing.md,
    paddingBottom: Spacing["3xl"],
  },

  container: {
    flex: 1,
  },

  positionMainCardTitle: {
    color: "#969494ff",
    fontSize: 18,
    fontWeight: FontWeights.bold,
  },

  positionMainCardAmount: {
    color: "#3a0b0bff",
    fontSize: 22,
    fontWeight: FontWeights.bold,
    marginTop: 5,
  },

  summaryRow: {
    alignItems: "center",
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
  },

  applicationsList: {
    gap: Spacing.lg,
  },

  tabContainer: {
    flexDirection: "row",
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: BorderRadius.lg,
    padding: 4,
    gap: Spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: "center",
  },
  activeTab: {
    overflow: "hidden",
  },
  activeTabGradient: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing["2xl"],
    borderRadius: BorderRadius.md,
    width: "100%",
    alignItems: "center",
  },
  tabText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: Colors.text.secondary,
  },
  activeTabText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
    color: Colors.white,
  },

  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  summaryLabel: {
    fontSize: FontSizes.sm,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: FontWeights.semibold,
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.white,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    ...{
      shadowColor: Colors.primary,
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 3,
    },
  },
  controlButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  indicatorContainer: {
    flexDirection: "row",
    gap: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(99, 102, 241, 0.3)",
  },
  activeIndicator: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  cardsContainer: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
  },
});
