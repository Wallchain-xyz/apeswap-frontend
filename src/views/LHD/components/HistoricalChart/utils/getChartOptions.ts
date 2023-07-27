// Types
import { DatasetNames } from '../types'

export const getChartOptions = () => {
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
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - Multi Axis',
      },
    },
    scales: {
      [DatasetNames.MarketCap]: {
        type: 'linear' as const,
        // display: toggledData[DatasetNames.dataSetOne],
        display: false,
        position: 'left' as const,
        title: {
          display: true,
          text: [DatasetNames.MarketCap],
        },
      },
      [DatasetNames.OwnershipScore]: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DatasetNames.OwnershipScore],
        },
      },
      [DatasetNames.ConcentrationScore]: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DatasetNames.ConcentrationScore],
        },
      },
      [DatasetNames.TotalExtractableLiquidity]: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DatasetNames.TotalExtractableLiquidity],
        },
      },
      [DatasetNames.TotalScore]: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DatasetNames.TotalScore],
        },
      },
      [DatasetNames.HealthScore]: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DatasetNames.HealthScore],
        },
      },
      [DatasetNames.OwnedLiquidity]: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DatasetNames.OwnedLiquidity],
        },
      },
      [DatasetNames.LiquidityDebt]: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DatasetNames.LiquidityDebt],
        },
      },
    },
  }

  return options
}
