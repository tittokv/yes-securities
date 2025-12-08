/**
 * Position Service
 * 
 * Handles all position-related data operations.
 */

import positionsData from '@/data/positions.json';
import { StockItem } from '@/types/ipo';
import { PositionTab } from '@/types/position';

export interface PositionSummary {
    overallPL: number;
}

export interface PositionData {
    summary: PositionSummary;
    stocks: StockItem[];
}

class PositionService {
    /**
     * Get positions by type (today or overall)
     * 
     * Future API integration:
     * return apiClient.get<PositionData>(`/positions/${type}`);
     */
    async getPositions(type: PositionTab): Promise<PositionData> {
        await new Promise(resolve => setTimeout(resolve, 300));

        const data = type === 'today' ? positionsData.today : positionsData.overall;

        return {
            summary: data.summary,
            stocks: data.stocks as StockItem[],
        };
    }

    /**
     * Get today's positions
     * 
     * Future API integration:
     * return apiClient.get<PositionData>('/positions/today');
     */
    async getTodayPositions(): Promise<PositionData> {
        return this.getPositions('today');
    }

    /**
     * Get overall positions
     * 
     * Future API integration:
     * return apiClient.get<PositionData>('/positions/overall');
     */
    async getOverallPositions(): Promise<PositionData> {
        return this.getPositions('overall');
    }

    /**
     * Get position summary for a specific type
     * 
     * Future API integration:
     * return apiClient.get<PositionSummary>(`/positions/${type}/summary`);
     */
    async getPositionSummary(type: PositionTab): Promise<PositionSummary> {
        await new Promise(resolve => setTimeout(resolve, 150));

        const data = type === 'today' ? positionsData.today : positionsData.overall;
        return data.summary;
    }
}

export const positionService = new PositionService();
