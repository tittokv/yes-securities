import { Colors, GradientColors } from '@/constants/colors';
import { BorderRadius, FontSizes, FontWeights, Shadows, Spacing } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface InfoCardProps {
    title: string;
    icon: string;
    items: string[];
}

export function InfoCard({ title, icon, items }: InfoCardProps) {
    return (
        <View style={styles.card}>
            <LinearGradient colors={GradientColors.card} style={styles.gradient}>
                <View style={styles.header}>
                    <Ionicons name={icon as any} size={24} color={Colors.primary} />
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={styles.content}>
                    {items.map((item, index) => (
                        <View key={index} style={styles.row}>
                            <View style={styles.dot} />
                            <Text style={styles.text}>{item}</Text>
                        </View>
                    ))}
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        ...Shadows.small,
    },
    gradient: {
        padding: Spacing.xl,
        borderWidth: 1,
        borderColor: Colors.border.primary,
        borderRadius: BorderRadius.xl,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        marginBottom: Spacing.lg,
    },
    title: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.bold,
        color: Colors.text.primary,
    },
    content: {
        gap: Spacing.md,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.primary,
    },
    text: {
        fontSize: FontSizes.base,
        color: Colors.text.secondary,
        fontWeight: FontWeights.medium,
        flex: 1,
    },
});
