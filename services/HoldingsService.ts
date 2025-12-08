/**
 * Holdings Service
 * 
 * Handles all holdings-related data operations.
 */

import holdingsData from '@/data/holdings.json';

export interface HoldingItem {
    id: string;
    symbol: string;
    exchange: string;
    ltp: number;
    quantity: number;
    currentValue: number;
}

export interface HoldingsData {
    totalHoldingValue: number;
    holdings: HoldingItem[];
}

class HoldingsService {
    /**
     * Get all holdings data
     * 
     * Future API integration:
     * return apiClient.get<HoldingsData>('/holdings');
     */
    async getHoldings(): Promise<HoldingsData> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return holdingsData as HoldingsData;
    }

    /**
     * Get holdings with search filter
     * 
     * Future API integration:
     * return apiClient.get<HoldingItem[]>('/holdings/search', { params: { query } });
     */
    async searchHoldings(searchQuery: string): Promise<HoldingItem[]> {
        await new Promise(resolve => setTimeout(resolve, 200));

        const query = searchQuery.toLowerCase();
        return holdingsData.holdings.filter(holding =>
            holding.symbol.toLowerCase().includes(query)
        ) as HoldingItem[];
    }

    /**
     * Get total holding value
     * 
     * Future API integration:
     * return apiClient.get<number>('/holdings/total-value');
     */
    async getTotalValue(): Promise<number> {
        await new Promise(resolve => setTimeout(resolve, 100));
        return holdingsData.totalHoldingValue;
    }
}

export const holdingsService = new HoldingsService();
