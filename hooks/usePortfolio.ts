import { useState, useEffect, useCallback } from 'react';
import { portfolioService, PortfolioData, PortfolioSummary } from '@/services/PortfolioService';
import { StockItem } from '@/types/ipo';

interface UsePortfolioResult {
    data: PortfolioData | null;
    summary: PortfolioSummary | null;
    stocks: StockItem[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    filterStocks: (query: string) => Promise<void>;
}

export function usePortfolio(): UsePortfolioResult {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [summary, setSummary] = useState<PortfolioSummary | null>(null);
    const [stocks, setStocks] = useState<StockItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await portfolioService.getPortfolio();
            setData(result);
            setSummary(result.summary);
            setStocks(result.stocks);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch portfolio data'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const filterStocks = useCallback(async (query: string) => {
        try {

            //   update the stocks list HERE 
            const result = await portfolioService.getPortfolioStocks(query);
            setStocks(result);
        } catch (err) {
            console.error('Failed to filter stocks', err);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        summary,
        stocks,
        loading,
        error,
        refetch: fetchData,
        filterStocks
    };
}
