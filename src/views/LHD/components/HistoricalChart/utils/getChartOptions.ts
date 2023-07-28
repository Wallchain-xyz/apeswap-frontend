import numbro from 'numbro'

// Types
import type { ChartOptions } from 'chart.js'
import { DatasetNames } from '../types'

const SCORES = [
  DatasetNames.OwnershipScore,
  DatasetNames.ConcentrationScore,
  DatasetNames.TotalScore,
  DatasetNames.HealthScore,
]

export const getChartOptions = (
  toggledData: Record<DatasetNames, boolean>,
  isMobile: boolean,
): ChartOptions<'line'> => {
  const scales = Object.values(DatasetNames).reduce((acc: any, value) => {
    const isScore = SCORES.includes(value)
    acc[value] = {
      type: 'linear' as const,
      display: toggledData[value],
      position: isScore ? 'right' : ('left' as const),
      grid: {
        drawOnChartArea: false,
      },
      title: {
        display: isMobile !== true,
        text: [value],
        color: '#A09F9C',
      },
      ticks: {
        suggestedMin: 0,
        callback: (tickValue: number | string) => {
          return isScore
            ? `${tickValue}%`
            : numbro(Number(tickValue))
                .formatCurrency({
                  average: true,
                  mantissa: Number(tickValue) < 1 ? 1 : 0,
                  abbreviations: {
                    million: 'M',
                    billion: 'B',
                  },
                })
                .toUpperCase()
        },
        font: {
          family: 'Poppins',
          size: 10,
          weight: '500',
        },
      },
    }
    return acc
  }, {})

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    tension: 0.3,
    elements: {
      point: {
        radius: 0,
      },
    },
    stacked: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const {
              dataset: { label },
              formattedValue,
              raw,
            } = context
            const isScore = SCORES.includes(label)
            if (isScore) {
              return `${label}: ${raw}%`
            }
            return `${label}: $${formattedValue}`
          },
        },
      },
    },
    scales,
  }

  return options
}
