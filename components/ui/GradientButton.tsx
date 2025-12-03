import { GradientColors } from '@/constants/colors';
import { BorderRadius, FontSizes, FontWeights } from '@/constants/typography';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface GradientButtonProps {
    title: string;
    onPress?: () => void;
    gradientColors?: string[];
    style?: any;
}

export function GradientButton({
    title,
    onPress,
    gradientColors = GradientColors.primary,
    style
}: GradientButtonProps) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <LinearGradient colors={gradientColors} style={styles.gradient}>
                <Text style={styles.text}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        borderRadius: BorderRadius.md,
        overflow: 'hidden',
    },
    gradient: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    text: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.bold,
        color: '#ffffff',
    },
});
