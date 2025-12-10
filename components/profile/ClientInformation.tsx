import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useClientInfo } from '@/hooks/useClientInfo';
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

export function ClientInformation() {
    const { clientInfo, loading } = useClientInfo();

    if (loading && !clientInfo) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!clientInfo) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>No client information available</Text>
            </View>
        );
    }

    // Format dates for better readability
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
                    <Text style={styles.cardTitle}>Client Information</Text>

                    <InfoRow label="Client ID" value={clientInfo.clientId} />
                    <InfoRow label="Email ID" value={clientInfo.emailId} />
                    <InfoRow label="Phone Number" value={clientInfo.phoneNumber} />
                    <InfoRow label="Date of Birth" value={formatDate(clientInfo.dateOfBirth)} />
                    <InfoRow label="Client Name" value={clientInfo.clientName} />
                    <InfoRow label="Bank Name" value={clientInfo.bankName} />
                    <InfoRow label="Power of Attorney" value={clientInfo.powerOfAttorney} />
                    <InfoRow label="Login ID" value={clientInfo.loginId} />
                    <InfoRow label="Password Expiry Date" value={formatDate(clientInfo.passwordExpiryDate)} />
                    <InfoRow label="CKY Update time" value={formatDate(clientInfo.ckyUpdateTime)} />
                    <InfoRow label="Account Type" value={clientInfo.accountType} />
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
    errorText: {
        fontSize: FontSizes.md,
        color: Colors.text.secondary,
    },
});
