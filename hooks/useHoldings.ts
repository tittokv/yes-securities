import { useState, useEffect, useCallback } from 'react';
import { holdingsService, HoldingsData, HoldingItem } from '@/services/HoldingsService';

interface UseHoldingsResult {
    data: HoldingsData | null;
    holdings: HoldingItem[];
    totalValue: number;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    searchHoldings: (query: string) => Promise<void>;
}

export function useHoldings(): UseHoldingsResult {
    const [data, setData] = useState<HoldingsData | null>(null);
    const [holdings, setHoldings] = useState<HoldingItem[]>([]);
    const [totalValue, setTotalValue] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await holdingsService.getHoldings();
            setData(result);
            setHoldings(result.holdings);
            setTotalValue(result.totalHoldingValue);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch holdings data'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const searchHoldings = useCallback(async (query: string) => {
        try {
            const result = await holdingsService.searchHoldings(query);
            setHoldings(result);
        } catch (err) {
            console.error('Failed to search holdings', err);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        holdings,
        totalValue,
        loading,
        error,
        refetch: fetchData,
        searchHoldings
    };
}
