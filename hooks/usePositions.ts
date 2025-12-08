import { useState, useEffect, useCallback } from 'react';
import { positionService, PositionData, PositionSummary } from '@/services/PositionService';
import { StockItem } from '@/types/ipo';
import { PositionTab } from '@/types/position';

interface UsePositionsResult {
    data: PositionData | null;
    summary: PositionSummary | null;
    stocks: StockItem[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function usePositions(type: PositionTab): UsePositionsResult {
    const [data, setData] = useState<PositionData | null>(null);
    const [summary, setSummary] = useState<PositionSummary | null>(null);
    const [stocks, setStocks] = useState<StockItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await positionService.getPositions(type);
            setData(result);
            setSummary(result.summary);
            setStocks(result.stocks);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch positions data'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [type]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        summary,
        stocks,
        loading,
        error,
        refetch: fetchData
    };
}
