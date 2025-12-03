import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { Colors } from '@/constants/colors';
import { BorderRadius, FontSizes, FontWeights, Spacing } from '@/constants/typography';
import { PortfolioSection } from '@/types/portfolio';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface PortfolioCardProps {
    section: PortfolioSection;
}

export function PortfolioCard({ section }: PortfolioCardProps) {
    return (
        <AnimatedCard>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <View style={styles.iconCircle}>
                        <Ionicons name={section.icon as any} size={20} color={Colors.primary} />
                    </View>
                    <Text style={styles.title}>{section.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} />
            </View>

            <View style={styles.divider} />

            {section.data.map((item, idx) => (
                <View
                    key={item.id}
                    style={[
                        styles.itemRow,
                        idx === section.data.length - 1 && styles.lastItemRow
                    ]}
                >
                    <View style={styles.itemColumn}>
                        <Text style={styles.itemLabel}>{item.label}</Text>
                        <Text
                            style={[
                                styles.itemValue,
                                item.isPositive !== undefined && (item.isPositive ? styles.positiveValue : styles.negativeValue)
                            ]}
                        >
                            {item.value}
                        </Text>
                    </View>
                </View>
            ))}
        </AnimatedCard>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.md,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: FontSizes.xl,
        fontWeight: FontWeights.bold,
        color: Colors.text.primary,
        letterSpacing: 0.3,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border.medium,
        marginVertical: Spacing.md,
    },
    itemRow: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border.light,
    },
    lastItemRow: {
        borderBottomWidth: 0,
    },
    itemColumn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemLabel: {
        fontSize: FontSizes.base,
        color: Colors.text.secondary,
        fontWeight: FontWeights.semibold,
        letterSpacing: 0.2,
    },
    itemValue: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.bold,
        letterSpacing: 0.3,
        color: Colors.text.primary,
    },
    positiveValue: {
        color: Colors.success,
    },
    negativeValue: {
        color: Colors.error,
    },
});
