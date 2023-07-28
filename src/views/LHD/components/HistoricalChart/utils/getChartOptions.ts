// Types
import { DatasetNames } from '../types'

export const getChartOptions = (toggledData: Record<DatasetNames, boolean>) => {
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    stacked: false,
    scales: {
      // $ Values
      [DatasetNames.LiquidityDebt]: {
        type: 'linear' as const,
        display: toggledData[DatasetNames.LiquidityDebt],
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DatasetNames.LiquidityDebt],
        },
      },
      [DatasetNames.MarketCap]: {
        type: 'linear' as const,
        display: toggledData[DatasetNames.MarketCap],
        position: 'left' as const,
        title: {
          display: true,
          text: [DatasetNames.MarketCap],
        },
      },

      [DatasetNames.TotalExtractableLiquidity]: {
        type: 'linear' as const,
        display: toggledData[DatasetNames.TotalExtractableLiquidity],
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DatasetNames.TotalExtractableLiquidity],
        },
      },
      [DatasetNames.OwnedLiquidity]: {
        type: 'linear' as const,
        display: toggledData[DatasetNames.OwnedLiquidity],
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DatasetNames.OwnedLiquidity],
        },
      },
      // Scores
      [DatasetNames.ConcentrationScore]: {
        type: 'linear' as const,
        display: toggledData[DatasetNames.ConcentrationScore],
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DatasetNames.ConcentrationScore],
        },
      },
      [DatasetNames.HealthScore]: {
        type: 'linear' as const,
        display: toggledData[DatasetNames.HealthScore],
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DatasetNames.HealthScore],
        },
      },
      [DatasetNames.OwnershipScore]: {
        type: 'linear' as const,
        display: toggledData[DatasetNames.OwnershipScore],
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DatasetNames.OwnershipScore],
        },
      },
      [DatasetNames.TotalScore]: {
        type: 'linear' as const,
        display: toggledData[DatasetNames.TotalScore],
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DatasetNames.TotalScore],
        },
      },
    },
  }

  return options
}
