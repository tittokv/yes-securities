import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useBankAccount } from '@/hooks/useBankAccount';
import { Colors, GradientColors } from '@/constants/colors';
import { BorderRadius, FontSizes, FontWeights, Spacing } from '@/constants/typography';

interface InfoRowProps {
    label: string;
    value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

interface ChipProps {
    text: string;
}

const Chip: React.FC<ChipProps> = ({ text }) => (
    <View style={styles.chip}>
        <Text style={styles.chipText}>{text}</Text>
    </View>
);

export function BankAccountDetails() {
    const { bankAccountData, loading } = useBankAccount();

    if (loading && !bankAccountData) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!bankAccountData) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>No bank account details available</Text>
            </View>
        );
    }

    return (
        <LinearGradient colors={GradientColors.background} style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Bank & Account Details</Text>

                    <InfoRow label="Bank Account Number" value={bankAccountData.bankAccountNumber} />
                    <InfoRow label="Bank Branch IFC Code" value={bankAccountData.bankBranchIFSC} />
                    <InfoRow label="Depository" value={bankAccountData.depository} />
                    <InfoRow label="Pan Card" value={bankAccountData.panCard} />

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Instrument</Text>
                        <View style={styles.chipContainer}>
                            {bankAccountData.instruments.map((instrument, index) => (
                                <Chip key={index} text={instrument} />
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Segments</Text>
                        <View style={styles.chipContainer}>
                            {bankAccountData.segments.map((segment, index) => (
                                <Chip key={index} text={segment} />
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Activated Segments</Text>
                        <View style={styles.chipContainer}>
                            {bankAccountData.activatedSegments.map((segment, index) => (
                                <Chip key={index} text={segment} />
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: Spacing.lg,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: BorderRadius.xl,
        padding: Spacing.xl,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    cardTitle: {
        fontSize: FontSizes.xl,
        fontWeight: FontWeights.bold,
        color: Colors.text.primary,
        marginBottom: Spacing.lg,
        textAlign: 'center',
    },
    infoRow: {
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    label: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.medium,
        color: Colors.text.secondary,
        marginBottom: 4,
    },
    value: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.semibold,
        color: Colors.text.primary,
    },
    section: {
        marginTop: Spacing.lg,
        paddingTop: Spacing.lg,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    sectionTitle: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.bold,
        color: Colors.text.primary,
        marginBottom: Spacing.md,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    chip: {
        backgroundColor: '#e0f2fe',
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderWidth: 1,
        borderColor: '#bae6fd',
    },
    chipText: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.medium,
        color: '#0369a1',
    },
    errorText: {
        fontSize: FontSizes.md,
        color: Colors.text.secondary,
    },
});
