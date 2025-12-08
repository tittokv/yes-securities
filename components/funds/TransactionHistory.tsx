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
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFunds } from "@/hooks/useFunds";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 64;

export function TransactionHistory() {
  const [activeTab, setActiveTab] = useState<PositionTab>("overall");
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const { transactions, loading } = useFunds();

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (CARD_WIDTH + 16));
    setCurrentCardIndex(index);
  };

  if (loading && transactions.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <LinearGradient colors={GradientColors.background} style={styles.container}>
      <View style={styles.summaryRow}>
        <Text style={styles.positionMainCardTitle}>Transfer History</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={CARD_WIDTH + 16}
        decelerationRate="fast"
      >
        {transactions.map((group, index) => (
          <View key={index} style={styles.transRow}>
            {/* Line 1: Month */}
            <Text style={styles.transMonthText}>{group.month}</Text>

            {group.items.map((item) => (
              <View key={item.id}>
                {/* Line 2: icon + label (left) and amount (right) */}
                <View style={styles.transMiddleRow}>
                  <View style={styles.transLabelRow}>
                    <Ionicons
                      name="arrow-down-outline"
                      size={18}
                      style={styles.transIcon}
                    />
                    <Text style={styles.transLabel}>{item.label}</Text>
                  </View>

                  <Text style={styles.transAmount}>₹{item.amount.toFixed(2)}</Text>
                </View>

                {/* Line 3: date under the label */}
                <Text style={styles.transDateMonth}>{item.date}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  transRow: {
    alignItems: "flex-start",
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: Spacing.md,
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // NEW: middle row – label+icon left, amount right
  transMiddleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 8,
  },

  // NEW: icon + label container
  transLabelRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  // NEW: arrow icon style
  transIcon: {
    fontSize: 18,
    marginRight: 6,
    color: "#a91919ff",
  },

  transMonthText: {
    color: "#1c0202ff",
    fontSize: 15,
    fontWeight: FontWeights.bold,
  },
  transLabel: {
    color: "#1b0202ff",
    fontSize: 14,
    fontWeight: FontWeights.medium,
  },
  transAmount: {
    color: "#df2828ff",
    fontSize: 16,
    fontWeight: FontWeights.bold,
  },
  transDateMonth: {
    color: "#afa2a2ff",
    fontSize: 10,
    fontWeight: FontWeights.medium,
    marginTop: 0,
    marginLeft: 27, // sits nicely under "Amount Deposted"
  },

  container: {
    flex: 1,
  },

  positionMainCardTitle: {
    color: "#969494ff",
    fontSize: 16,
    fontWeight: FontWeights.bold,
  },

  summaryRow: {
    alignItems: "center",
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
  },

  cardsContainer: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
  },
});
