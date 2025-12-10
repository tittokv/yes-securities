import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SectionList, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, GradientColors } from '@/constants/colors';
import { Spacing, BorderRadius, FontSizes, FontWeights } from '@/constants/typography';
import { useReports } from '@/hooks/useReports';
import { ReportCard } from '@/components/reports/ReportCard';
import { ReportType } from '@/types/report';

export default function ReportsScreen() {
    const router = useRouter();
    const { categories, segments, dateRanges, loading, generateReport, downloadReport, emailReport } = useReports();

    // transform categories into sections for SectionList
    const sections = categories.map(category => ({
        title: category.name,
        data: category.reports,
    }));

    const handleViewReport = (reportId: string, filters: any) => {
        console.log('View Report:', reportId, filters);

        // Navigate to report detail screen
        router.push({
            pathname: '/report-detail',
            params: {
                reportId,
                reportTitle: categories
                    .flatMap(cat => cat.reports)
                    .find(r => r.id === reportId)?.title || 'Report',
                segmentId: filters.segmentId,
                dateRangeId: filters.dateRangeId,
            },
        });
    };

    const handleDownload = (reportId: string, filters: any) => {
        console.log('Download Report:', reportId, filters);
        downloadReport({ reportId, filters });
    };

    const handleEmail = (reportId: string, filters: any) => {
        console.log('Email Report:', reportId, filters);
        emailReport({ reportId, filters });
    };

    if (loading && categories.length === 0) {
        return (
            <>
                <Stack.Screen options={{ headerShown: false }} />
                <SafeAreaView style={styles.safeArea} edges={['top']}>
                    <LinearGradient colors={GradientColors.background} style={styles.root}>
                        <View style={styles.centerContent}>
                            <ActivityIndicator size="large" color={Colors.primary} />
                        </View>
                    </LinearGradient>
                </SafeAreaView>
            </>
        );
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <LinearGradient colors={GradientColors.background} style={styles.root}>
                    {/* Header */}
                    <LinearGradient
                        colors={GradientColors.secondary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.header}
                    >
                        <View style={styles.headerContent}>
                            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                                <Ionicons name="arrow-back-outline" size={24} color="#ffffff" />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Reports</Text>
                            <View style={styles.headerActions}>
                                <TouchableOpacity style={styles.iconButton}>
                                    <Ionicons name="search" size={24} color="#ffffff" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconButton}>
                                    <Ionicons name="notifications-outline" size={24} color="#ffffff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>

                    {/* Reports List */}
                    <SectionList
                        sections={sections}
                        keyExtractor={(item, index) => item.id + index}
                        renderItem={({ item }) => (
                            <ReportCard
                                report={item}
                                segments={segments}
                                dateRanges={dateRanges}
                                onViewReport={handleViewReport}
                                onDownload={handleDownload}
                                onEmail={handleEmail}
                            />
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>{title}</Text>
                            </View>
                        )}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        stickySectionHeadersEnabled={false}
                    />
                </LinearGradient>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#347ab6',
    },
    root: {
        flex: 1,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffffff',
        flex: 1,
        marginLeft: 16,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 8,
    },
    iconButton: {
        padding: 4,
    },
    listContent: {
        padding: Spacing.lg,
    },
    sectionHeader: {
        paddingVertical: Spacing.sm,
        marginTop: Spacing.md,
    },
    sectionTitle: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.bold,
        color: Colors.primary,
    },
});

