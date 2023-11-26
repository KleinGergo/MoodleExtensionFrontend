export interface Condition {
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
  GradeAPercentage?: number | null
  GradeBPercentage?: number | null
  GradeCPercentage?: number | null
  GradeDPercentage?: number | null
IsCorrectionTestCanWorseTheGrade?: boolean | null
}