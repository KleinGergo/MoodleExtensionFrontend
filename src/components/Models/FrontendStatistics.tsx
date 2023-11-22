import { FrontendChartData } from "./FrontendChartData";
export interface FrontendStatistics {
    subjectName: string;
    totalTests: number;
    totalSignatures: number;
    totalNumberOfPassedStudents: number;
    frontendChartData: Array<{ name: string; Jegy: number }>;
}