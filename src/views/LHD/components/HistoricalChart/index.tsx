import { useEffect, useMemo, useState } from 'react'
import { Box } from 'theme-ui'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2'

// Components
import { Flex } from 'components/uikit'

// Helpers
import { getChartOptions } from './utils/getChartOptions'
import { getDataSets } from './utils/getDataSets'

// Types
import { HistoricTokenData } from 'state/lhd/types'
import { DatasetNames } from './types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

const COLORS = {
  [DatasetNames.LiquidityDebt]: 'rgb(139,69,19)',
  [DatasetNames.MarketCap]: 'rgb(255, 99, 132)',
  [DatasetNames.OwnedLiquidity]: 'rgb(230, 230, 250)',
  [DatasetNames.TotalExtractableLiquidity]: 'rgb(255, 192, 203)',
  [DatasetNames.ConcentrationScore]: 'rgb(124, 252, 0)',
  [DatasetNames.HealthScore]: 'rgb(255, 172, 28)',
  [DatasetNames.TotalScore]: 'rgb(238, 75, 43)',
  [DatasetNames.OwnershipScore]: 'rgb(53, 162, 235)',
}

const HistoricalChart = ({
  tokenHistoric,
  isLoading,
}: {
  tokenHistoric: HistoricTokenData[] | never[]
  isLoading: boolean
}) => {
  const data = useMemo(() => getDataSets(tokenHistoric), [tokenHistoric])

  const [chartData, setChartData] = useState(data)
  const [toggledData, setToggledData] = useState({
    [DatasetNames.LiquidityDebt]: false,
    [DatasetNames.MarketCap]: true,
    [DatasetNames.OwnedLiquidity]: false,
    [DatasetNames.TotalExtractableLiquidity]: false,
    [DatasetNames.ConcentrationScore]: false,
    [DatasetNames.HealthScore]: false,
    [DatasetNames.OwnershipScore]: false,
    [DatasetNames.TotalScore]: false,
  })

  useEffect(() => {
    const filteredData = data.datasets.filter((set) => toggledData[set.label])
    console.log({ data, filteredData })
    setChartData({ ...data, datasets: filteredData })
  }, [data])

  const options = getChartOptions(toggledData)

  const handleDataToggle = ({ datasetName }: { datasetName: DatasetNames }) => {
    setToggledData({ ...toggledData, [datasetName]: !toggledData[datasetName] })
    const newChartData = data.datasets.filter((set) => {
      if (set.label === datasetName) {
        return !toggledData[datasetName]
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
        {Object.values(DatasetNames).map((datasetName) => (
          <button
            key={datasetName}
            style={{ backgroundColor: COLORS[datasetName] }}
            type="button"
            onClick={() => handleDataToggle({ datasetName })}
          >
            {datasetName}
          </button>
        ))}
      </Flex>
    </Box>
  )
}

export default HistoricalChart
