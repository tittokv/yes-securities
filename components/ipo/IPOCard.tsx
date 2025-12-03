import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Colors } from '@/constants/colors';
import { BorderRadius, FontSizes, FontWeights, Spacing } from '@/constants/typography';
import { IPOApplication } from '@/types/ipo';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IPOCardProps {
    application: IPOApplication;
}

export function IPOCard({ application }: IPOCardProps) {
    const { statusColor, statusBgColor, statusIcon } = getStatusStyles(application.status);

    return (
        <AnimatedCard>
            <View style={styles.header}>
                <View style={styles.companyContainer}>
                    <View style={[styles.companyIcon, { backgroundColor: statusBgColor }]}>
                        <Text style={[styles.companyInitial, { color: statusColor }]}>
                            {application.companyName.charAt(0)}
                        </Text>
                    </View>
                    <View style={styles.companyInfo}>
                        <Text style={styles.companyName} numberOfLines={1}>
                            {application.companyName}
                        </Text>
                        <Text style={styles.applicationNumber}>{application.applicationNumber}</Text>
                    </View>
                </View>

                <StatusBadge
                    status={application.status}
                    icon={statusIcon}
                    color={statusColor}
                    backgroundColor={statusBgColor}
                />
            </View>

            <View style={styles.divider} />

            <View style={styles.detailsGrid}>
                <DetailItem label="Bid Price" value={`₹ ${application.bidPrice}`} />
                <DetailItem label="Quantity" value={application.quantity.toString()} />
                <DetailItem label="Total Amount" value={`₹ ${application.totalAmount.toLocaleString('en-IN')}`} />
                <DetailItem
                    label="Applied Date"
                    value={new Date(application.appliedDate).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                    })}
                />
            </View>

            {application.status === 'Allotted' && application.allottedQuantity > 0 && (
                <View style={styles.allotmentInfo}>
                    <Ionicons name="gift-outline" size={18} color={Colors.success} />
                    <Text style={styles.allotmentText}>
                        Allotted: <Text style={styles.allotmentValue}>{application.allottedQuantity} shares</Text>
                    </Text>
                </View>
            )}
        </AnimatedCard>
    );
}

function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
    );
}

function getStatusStyles(status: string) {
    switch (status) {
        case 'Allotted':
            return {
                statusColor: Colors.success,
                statusBgColor: 'rgba(16, 185, 129, 0.15)',
                statusIcon: 'checkmark-circle',
            };
        case 'Applied':
            return {
                statusColor: Colors.warning,
                statusBgColor: 'rgba(245, 158, 11, 0.15)',
                statusIcon: 'time',
            };
        case 'Rejected':
            return {
                statusColor: Colors.error,
                statusBgColor: 'rgba(239, 68, 68, 0.15)',
                statusIcon: 'close-circle',
            };
        default:
            return {
                statusColor: Colors.text.secondary,
                statusBgColor: 'rgba(100, 116, 139, 0.15)',
                statusIcon: 'help-circle',
            };
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.md,
    },
    companyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        flex: 1,
    },
    companyIcon: {
        width: 48,
        height: 48,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    companyInitial: {
        fontSize: FontSizes['2xl'],
        fontWeight: FontWeights.bold,
    },
    companyInfo: {
        flex: 1,
    },
    companyName: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.bold,
        color: Colors.text.primary,
        marginBottom: 4,
        letterSpacing: 0.2,
    },
    applicationNumber: {
        fontSize: FontSizes.xs,
        color: Colors.text.secondary,
        fontWeight: FontWeights.semibold,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border.medium,
        marginBottom: Spacing.lg,
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.lg,
    },
    detailItem: {
        width: '47%',
    },
    detailLabel: {
        fontSize: FontSizes.xs,
        color: Colors.text.secondary,
        fontWeight: FontWeights.semibold,
        marginBottom: 4,
    },
    detailValue: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.bold,
        color: Colors.text.primary,
    },
    allotmentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        marginTop: Spacing.md,
        paddingTop: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.border.medium,
    },
    allotmentText: {
        fontSize: FontSizes.base,
        color: Colors.text.secondary,
        fontWeight: FontWeights.semibold,
    },
    allotmentValue: {
        color: Colors.success,
        fontWeight: FontWeights.bold,
    },
});
