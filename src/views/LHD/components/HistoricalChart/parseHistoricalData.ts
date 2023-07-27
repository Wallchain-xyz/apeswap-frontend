import { HistoricTokenData } from 'state/lhd/types'

interface IParsedHistoricalData {
  // labels: string[]
  mcap: number[]
  ownershipScore: number[]
  concentrationScore: number[]
  totalScore: number[]
  totalExtractableLiquidity: number[]
}

export const parseHistoricalData = (tokenHistoricalData: HistoricTokenData[] | never[]): IParsedHistoricalData => {
  const initialHistoricalData: IParsedHistoricalData = {
    // labels: [],
    mcap: [],
    ownershipScore: [],
    concentrationScore: [],
    totalScore: [],
    totalExtractableLiquidity: [],
  }

  if (!tokenHistoricalData.length) {
    return initialHistoricalData
  }

  // @ts-ignore
  const historicalData = tokenHistoricalData.reduce((acc: IParsedHistoricalData, curr: HistoricTokenData) => {
    const {
      mcap,
      // createdAt,
      ownershipScore,
      concentrationScore,
      totalScore,
      totalExtractableLiquidity,
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

    // acc.labels.push(new Date(parseInt(createdAt)).toLocaleDateString())
    acc.mcap.push(totalMcap)
    acc.ownershipScore.push(ownershipScore * 100)
    acc.concentrationScore.push(concentrationScore * 100)
    acc.totalScore.push(totalScore * 100)
    acc.totalExtractableLiquidity.push(totalExtractableLiquidity)

    return acc
  }, initialHistoricalData)
  return historicalData
}
