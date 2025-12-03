export interface FundsData {
    availableBalance: number;
    usedMargin: number;
    availableMargin: number;
    collateralValue: number;
    withdrawableBalance: number;
}

export interface FundCardData {
    title: string;
    amount: number;
    icon: string;
    gradientColors: string[];
    subtitle?: string;
}
