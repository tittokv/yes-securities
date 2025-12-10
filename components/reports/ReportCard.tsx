import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, GradientColors } from '@/constants/colors';
import { Spacing, BorderRadius, FontSizes, FontWeights } from '@/constants/typography';
import { ReportType, Segment, DateRange, ReportFilters } from '@/types/report';
import { Dropdown } from './Dropdown';

interface ReportCardProps {
    report: ReportType;
    segments: Segment[];
    dateRanges: DateRange[];
    onViewReport: (reportId: string, filters: ReportFilters) => void;
    onDownload: (reportId: string, filters: ReportFilters) => void;
    onEmail: (reportId: string, filters: ReportFilters) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
    report,
    segments,
    dateRanges,
    onViewReport,
    onDownload,
    onEmail,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedSegment, setSelectedSegment] = useState<string | undefined>(
        report.hasSegmentFilter && segments.length > 0 ? segments[0].id : undefined
    );
    const [selectedDateRange, setSelectedDateRange] = useState<string | undefined>(
        report.hasDateRangeFilter && dateRanges.length > 0 ? dateRanges[0].id : undefined
    );

    const heightAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(heightAnim, {
                toValue: isExpanded ? 1 : 0,
                useNativeDriver: false,
                friction: 8,
                tension: 100,
            }),
            Animated.spring(rotateAnim, {
                toValue: isExpanded ? 1 : 0,
                useNativeDriver: true,
                friction: 8,
                tension: 100,
            }),
        ]).start();
    }, [isExpanded]);

    const toggleExpand = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIsExpanded(!isExpanded);
    };

    const handleAction = (action: 'view' | 'download' | 'email') => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        const filters: ReportFilters = {
            segmentId: selectedSegment,
            dateRangeId: selectedDateRange,
        };

        switch (action) {
            case 'view':
                onViewReport(report.id, filters);
                break;
            case 'download':
                onDownload(report.id, filters);
                break;
            case 'email':
                onEmail(report.id, filters);
                break;
        }
    };

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const maxHeight = heightAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 400],
    });

    return (
        <View style={styles.card}>
            {/* Card Header */}
            <TouchableOpacity
                onPress={toggleExpand}
                activeOpacity={0.7}
                style={styles.cardHeader}
            >
                <View style={styles.iconContainer}>
                    <Ionicons name={report.icon as any} size={24} color={Colors.primary} />
                </View>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>{report.title}</Text>
                    <Text style={styles.description}>{report.description}</Text>
                </View>
                <Animated.View style={{ transform: [{ rotate }] }}>
                    <Ionicons name="chevron-down" size={24} color={Colors.text.secondary} />
                </Animated.View>
            </TouchableOpacity>

            {/* expansion Content */}
            <Animated.View style={[styles.expandableContent, { maxHeight }]}>
                <View style={styles.filtersContainer}>
                    {/* Segment Filter */}
                    {report.hasSegmentFilter && segments.length > 0 && (
                        <Dropdown
                            label="Segment"
                            options={segments}
                            selectedId={selectedSegment}
                            onSelect={setSelectedSegment}
                            placeholder="Select Segment"
                        />
                    )}

                    {/* Date Range Filter */}
                    {report.hasDateRangeFilter && dateRanges.length > 0 && (
                        <Dropdown
                            label="Date Range"
                            options={dateRanges}
                            selectedId={selectedDateRange}
                            onSelect={setSelectedDateRange}
                            placeholder="Select Date Range"
                        />
                    )}

                    {/* Action Buttons */}
                    <View style={styles.actionsContainer}>
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => handleAction('view')}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.primaryButtonText}>View Report</Text>
                        </TouchableOpacity>

                        <View style={styles.secondaryActions}>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => handleAction('download')}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="download-outline" size={24} color={Colors.text.primary} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => handleAction('email')}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="mail-outline" size={24} color={Colors.text.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.md,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: Colors.border.light,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.lg,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.md,
        backgroundColor: `${Colors.primary}15`,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    headerContent: {
        flex: 1,
        marginRight: Spacing.sm,
    },
    title: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.bold,
        color: Colors.text.primary,
        marginBottom: 4,
    },
    description: {
        fontSize: FontSizes.sm,
        color: Colors.text.secondary,
        lineHeight: 18,
    },
    expandableContent: {
        overflow: 'hidden',
    },
    filtersContainer: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.lg,
    },
    actionsContainer: {
        marginTop: Spacing.md,
    },
    primaryButton: {
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.md,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    primaryButtonText: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.bold,
        color: Colors.white,
    },
    secondaryActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: Spacing.lg,
    },
    iconButton: {
        width: 48,
        height: 48,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.background.gradient1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border.medium,
    },
});
