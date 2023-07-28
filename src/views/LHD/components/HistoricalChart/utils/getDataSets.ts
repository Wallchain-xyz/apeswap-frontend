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
    borderColor: '#FA8072',
    backgroundColor: '#FA8072',
    yAxisID: DatasetNames.ConcentrationScore,
  }

  const extractableLiquiditySet = {
    label: DatasetNames.TotalExtractableLiquidity,
    data: totalExtractableLiquidity,
    borderColor: '#1179A6',
    backgroundColor: '#1179A6',
    yAxisID: DatasetNames.TotalExtractableLiquidity,
  }

  const totalScoreSet = {
    label: DatasetNames.TotalScore,
    data: totalScore,
    borderColor: '#964B00',
    backgroundColor: '#964B00',
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
    borderColor: '#904DC4',
    backgroundColor: '#904DC4',
    yAxisID: DatasetNames.OwnedLiquidity,
  }

  const liquidityDebtSet = {
    label: DatasetNames.LiquidityDebt,
    data: liquidityDebt,
    borderColor: '#DF4141',
    backgroundColor: '#DF4141',
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
