export interface GradeCondition {
    Type: string
    NumberOfAssigments?: number | null
    RequiredNumberOfAssigments?: number | null
    RequiredIndividualAssigmentPercentage?: number | null
    RequiredAvgAssigmentPercentage?: number  | null
    Weight?: number | null
    NumberOfBigTests?: number | null
    RequiredPRequiredBigTestPercentageercentage?: number | null
    RequiredNumberOfBigTests?: number | null
    RequiredIndividualBigTestPercentage?: number | null
    RequiredAvgBigTestPercentage?: number | null
    NumberOfSmallTests?: number | null
    RequiredNumberOfSmallTests?: number | null
    RequiredIndividualSmallTestPercentage?: number | null
    RequiredAvgSmallTestPercentage?: number | null
    OfferedGradeAPercentage?: number | null
    OfferedGradeBPercentage?: number | null
    OfferedGradeCPercentage?: number | null
    OfferedGradeDPercentage?: number | null
  }