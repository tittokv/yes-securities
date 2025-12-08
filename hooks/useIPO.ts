import { useState, useEffect, useCallback } from 'react';
import { ipoService, IPOApplication, IPOSummary } from '@/services/IPOService';

interface UseIPOResult {
    applications: IPOApplication[];
    summary: IPOSummary | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useIPO(): UseIPOResult {
    const [applications, setApplications] = useState<IPOApplication[]>([]);
    const [summary, setSummary] = useState<IPOSummary | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const [appsResult, summaryResult] = await Promise.all([
                ipoService.getApplications(),
                ipoService.getSummary()
            ]);

            setApplications(appsResult);
            setSummary(summaryResult);

        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch IPO data'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        applications,
        summary,
        loading,
        error,
        refetch: fetchData
    };
}
