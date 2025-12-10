//All IPO services here 

import ipoData from '@/data/ipo.json';

export interface IPOApplication {
    id: string;
    companyName: string;
    applicationNumber: string;
    bidPrice: number;
    quantity: number;
    totalAmount: number;
    status: 'Allotted' | 'Applied' | 'Rejected';
    allottedQuantity: number;
    appliedDate: string;
}

export interface IPOData {
    applications: IPOApplication[];
}

export interface IPOSummary {
    totalApplications: number;
    allottedCount: number;
    pendingCount: number;
    rejectedCount: number;
}

class IPOService {
    //getinng all IPO
    async getApplications(): Promise<IPOApplication[]> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return ipoData.applications as IPOApplication[];
    }

    //geting IPO summary here 
    async getSummary(): Promise<IPOSummary> {
        await new Promise(resolve => setTimeout(resolve, 200));
        const apps = ipoData.applications as IPOApplication[];

        return {
            totalApplications: apps.length,
            allottedCount: apps.filter(app => app.status === 'Allotted').length,
            pendingCount: apps.filter(app => app.status === 'Applied').length,
            rejectedCount: apps.filter(app => app.status === 'Rejected').length,
        };
    }

    //geting application by id here 
    async getApplicationById(id: string): Promise<IPOApplication | undefined> {
        await new Promise(resolve => setTimeout(resolve, 150));
        const apps = ipoData.applications as IPOApplication[];
        return apps.find(app => app.id === id);
    }
}

export const ipoService = new IPOService();
