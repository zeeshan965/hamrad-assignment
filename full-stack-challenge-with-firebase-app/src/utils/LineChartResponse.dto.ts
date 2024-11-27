export interface LineChartResponse {
    currentWeekIndex: number;
    currentMonth: string;
    categoriesLabels: string[];
    currentWeek: number[];
    previousWeek: () => void;
    nextWeek: () => void;
}