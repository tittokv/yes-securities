export type IPOStatus = 'Allotted' | 'Applied' | 'Rejected';

export interface IPOApplication {
    id: string;
    companyName: string;
    applicationNumber: string;
    bidPrice: number;
    quantity: number;
    totalAmount: number;
    status: IPOStatus;
    allottedQuantity: number;
    appliedDate: string;
}
