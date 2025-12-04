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
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 64;

export function TransactionHistory() {
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
        <View style={styles.transRow}>
          {/* Line 1: Month */}
          <Text style={styles.transMonthText}>October 2025</Text>

          <View>
            {/* Line 2: icon + label (left) and amount (right) */}
            <View style={styles.transMiddleRow}>
              <View style={styles.transLabelRow}>
                <Ionicons
                  name="arrow-down-outline"
                  size={18}
                  style={styles.transIcon}
                />
                <Text style={styles.transLabel}>Amount Deposted</Text>
              </View>

              <Text style={styles.transAmount}>₹190.90</Text>
            </View>

            {/* Line 3: date under the label */}
            <Text style={styles.transDateMonth}>02 Oct 2025</Text>
          </View>

          <View>
            {/* Line 2: icon + label (left) and amount (right) */}
            <View style={styles.transMiddleRow}>
              <View style={styles.transLabelRow}>
                <Ionicons
                  name="arrow-down-outline"
                  size={18}
                  style={styles.transIcon}
                />
                <Text style={styles.transLabel}>Amount Deposted</Text>
              </View>

              <Text style={styles.transAmount}>₹110.90</Text>
            </View>

            {/* Line 3: date under the label */}
            <Text style={styles.transDateMonth}>01 Oct 2025</Text>
          </View>
        </View>

        <View style={styles.transRow}>
          {/* Line 1: Month */}
          <Text style={styles.transMonthText}>September 2025</Text>

          <View>
            {/* Line 2: icon + label (left) and amount (right) */}
            <View style={styles.transMiddleRow}>
              <View style={styles.transLabelRow}>
                <Ionicons
                  name="arrow-down-outline"
                  size={18}
                  style={styles.transIcon}
                />
                <Text style={styles.transLabel}>Amount Deposted</Text>
              </View>

              <Text style={styles.transAmount}>₹1908.90</Text>
            </View>

            {/* Line 3: date under the label */}
            <Text style={styles.transDateMonth}>02 Sept 2025</Text>
          </View>

          <View>
            {/* Line 2: icon + label (left) and amount (right) */}
            <View style={styles.transMiddleRow}>
              <View style={styles.transLabelRow}>
                <Ionicons
                  name="arrow-down-outline"
                  size={18}
                  style={styles.transIcon}
                />
                <Text style={styles.transLabel}>Amount Deposted</Text>
              </View>

              <Text style={styles.transAmount}>₹127.90</Text>
            </View>

            {/* Line 3: date under the label */}
            <Text style={styles.transDateMonth}>01 Sept 2025</Text>
          </View>
        </View>
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
