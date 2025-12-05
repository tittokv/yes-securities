import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Colors, GradientColors } from '@/constants/colors';
import { BorderRadius, FontSizes, FontWeights, Spacing } from '@/constants/typography';

type Props = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

export function TabButton({ label, isActive, onPress }: Props) {
  // Animation values
  const scaleAnim = useRef(new Animated.Value(isActive ? 1 : 0.96)).current;
  const opacityAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  const textColorAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

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
      Animated.timing(textColorAnim, {
        toValue: isActive ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isActive, scaleAnim, opacityAnim, textColorAnim]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const interpolatedTextColor = textColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.text.secondary, Colors.white],
  });

  return (
    <TouchableOpacity
      style={styles.tab}
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={label}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Gradient background with fade animation */}
        <Animated.View
          style={[
            styles.gradientContainer,
            { opacity: opacityAnim },
          ]}
        >
          <LinearGradient
            colors={GradientColors.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          />
        </Animated.View>

        {/* Text with color transition */}
        <View style={styles.textContainer}>
          <Animated.Text
            style={[
              styles.tabText,
              isActive ? styles.activeText : styles.inactiveText,
              { color: interpolatedTextColor },
            ]}
          >
            {label}
          </Animated.Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
  },
  container: {
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
  textContainer: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: FontSizes.md,
  },
  activeText: {
    fontWeight: FontWeights.bold,
  },
  inactiveText: {
    fontWeight: FontWeights.semibold,
  },
});