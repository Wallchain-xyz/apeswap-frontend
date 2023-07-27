// types
import { HistoricTokenData } from 'state/lhd/types'
import { DataSetNames } from '../types'

// Helpers
import { parseHistoricalData } from './parseHistoricalData'

export const getDataSets = (tokenHistoricalData: HistoricTokenData[]) => {
  const {
    mcap,
    ownershipScore,
    concentrationScore,
    totalScore,
    totalExtractableLiquidity,
    healthScore,
    ownedLiquidity,
    liquidityDebt,
  } = parseHistoricalData(tokenHistoricalData)

  const marketCapSet = {
    label: DataSetNames.MarketCap,
    data: mcap,
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 1)',
    yAxisID: 'y',
  }

  const ownershipScoreSet = {
    label: DataSetNames.OwnershipScore,
    data: ownershipScore,
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    yAxisID: 'y1',
  }

  const concentrationScoreSet = {
    label: DataSetNames.ConcentrationScore,
    data: concentrationScore,
    borderColor: 'rgb(124, 252, 0)',
    backgroundColor: 'rgba(124, 252, 0, 1)',
    yAxisID: 'y2',
  }

  const extractableLiquiditySet = {
    label: DataSetNames.ExtractableLiquidity,
    data: totalExtractableLiquidity,
    borderColor: 'rgb(255, 192, 203)',
    backgroundColor: 'rgba(255, 192, 203, 1)',
    yAxisID: 'y3',
  }

  const totalScoreSet = {
    label: DataSetNames.TotalScore,
    data: totalScore,
    borderColor: 'rgb(238, 75, 43)',
    backgroundColor: 'rgba(238, 75, 43, 1)',
    yAxisID: 'y4',
  }

  const healthScoreSet = {
    label: DataSetNames.HealthScore,
    data: healthScore,
    borderColor: 'rgb(255, 172, 28)',
    backgroundColor: 'rgba(255, 172, 28, 1)',
    yAxisID: 'y5',
  }

  const ownedLiquiditySet = {
    label: DataSetNames.OwnedLiquidity,
    data: ownedLiquidity,
    borderColor: 'rgb(230, 230, 250)',
    backgroundColor: 'rgba(230, 230, 250, 1)',
    yAxisID: 'y6',
  }

  const liquidityDebtSet = {
    label: DataSetNames.LiquidityDebt,
    data: liquidityDebt,
    borderColor: 'rgb(139,69,19)',
    backgroundColor: 'rgba(139, 69, 19, 1)',
    yAxisID: 'y6',
  }

  const datasets = [
    marketCapSet,
    ownershipScoreSet,
    concentrationScoreSet,
    extractableLiquiditySet,
    totalScoreSet,
    healthScoreSet,
    ownedLiquiditySet,
    liquidityDebtSet,
  ]

  return {
    labels: Array(tokenHistoricalData.length).fill(''),
    datasets: datasets,
  }
}
