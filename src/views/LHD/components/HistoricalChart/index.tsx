import { useState } from 'react'
import { Box } from 'theme-ui'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2'

// Components
import { Flex } from 'components/uikit'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

enum dataSetNames {
  dataSetOne = 'dataSetOne',
  dataSetTwo = 'dataSetTwo',
  dataSetThree = 'dataSetThree',
}

const dataSetOne = {
  label: dataSetNames.dataSetOne,
  data: [442104, 33151, 96988, 748196, 55170, 661052, 534410],
  borderColor: 'rgb(255, 99, 132)',
  backgroundColor: 'rgba(255, 99, 132, 0.5)',
  yAxisID: 'y',
}

const dataSetTwo = {
  label: dataSetNames.dataSetTwo,
  data: [365, 368, 256, 878, 447, 168, 423],
  borderColor: 'rgb(53, 162, 235)',
  backgroundColor: 'rgba(53, 162, 235, 0.5)',
  yAxisID: 'y1',
}

const dataSetThree = {
  label: dataSetNames.dataSetThree,
  data: [10, 30, 5, 2, 20, 30, 45],
  borderColor: 'rgb(124, 252, 0)',
  backgroundColor: 'rgba(124, 252, 0 0.5)',
  yAxisID: 'y2',
}

export const data = {
  labels,
  datasets: [dataSetOne, dataSetTwo, dataSetThree],
}

const HistoricalChart = () => {
  const [chartData, setChartData] = useState(data)
  const [toggledData, setToggledData] = useState({
    [dataSetNames.dataSetOne]: true,
    [dataSetNames.dataSetTwo]: true,
    [dataSetNames.dataSetThree]: true,
  })

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
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
        display: toggledData[dataSetNames.dataSetOne],
        position: 'left' as const,
        title: {
          display: true,
          text: 'Price',
        },
      },
      y1: {
        type: 'linear' as const,
        display: toggledData[dataSetNames.dataSetTwo],
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Extractable liquidity',
        },
      },
      y2: {
        type: 'linear' as const,
        display: toggledData[dataSetNames.dataSetThree],
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Score',
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

  console.log({ toggledData })

  return (
    <Box sx={{ width: '100%', height: '100%', flexDirection: 'column' }}>
      <Line options={options} data={chartData} />
      <Flex sx={{ gap: '10px', p: '10px' }}>
        <button type="button" onClick={() => handleDataToggle({ dataSetName: dataSetNames.dataSetOne })}>
          Price
        </button>
        <button type="button" onClick={() => handleDataToggle({ dataSetName: dataSetNames.dataSetTwo })}>
          Extractable liquidity
        </button>
        <button type="button" onClick={() => handleDataToggle({ dataSetName: dataSetNames.dataSetThree })}>
          Score
        </button>
      </Flex>
    </Box>
  )
}

export default HistoricalChart
