import { useState, useEffect, useCallback } from 'react';
import {
    clientService,
    ClientInformation
} from '@/services/ClientService';

interface UseClientInfoResult {
    clientInfo: ClientInformation | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useClientInfo(): UseClientInfoResult {
    const [clientInfo, setClientInfo] = useState<ClientInformation | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await clientService.getClientInformation();
            setClientInfo(data);

        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch client information'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        clientInfo,
        loading,
        error,
        refetch: fetchData
    };
}
