// watchlist services  

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
    //geting all watchlists  
    async getWatchlists(): Promise<Watchlist[]> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return watchlistsData.watchlists;
    }

    //geting watchlist by key
    async getWatchlist(key: string): Promise<Watchlist | undefined> {
        await new Promise(resolve => setTimeout(resolve, 200));
        return watchlistsData.watchlists.find(w => w.key === key);
    }

    //add stock to watchlist 
    async addStockToWatchlist(watchlistKey: string, symbol: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 400));
        console.log(`Mock: Added ${symbol} to ${watchlistKey}`);
    }

    //remove stock from watchlist
    async removeStockFromWatchlist(watchlistKey: string, symbol: string): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 400));
        console.log(`Mock: Removed ${symbol} from ${watchlistKey}`);
    }
}

export const watchlistService = new WatchlistService();
