//

import reportsData from '@/data/reports.json';
import { ReportsData, ReportCategory, GenerateReportParams, Segment, DateRange } from '@/types/report';

class ReportsService {

    //geting all reports data  categories, segments, and date ranges
    async getReports(): Promise<ReportsData> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));

        return {
            categories: reportsData.categories as ReportCategory[],
            segments: reportsData.segments as Segment[],
            dateRanges: reportsData.dateRanges as DateRange[],
        };
    }

    //geting reports by category
    async getReportsByCategory(categoryId: string): Promise<ReportCategory | null> {
        await new Promise(resolve => setTimeout(resolve, 200));

        const category = reportsData.categories.find(cat => cat.id === categoryId);
        return category ? (category as ReportCategory) : null;
    }

    //geting available segments
    async getSegments(): Promise<Segment[]> {
        await new Promise(resolve => setTimeout(resolve, 100));
        return reportsData.segments as Segment[];
    }

    //geting available date ranges
    async getDateRanges(): Promise<DateRange[]> {
        await new Promise(resolve => setTimeout(resolve, 100));
        return reportsData.dateRanges as DateRange[];
    }

    //generate report
    async generateReport(params: GenerateReportParams): Promise<{ success: boolean; message: string }> {
        await new Promise(resolve => setTimeout(resolve, 500));

        // Simulate report generation
        console.log('Generating report:', params);

        return {
            success: true,
            message: 'Report generated successfully',
        };
    }

    //download report
    async downloadReport(params: GenerateReportParams): Promise<{ success: boolean; message: string }> {
        await new Promise(resolve => setTimeout(resolve, 500));

        console.log('Downloading report:', params);

        return {
            success: true,
            message: 'Report download started',
        };
    }

    //email report
    async emailReport(params: GenerateReportParams): Promise<{ success: boolean; message: string }> {
        await new Promise(resolve => setTimeout(resolve, 500));

        console.log('Emailing report:', params);

        return {
            success: true,
            message: 'Report sent to your email',
        };
    }

    //refresh reports
    async refreshReports(): Promise<ReportsData> {
        await new Promise(resolve => setTimeout(resolve, 500));
        return this.getReports();
    }
}

//  singleton instance
export const reportsService = new ReportsService();
