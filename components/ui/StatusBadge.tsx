import { Colors } from '@/constants/colors';
import { BorderRadius, FontSizes, FontWeights } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatusBadgeProps {
    status: string;
    icon?: string;
    color?: string;
    backgroundColor?: string;
}

export function StatusBadge({ status, icon, color, backgroundColor }: StatusBadgeProps) {
    return (
        <View style={[styles.badge, backgroundColor && { backgroundColor }]}>
            {icon && <Ionicons name={icon as any} size={16} color={color || Colors.text.primary} />}
            <Text style={[styles.text, color && { color }]}>{status}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: BorderRadius.md,
    },
    text: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.bold,
    },
});
