import { useState, useEffect, useCallback } from 'react';
import {
    nomineeService,
    NomineeDetails
} from '@/services/NomineeService';

interface UseNomineeResult {
    nomineeDetails: NomineeDetails | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useNominee(): UseNomineeResult {
    const [nomineeDetails, setNomineeDetails] = useState<NomineeDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await nomineeService.getNomineeDetails();
            setNomineeDetails(data);

        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch nominee details'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        nomineeDetails,
        loading,
        error,
        refetch: fetchData
    };
}
