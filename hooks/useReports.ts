import { useState, useEffect, useCallback } from 'react';
import { reportsService } from '@/services/ReportsService';
import { ReportsData, ReportCategory, Segment, DateRange, GenerateReportParams } from '@/types/report';

interface UseReportsResult {
    data: ReportsData | null;
    categories: ReportCategory[];
    segments: Segment[];
    dateRanges: DateRange[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    generateReport: (params: GenerateReportParams) => Promise<void>;
    downloadReport: (params: GenerateReportParams) => Promise<void>;
    emailReport: (params: GenerateReportParams) => Promise<void>;
}

export function useReports(): UseReportsResult {
    const [data, setData] = useState<ReportsData | null>(null);
    const [categories, setCategories] = useState<ReportCategory[]>([]);
    const [segments, setSegments] = useState<Segment[]>([]);
    const [dateRanges, setDateRanges] = useState<DateRange[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await reportsService.getReports();
            setData(result);
            setCategories(result.categories);
            setSegments(result.segments);
            setDateRanges(result.dateRanges);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch reports data'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const generateReport = useCallback(async (params: GenerateReportParams) => {
        try {
            const result = await reportsService.generateReport(params);
            console.log('Report generated:', result);
            // You can add toast notification here
        } catch (err) {
            console.error('Failed to generate report', err);
        }
    }, []);

    const downloadReport = useCallback(async (params: GenerateReportParams) => {
        try {
            const result = await reportsService.downloadReport(params);
            console.log('Report download:', result);
            // You can add toast notification here
        } catch (err) {
            console.error('Failed to download report', err);
        }
    }, []);

    const emailReport = useCallback(async (params: GenerateReportParams) => {
        try {
            const result = await reportsService.emailReport(params);
            console.log('Report email:', result);
            // You can add toast notification here
        } catch (err) {
            console.error('Failed to email report', err);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        categories,
        segments,
        dateRanges,
        loading,
        error,
        refetch: fetchData,
        generateReport,
        downloadReport,
        emailReport,
    };
}
