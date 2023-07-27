// Types
import { DataSetNames } from '../types'

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
      [DataSetNames.MarketCap]: {
        type: 'linear' as const,
        // display: toggledData[dataSetNames.dataSetOne],
        display: false,
        position: 'left' as const,
        title: {
          display: true,
          text: [DataSetNames.MarketCap],
        },
      },
      [DataSetNames.OwnershipScore]: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DataSetNames.OwnershipScore],
        },
      },
      [DataSetNames.ConcentrationScore]: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DataSetNames.ConcentrationScore],
        },
      },
      [DataSetNames.TotalExtractableLiquidity]: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DataSetNames.TotalExtractableLiquidity],
        },
      },
      [DataSetNames.TotalScore]: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DataSetNames.TotalScore],
        },
      },
      [DataSetNames.HealthScore]: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DataSetNames.HealthScore],
        },
      },
      [DataSetNames.OwnedLiquidity]: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DataSetNames.OwnedLiquidity],
        },
      },
      [DataSetNames.LiquidityDebt]: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: [DataSetNames.LiquidityDebt],
        },
      },
    },
  }

  return options
}
