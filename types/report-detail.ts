/**
 * Report Detail Types
 */

export interface CapitalGainLossSummary {
    shortTermGainLoss: number;
    longTermGainLoss: number;
    intradayGainLoss: number;
    charges: number;
}

export interface CapitalGainLossTransaction {
    id: string;
    companyName: string;
    quantity: number;
    type: 'Short Term' | 'Long Term' | 'Intraday';
    buyAmount: number;
    sellAmount: number;
    gainLoss: number;
    gainLossPercent: number;
}

export interface CapitalGainLossReport {
    summary: CapitalGainLossSummary;
    transactions: CapitalGainLossTransaction[];
}
