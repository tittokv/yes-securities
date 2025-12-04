import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, GradientColors } from '@/constants/colors';
import { BorderRadius, FontSizes, FontWeights, Spacing } from '@/constants/typography';

type Props = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

export function TabButton({ label, isActive, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress}>
      {isActive ? (
        <LinearGradient
          colors={GradientColors.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.activeTabText}>{label}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.inactiveContainer}>
          <Text style={styles.tabText}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: BorderRadius.md,
  },
  gradient: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveContainer: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
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
});