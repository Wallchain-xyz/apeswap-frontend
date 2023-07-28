// Types
import { HistoricTokenData } from 'state/lhd/types'
import { DatasetNames } from '../types'
import type { ChartData } from 'chart.js'

// Helpers
import { parseHistoricalData } from './parseHistoricalData'

export const getDataSets = (tokenHistoricalData: HistoricTokenData[]): ChartData<'line'> => {
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
    label: DatasetNames.MarketCap,
    data: mcap,
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 1)',
    yAxisID: DatasetNames.MarketCap,
  }

  const ownershipScoreSet = {
    label: DatasetNames.OwnershipScore,
    data: ownershipScore,
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    yAxisID: DatasetNames.OwnershipScore,
  }

  const concentrationScoreSet = {
    label: DatasetNames.ConcentrationScore,
    data: concentrationScore,
    borderColor: 'rgb(124, 252, 0)',
    backgroundColor: 'rgba(124, 252, 0, 1)',
    yAxisID: DatasetNames.ConcentrationScore,
  }

  const extractableLiquiditySet = {
    label: DatasetNames.TotalExtractableLiquidity,
    data: totalExtractableLiquidity,
    borderColor: 'rgb(255, 192, 203)',
    backgroundColor: 'rgba(255, 192, 203, 1)',
    yAxisID: DatasetNames.TotalExtractableLiquidity,
  }

  const totalScoreSet = {
    label: DatasetNames.TotalScore,
    data: totalScore,
    borderColor: 'rgb(238, 75, 43)',
    backgroundColor: 'rgba(238, 75, 43, 1)',
    yAxisID: DatasetNames.TotalScore,
  }

  const healthScoreSet = {
    label: DatasetNames.HealthScore,
    data: healthScore,
    borderColor: 'rgb(255, 172, 28)',
    backgroundColor: 'rgba(255, 172, 28, 1)',
    yAxisID: DatasetNames.HealthScore,
  }

  const ownedLiquiditySet = {
    label: DatasetNames.OwnedLiquidity,
    data: ownedLiquidity,
    borderColor: 'rgb(230, 230, 250)',
    backgroundColor: 'rgba(230, 230, 250, 1)',
    yAxisID: DatasetNames.OwnedLiquidity,
  }

  const liquidityDebtSet = {
    label: DatasetNames.LiquidityDebt,
    data: liquidityDebt,
    borderColor: 'rgb(139,69,19)',
    backgroundColor: 'rgba(139, 69, 19, 1)',
    yAxisID: DatasetNames.LiquidityDebt,
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
