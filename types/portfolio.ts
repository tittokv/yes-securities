export interface PortfolioItem {
    id: string;
    label: string;
    value: string;
    isPositive?: boolean;
}

export interface PortfolioSection {
    title: string;
    icon: string;
    data: PortfolioItem[];
}
