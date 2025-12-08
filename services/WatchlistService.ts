/**
 * Watchlist Service
 * 
 * Handles all watchlist-related data operations.
 */

import watchlistsData from '@/data/watchlists.json';

export interface WatchlistStock {
    symbol: string;
    exchange: string;
    price: string;
    change: string;
    changePercent: string;
    isPositive: boolean;
}

export interface Watchlist {
    key: string;
    label: string;
    stocks: WatchlistStock[];
}

export interface WatchlistsData {
    watchlists: Watchlist[];
}

class WatchlistService {
    /**
     * Get all watchlists
     * 
     * Future API integration:
     * return apiClient.get<Watchlist[]>('/watchlists');
     */
    async getWatchlists(): Promise<Watchlist[]> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return watchlistsData.watchlists;
    }

    /**
     * Get a specific watchlist by key/ID
     * 
     * Future API integration:
     * return apiClient.get<Watchlist>(`/watchlists/${key}`);
     */
    async getWatchlist(key: string): Promise<Watchlist | undefined> {
        await new Promise(resolve => setTimeout(resolve, 200));
        return watchlistsData.watchlists.find(w => w.key === key);
    }

    /**
     * Add a stock to a watchlist
     * 
     * Future API integration:
     * return apiClient.post('/watchlists/add-stock', { watchlistKey, symbol });
     */
    async addStockToWatchlist(watchlistKey: string, symbol: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 400));
        console.log(`Mock: Added ${symbol} to ${watchlistKey}`);
    }

    /**
     * Remove a stock from a watchlist
     * 
     * Future API integration:
     * return apiClient.post('/watchlists/remove-stock', { watchlistKey, symbol });
     */
    async removeStockFromWatchlist(watchlistKey: string, symbol: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 400));
        console.log(`Mock: Removed ${symbol} from ${watchlistKey}`);
    }
}

export const watchlistService = new WatchlistService();
