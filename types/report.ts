/**
 * Report Type Definitions
 */

export interface ReportType {
    id: string;
    title: string;
    description: string;
    icon: string;
    hasSegmentFilter: boolean;
    hasDateRangeFilter: boolean;
}

export interface ReportCategory {
    id: string;
    name: string;
    reports: ReportType[];
}

export interface Segment {
    id: string;
    label: string;
}

export interface DateRange {
    id: string;
    label: string;
}

export interface ReportFilters {
    segmentId?: string;
    dateRangeId?: string;
}

export interface ReportsData {
    categories: ReportCategory[];
    segments: Segment[];
    dateRanges: DateRange[];
}

export interface GenerateReportParams {
    reportId: string;
    filters: ReportFilters;
}
