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
import { DataSetNames } from './types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

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
    [DataSetNames.dataSetOne]: true,
    [DataSetNames.dataSetTwo]: true,
    [DataSetNames.dataSetThree]: true,
    [DataSetNames.dataSetFour]: true,
    [DataSetNames.dataSetFive]: true,
    [DataSetNames.dataSetSix]: true,
    [DataSetNames.dataSetSeven]: true,
    [DataSetNames.dataSetEight]: true,
  })

  useEffect(() => {
    setChartData(data)
  }, [data])

  const options = getChartOptions()

  const handleDataToggle = ({ dataSetName }: { dataSetName: DataSetNames }) => {
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
          onClick={() => handleDataToggle({ dataSetName: DataSetNames.dataSetOne })}
        >
          One Mcap
        </button>
        <button
          style={{ backgroundColor: 'rgb(53, 162, 235)' }}
          type="button"
          onClick={() => handleDataToggle({ dataSetName: DataSetNames.dataSetTwo })}
        >
          Two Ownership
        </button>

        <button
          style={{ backgroundColor: 'rgb(124, 252, 0)' }}
          type="button"
          onClick={() => handleDataToggle({ dataSetName: DataSetNames.dataSetThree })}
        >
          Three Concentration Score
        </button>
        <button
          style={{ backgroundColor: 'rgb(255, 192, 203)' }}
          type="button"
          onClick={() => handleDataToggle({ dataSetName: DataSetNames.dataSetFour })}
        >
          Four Total Extractable
        </button>

        <button
          style={{ backgroundColor: 'rgb(238, 75, 43)' }}
          type="button"
          onClick={() => handleDataToggle({ dataSetName: DataSetNames.dataSetFive })}
        >
          Five Total Score
        </button>

        <button
          style={{ backgroundColor: 'rgb(255, 172, 28)' }}
          type="button"
          onClick={() => handleDataToggle({ dataSetName: DataSetNames.dataSetSix })}
        >
          Six Health Score
        </button>

        <button
          style={{ backgroundColor: 'rgb(230, 230, 250)' }}
          type="button"
          onClick={() => handleDataToggle({ dataSetName: DataSetNames.dataSetSeven })}
        >
          Seven Owned Liquidity
        </button>

        <button
          style={{ backgroundColor: 'rgb(139,69,19)' }}
          type="button"
          onClick={() => handleDataToggle({ dataSetName: DataSetNames.dataSetEight })}
        >
          Eight Liquidity Debt
        </button>
      </Flex>
    </Box>
  )
}

export default HistoricalChart
