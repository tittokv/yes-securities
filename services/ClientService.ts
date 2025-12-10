//Here im handleing all client information related data operations

import clientData from '@/data/client-information.json';

export interface ClientInformation {
    clientId: string;
    emailId: string;
    phoneNumber: string;
    dateOfBirth: string;
    clientName: string;
    bankName: string;
    powerOfAttorney: string;
    loginId: string;
    passwordExpiryDate: string;
    ckyUpdateTime: string;
    accountType: string;
}

class ClientService {
    //getting client information here
    async getClientInformation(): Promise<ClientInformation> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return clientData as ClientInformation;
    }
}

export const clientService = new ClientService();
