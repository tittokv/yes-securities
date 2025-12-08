/**
 * Funds Service
 * 
 * Handles all funds-related data operations.
 */

import fundsData from '@/data/funds.json';
import transactionsData from '@/data/transactions.json';

export interface FundBreakdownItem {
    label: string;
    value: number;
}

export interface FundSection {
    value: number;
    breakdown: FundBreakdownItem[];
}

export interface FundHistory {
    totalLimit: FundSection;
    totalUtilization: FundSection;
}

export interface FundsData {
    totalAvailableLimit: number;
    fundHistory: FundHistory;
}

export interface TransactionItem {
    id: string;
    type: string;
    label: string;
    amount: number;
    date: string;
}

export interface TransactionGroup {
    month: string;
    items: TransactionItem[];
}

export interface TransactionsData {
    transactions: TransactionGroup[];
}

class FundsService {
    /**
     * Get fund limits and utilization data
     * 
     * Future API integration:
     * return apiClient.get<FundsData>('/funds/limits');
     */
    async getFundLimits(): Promise<FundsData> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return fundsData;
    }

    /**
     * Get transaction history
     * 
     * Future API integration:
     * return apiClient.get<TransactionsData>('/funds/transactions');
     */
    async getTransactionHistory(): Promise<TransactionsData> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return transactionsData;
    }

    /**
     * Get combined funds data
     * 
     * Future API integration:
     * const [limits, transactions] = await Promise.all([
     *   this.getFundLimits(),
     *   this.getTransactionHistory()
     * ]);
     * return { limits, transactions };
     */
    async getAllFundsData() {
        await new Promise(resolve => setTimeout(resolve, 400));
        return {
            limits: fundsData,
            transactions: transactionsData
        };
    }
}

export const fundsService = new FundsService();
