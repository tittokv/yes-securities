//All portfolio services here 

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
    //geting portfolio data here 
    async getPortfolio(): Promise<PortfolioData> {
        //  API delay
        await new Promise(resolve => setTimeout(resolve, 300));

        return {
            summary: portfolioData.summary,
            stocks: portfolioData.stocks as StockItem[],
        };
    }

    //geting portfolio summary here 
    async getPortfolioSummary(): Promise<PortfolioSummary> {
        await new Promise(resolve => setTimeout(resolve, 200));
        return portfolioData.summary;
    }

    //geting portfolio stocks here 
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

    //refreshing portfolio data here 
    async refreshPortfolio(): Promise<PortfolioData> {
        await new Promise(resolve => setTimeout(resolve, 500));
        return this.getPortfolio();
    }
}

//  singleton instance
export const portfolioService = new PortfolioService();
