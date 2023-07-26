import { useEffect, useMemo, useState } from 'react'
import { Box } from 'theme-ui'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2'

// Components
import { Flex } from 'components/uikit'

// Helpers
import { parseHistoricalData } from './parseHistoricalData'

// Types
import { HistoricTokenData } from 'state/lhd/types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

enum dataSetNames {
  dataSetOne = 'dataSetOne',
  dataSetTwo = 'dataSetTwo',
  dataSetThree = 'dataSetThree',
  dataSetFour = 'dataSetFour',
  dataSetFive = 'dataSetFive',
  dataSetSix = 'dataSetSix',
}

const HistoricalChart = ({
  tokenHistoric,
  isLoading,
}: {
  tokenHistoric: HistoricTokenData[] | never[]
  isLoading: boolean
}) => {
  const {
    labels,
    mcap,
    ownershipScore,
    concentrationScore,
    totalScore,
    totalExtractableLiquidity,
    ownedExtractableLiquidity,
  } = useMemo(() => parseHistoricalData(tokenHistoric), [tokenHistoric])

  const dataSetOne = {
    label: dataSetNames.dataSetOne,
    data: mcap,
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 1)',
    yAxisID: 'y',
  }

  const dataSetTwo = {
    label: dataSetNames.dataSetTwo,
    data: ownershipScore,
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    yAxisID: 'y1',
  }

  const dataSetThree = {
    label: dataSetNames.dataSetThree,
    data: concentrationScore,
    borderColor: 'rgb(124, 252, 0)',
    backgroundColor: 'rgba(124, 252, 0, 1)',
    yAxisID: 'y2',
  }

  const dataSetFour = {
    label: dataSetNames.dataSetFour,
    data: ownedExtractableLiquidity,
    borderColor: 'rgb(255, 192, 203)',
    backgroundColor: 'rgba(255, 192, 203, 1)',
    yAxisID: 'y3',
  }

  const dataSetFive = {
    label: dataSetNames.dataSetFive,
    data: totalScore,
    borderColor: 'rgb(238, 75, 43)',
    backgroundColor: 'rgba(238, 75, 43, 1)',
    yAxisID: 'y4',
  }

  const dataSetSix = {
    label: dataSetNames.dataSetSix,
    // data: labels.map(() => 100),
    data: totalExtractableLiquidity,
    borderColor: 'rgb(255, 172, 28)',
    backgroundColor: 'rgba(255, 172, 28, 1)',
    yAxisID: 'y5',
  }

  const datasets = useMemo(
    () => [dataSetOne, dataSetTwo, dataSetThree, dataSetFour, dataSetFive, dataSetSix],
    [dataSetFive, dataSetFour, dataSetOne, dataSetSix, dataSetThree, dataSetTwo],
  )

  const data = useMemo(() => {
    return {
      labels,
      datasets: datasets,
    }
  }, [tokenHistoric])
  const [chartData, setChartData] = useState(data)
  const [toggledData, setToggledData] = useState({
    [dataSetNames.dataSetOne]: true,
    [dataSetNames.dataSetTwo]: true,
    [dataSetNames.dataSetThree]: true,
    [dataSetNames.dataSetFour]: true,
    [dataSetNames.dataSetFive]: true,
    [dataSetNames.dataSetSix]: true,
  })

  useEffect(() => {
    setChartData(data)
  }, [data])

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
      y: {
        type: 'linear' as const,
        // display: toggledData[dataSetNames.dataSetOne],
        display: false,
        position: 'left' as const,
        title: {
          display: true,
          text: 'One',
        },
      },
      y1: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: false,
          text: 'two',
        },
      },
      y2: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: false,
          text: 'Three',
        },
      },
      y3: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: false,
          text: 'Four',
        },
      },
      y4: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: false,
          text: 'Five',
        },
      },
      y5: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: false,
          text: 'Six',
        },
      },
    },
  }

  const handleDataToggle = ({ dataSetName }: { dataSetName: dataSetNames }) => {
    setToggledData({ ...toggledData, [dataSetName]: !toggledData[dataSetName] })

    const newChartData = data.datasets.filter((set) => {
      if (set.label === dataSetName) {
        return !toggledData[dataSetName]
      }
      return toggledData[set.label]
    })

    setChartData({ ...chartData, datasets: newChartData })
  }

  if (isLoading && !tokenHistoric.length) {
    return <div>Loading...</div>
  }

  return (
    <Box sx={{ width: '100%', height: '100%', flexDirection: 'column' }}>
      <Line options={options} data={chartData} />
      <Flex sx={{ gap: '10px', p: '10px' }}>
        <button
          style={{ backgroundColor: 'rgb(255, 99, 132)' }}
          type="button"
          onClick={() => handleDataToggle({ dataSetName: dataSetNames.dataSetOne })}
        >
          One Mcap
        </button>
        <button
          style={{ backgroundColor: 'rgb(53, 162, 235)' }}
          type="button"
          onClick={() => handleDataToggle({ dataSetName: dataSetNames.dataSetTwo })}
        >
          Two Ownership
        </button>

        <button
          style={{ backgroundColor: 'rgb(124, 252, 0)' }}
          type="button"
          onClick={() => handleDataToggle({ dataSetName: dataSetNames.dataSetThree })}
        >
          Three Concentration Score
        </button>
        <button
          style={{ backgroundColor: 'rgb(255, 192, 203)' }}
          type="button"
          onClick={() => handleDataToggle({ dataSetName: dataSetNames.dataSetFour })}
        >
          Four Owned Extractable
        </button>

        <button
          style={{ backgroundColor: 'rgb(238, 75, 43)' }}
          type="button"
          onClick={() => handleDataToggle({ dataSetName: dataSetNames.dataSetFive })}
        >
          Five Total Score
        </button>

        <button
          style={{ backgroundColor: 'rgb(255, 172, 28)' }}
          type="button"
          onClick={() => handleDataToggle({ dataSetName: dataSetNames.dataSetSix })}
        >
          Six Total Extractable
        </button>
      </Flex>
    </Box>
  )
}

export default HistoricalChart
