export interface IndustryStats {
  averageConcentrationScore: number
  averageHealthScore: number
  averageOwnershipScore: number
  averageTotalScore: number
  chainsSupported: number
  coefficients: {
    concentration: number
    health: number
    ownership: number
  }
  createdAt: string
  evmCoverage: string
  formulaVersion: string
  tokensTracked: number
  tokensVerified: number
}
