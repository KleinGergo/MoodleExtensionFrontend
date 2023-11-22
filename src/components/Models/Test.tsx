

export interface Test {
    testID: number;
    moodleTestID: number;

    result: number | null;
    isCompleted: boolean;
    type: string;
    label: string | null;
    gradeMax: number | null;
    gradeMin: number | null;
    previousTestID: number | null;

}