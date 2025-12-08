/**
 * Portfolio Service
 * 
 * Handles all portfolio-related data operations.
 * Currently loads data from local JSON, but ready for API integration.
 */

import portfolioData from '@/data/portfolio.json';
import { StockItem } from '@/types/ipo';

export interface PortfolioSummary {
    currentValue: number;
    amountInvested: number;
    totalProfitLoss: number;
    totalProfitLossPercent: number;
    todayPL: number;
    todayPLPercent: number;
}

export interface PortfolioData {
    summary: PortfolioSummary;
    stocks: StockItem[];
}

class PortfolioService {
    /**
     * Get complete portfolio data including summary and stocks
     * 
     * Future API integration:
     * return apiClient.get<PortfolioData>('/portfolio');
     */
    async getPortfolio(): Promise<PortfolioData> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));

        return {
            summary: portfolioData.summary,
            stocks: portfolioData.stocks as StockItem[],
        };
    }

    /**
     * Get only portfolio summary
     * 
     * Future API integration:
     * return apiClient.get<PortfolioSummary>('/portfolio/summary');
     */
    async getPortfolioSummary(): Promise<PortfolioSummary> {
        await new Promise(resolve => setTimeout(resolve, 200));
        return portfolioData.summary;
    }

    /**
     * Get portfolio stocks with optional search filter
     * 
     * Future API integration:
     * return apiClient.get<StockItem[]>('/portfolio/stocks', { params: { search } });
     */
    async getPortfolioStocks(searchQuery?: string): Promise<StockItem[]> {
        await new Promise(resolve => setTimeout(resolve, 200));

        let stocks = portfolioData.stocks as StockItem[];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            stocks = stocks.filter(stock =>
                stock.name.toLowerCase().includes(query)
            );
        }

        return stocks;
    }

    /**
     * Refresh portfolio data (for pull-to-refresh)
     * 
     * Future API integration:
     * return apiClient.post<PortfolioData>('/portfolio/refresh');
     */
    async refreshPortfolio(): Promise<PortfolioData> {
        await new Promise(resolve => setTimeout(resolve, 500));
        return this.getPortfolio();
    }
}

// Export singleton instance
export const portfolioService = new PortfolioService();
