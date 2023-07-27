export interface HistoricTokenData {
  mcap: {
    amount: number | null
    source: string
  }[]
  totalLiquidity: number
  healthScore: number
  concentrationScore: number
  ownershipScore: number
  totalScore: number
  totalExtractableLiquidity: number
  ownedLiquidity: number
}
