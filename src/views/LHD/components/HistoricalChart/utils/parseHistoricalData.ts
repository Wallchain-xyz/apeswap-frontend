// types
import { SimpleTokenProfile } from 'state/lhd/types'

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

export const parseHistoricalData = (tokenHistoricalData: SimpleTokenProfile[]): IParsedHistoricalData => {
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

  const historicalData = tokenHistoricalData.reduce((acc: IParsedHistoricalData, curr: SimpleTokenProfile) => {
    const { mcap, ownershipScore, totalScore, totalExtractableLiquidity, healthScore, ownedLiquidity } = curr

    const [firstReport] = mcap

    // TODO: add liquidityDebt when api is ready
    acc.liquidityDebt.push(0)
    acc.mcap.push(firstReport.amount || 0)
    acc.ownedLiquidity.push(ownedLiquidity)
    acc.totalExtractableLiquidity.push(totalExtractableLiquidity)

    acc.concentrationScore.push(Number((healthScore * 100).toFixed(2)))
    acc.healthScore.push(Number((healthScore * 100).toFixed(2)))
    acc.ownershipScore.push(Number((ownershipScore * 100).toFixed(2)))
    acc.totalScore.push(Number((totalScore * 100).toFixed(2)))

    return acc
  }, initialHistoricalData)
  return historicalData
}
