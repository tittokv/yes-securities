import { useState, useEffect, useCallback } from 'react';
import { watchlistService, Watchlist } from '@/services/WatchlistService';

interface UseWatchlistResult {
    watchlists: Watchlist[];
    activeWatchlist: Watchlist | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    getWatchlistByKey: (key: string) => Watchlist | undefined;
}

export function useWatchlist(): UseWatchlistResult {
    const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
    const [activeWatchlist, setActiveWatchlist] = useState<Watchlist | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await watchlistService.getWatchlists();
            setWatchlists(result);

            if (result.length > 0 && !activeWatchlist) {
                setActiveWatchlist(result[0]);
            }

        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch watchlists'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [activeWatchlist]);

    const getWatchlistByKey = useCallback((key: string) => {
        return watchlists.find(w => w.key === key);
    }, [watchlists]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        watchlists,
        activeWatchlist,
        loading,
        error,
        refetch: fetchData,
        getWatchlistByKey
    };
}
