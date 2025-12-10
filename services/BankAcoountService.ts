//bank accoount details
import bankAccountData from '@/data/bank-account-details.json';

export interface BankAccountData {
    bankAccountNumber: string;
    bankBranchIFSC: string;
    depository: string;
    panCard: string;
    instruments: string[];
    segments: string[];
    activatedSegments: string[];
    dormantStatus: string | null;
}

class BankAccountService {
    //get bank details
    async getBankAccountDetails(): Promise<BankAccountData> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return bankAccountData as BankAccountData;
    }
}

export const bankAccountService = new BankAccountService();