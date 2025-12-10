import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNominee } from '@/hooks/useNominee';
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

export function NomineeDetails() {
    const { nomineeDetails, loading } = useNominee();

    if (loading && !nomineeDetails) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!nomineeDetails) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>No nominee details available</Text>
            </View>
        );
    }

    // Format date for better readability
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <LinearGradient colors={GradientColors.background} style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Nominee Details</Text>

                    <InfoRow label="Name" value={nomineeDetails.name} />
                    <InfoRow label="Shares" value={nomineeDetails.shares} />
                    <InfoRow label="Relation" value={nomineeDetails.relation} />
                    <InfoRow label="Date of Birth" value={formatDate(nomineeDetails.dateOfBirth)} />
                    <InfoRow label="ID Proof" value={nomineeDetails.idProof} />

                    <View style={styles.addressSection}>
                        <Text style={styles.addressLabel}>Address</Text>
                        <Text style={styles.addressValue}>{nomineeDetails.address}</Text>
                    </View>

                    <View style={styles.addressSection}>
                        <Text style={styles.addressLabel}>Client Address</Text>
                        <Text style={styles.addressValue}>{nomineeDetails.clientAddress}</Text>
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
    addressSection: {
        marginTop: Spacing.lg,
        paddingTop: Spacing.lg,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    addressLabel: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.medium,
        color: Colors.text.secondary,
        marginBottom: Spacing.sm,
    },
    addressValue: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.medium,
        color: Colors.text.primary,
        lineHeight: 22,
    },
    errorText: {
        fontSize: FontSizes.md,
        color: Colors.text.secondary,
    },
});
