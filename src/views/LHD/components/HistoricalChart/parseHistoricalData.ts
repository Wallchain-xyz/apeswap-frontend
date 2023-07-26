import { TokenData } from 'state/lhd/types'

interface IParseHistoricalData {
  labels: string[]
  mcap: number[]
  ownershipScore: number[]
  concentrationScore: number[]
  totalScore: number[]
  totalExtractableLiquidity: number[]
  ownedExtractableLiquidity: number[]
}

export const parseHistoricalData = (mockedHistoricalData: TokenData[]): IParseHistoricalData => {
  const historicalData = mockedHistoricalData.reduce(
    (acc: IParseHistoricalData, curr: TokenData) => {
      const {
        mcap,
        createdAt,
        ownershipScore,
        concentrationScore,
        totalScore,
        totalExtractableLiquidity,
        ownedExtractableLiquidity,
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

      acc.labels.push(new Date(parseInt(createdAt)).toLocaleDateString())
      acc.mcap.push(totalMcap)
      acc.ownershipScore.push(ownershipScore * 100)
      acc.concentrationScore.push(concentrationScore * 100)
      acc.totalScore.push(totalScore * 100)
      acc.totalExtractableLiquidity.push(totalExtractableLiquidity)
      acc.ownedExtractableLiquidity.push(ownedExtractableLiquidity || 0)

      return acc
    },
    {
      labels: [],
      mcap: [],
      ownershipScore: [],
      concentrationScore: [],
      totalScore: [],
      totalExtractableLiquidity: [],
      ownedExtractableLiquidity: [],
    },
  )
  return historicalData
}
