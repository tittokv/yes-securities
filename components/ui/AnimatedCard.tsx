import { GradientColors } from '@/constants/colors';
import { BorderRadius, Shadows } from '@/constants/typography';
import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode, useState } from 'react';
import { Animated, Pressable, StyleSheet, ViewStyle } from 'react-native';

interface AnimatedCardProps {
    children: ReactNode;
    gradientColors?: string[];
    style?: ViewStyle;
    onPress?: () => void;
}

export function AnimatedCard({
    children,
    gradientColors = GradientColors.card,
    style,
    onPress
}: AnimatedCardProps) {
    const [scaleAnim] = useState(new Animated.Value(1));

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.98,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            disabled={!onPress}
        >
            <Animated.View style={[styles.card, style, { transform: [{ scale: scaleAnim }] }]}>
                <LinearGradient colors={gradientColors} style={styles.gradient}>
                    {children}
                </LinearGradient>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        ...Shadows.medium,
    },
    gradient: {
        padding: 18,
        borderRadius: BorderRadius.xl,
        borderWidth: 1,
        borderColor: 'rgba(99, 102, 241, 0.1)',
    },
});
