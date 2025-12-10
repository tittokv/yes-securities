import { useState, useEffect, useCallback } from 'react';
import {
    bankAccountService,
    BankAccountData
} from '@/services/BankAcoountService';

interface UseBankAccountResult {
    bankAccountData: BankAccountData | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useBankAccount(): UseBankAccountResult {
    const [bankAccountData, setBankAccountData] = useState<BankAccountData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await bankAccountService.getBankAccountDetails();
            setBankAccountData(data);

        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch bank account data'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        bankAccountData,
        loading,
        error,
        refetch: fetchData
    };
}
