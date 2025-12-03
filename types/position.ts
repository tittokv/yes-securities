export interface Position {
    id: string;
    symbol: string;
    quantity: number;
    buyPrice: number;
    currentPrice: number;
    pnl: number;
    pnlPercent: number;
}

export type PositionTab = 'overall' | 'today';
