//All nominee services here 

import nomineeData from '@/data/nominee-details.json';

export interface NomineeDetails {
    name: string;
    shares: string;
    relation: string;
    dateOfBirth: string;
    idProof: string;
    address: string;
    clientAddress: string;
}

class NomineeService {
    // nomineee detaikls here 
    async getNomineeDetails(): Promise<NomineeDetails> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return nomineeData as NomineeDetails;
    }
}

export const nomineeService = new NomineeService();
