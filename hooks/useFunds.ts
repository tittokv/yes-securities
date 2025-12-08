import { useState, useEffect, useCallback } from 'react';
import {
    fundsService,
    FundsData,
    TransactionsData,
    FundHistory,
    TransactionGroup
} from '@/services/FundsService';

interface UseFundsResult {
    fundsData: FundsData | null;
    fundHistory: FundHistory | null;
    transactions: TransactionGroup[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useFunds(): UseFundsResult {
    const [fundsData, setFundsData] = useState<FundsData | null>(null);
    const [fundHistory, setFundHistory] = useState<FundHistory | null>(null);
    const [transactions, setTransactions] = useState<TransactionGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const { limits, transactions: transData } = await fundsService.getAllFundsData();

            setFundsData(limits);
            setFundHistory(limits.fundHistory);
            setTransactions(transData.transactions);

        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch funds data'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        fundsData,
        fundHistory,
        transactions,
        loading,
        error,
        refetch: fetchData
    };
}
