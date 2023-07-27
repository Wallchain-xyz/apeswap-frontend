// types
import { HistoricTokenData } from 'state/lhd/types'

interface IParsedHistoricalData {
  mcap: number[]
  ownershipScore: number[]
  concentrationScore: number[]
  totalScore: number[]
  totalExtractableLiquidity: number[]
  healthScore: number[]
  ownedLiquidity: number[]
  liquidityDebt: number[]
}

export const parseHistoricalData = (tokenHistoricalData: HistoricTokenData[]): IParsedHistoricalData => {
  const initialHistoricalData: IParsedHistoricalData = {
    mcap: [],
    ownershipScore: [],
    concentrationScore: [],
    totalScore: [],
    totalExtractableLiquidity: [],
    healthScore: [],
    ownedLiquidity: [],
    liquidityDebt: [],
  }

  if (!tokenHistoricalData.length) {
    return initialHistoricalData
  }

  const historicalData = tokenHistoricalData.reduce((acc: IParsedHistoricalData, curr: HistoricTokenData) => {
    const {
      mcap,
      ownershipScore,
      concentrationScore,
      totalScore,
      totalExtractableLiquidity,
      healthScore,
      ownedLiquidity,
    } = curr
    const validMcap = mcap.reduce(
      (mcapAcc: any, mcapCurr: any) => {
        const { amount } = mcapCurr
        if (amount > 0) {
          mcapAcc.total += amount
          mcapAcc.validCount += 1
        }
        return mcapAcc
      },
      { total: 0, validCount: 0 },
    )
    const totalMcap = validMcap.total / validMcap.validCount || 0

    // TODO: add liquidityDebt when api is ready
    acc.liquidityDebt.push(0)
    acc.mcap.push(totalMcap)
    acc.ownedLiquidity.push(ownedLiquidity)
    acc.totalExtractableLiquidity.push(totalExtractableLiquidity)

    acc.concentrationScore.push(concentrationScore * 100)
    acc.healthScore.push(healthScore * 100)
    acc.ownershipScore.push(ownershipScore * 100)
    acc.totalScore.push(totalScore * 100)

    return acc
  }, initialHistoricalData)
  return historicalData
}
