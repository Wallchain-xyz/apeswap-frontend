// types
import { HistoricTokenData } from 'state/lhd/types'
import { DataSetNames } from '../types'

// Helpers
import { parseHistoricalData } from './parseHistoricalData'

export const getDataSets = (tokenHistoricalData: HistoricTokenData[]) => {
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

  const dataSetOne = {
    label: DataSetNames.dataSetOne,
    data: mcap,
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 1)',
    yAxisID: 'y',
  }

  const dataSetTwo = {
    label: DataSetNames.dataSetTwo,
    data: ownershipScore,
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    yAxisID: 'y1',
  }

  const dataSetThree = {
    label: DataSetNames.dataSetThree,
    data: concentrationScore,
    borderColor: 'rgb(124, 252, 0)',
    backgroundColor: 'rgba(124, 252, 0, 1)',
    yAxisID: 'y2',
  }

  const dataSetFour = {
    label: DataSetNames.dataSetFour,
    data: totalExtractableLiquidity,
    borderColor: 'rgb(255, 192, 203)',
    backgroundColor: 'rgba(255, 192, 203, 1)',
    yAxisID: 'y3',
  }

  const dataSetFive = {
    label: DataSetNames.dataSetFive,
    data: totalScore,
    borderColor: 'rgb(238, 75, 43)',
    backgroundColor: 'rgba(238, 75, 43, 1)',
    yAxisID: 'y4',
  }

  const dataSetSix = {
    label: DataSetNames.dataSetSix,
    data: healthScore,
    borderColor: 'rgb(255, 172, 28)',
    backgroundColor: 'rgba(255, 172, 28, 1)',
    yAxisID: 'y5',
  }

  const dataSetSeven = {
    label: DataSetNames.dataSetSeven,
    data: ownedLiquidity,
    borderColor: 'rgb(230, 230, 250)',
    backgroundColor: 'rgba(230, 230, 250, 1)',
    yAxisID: 'y6',
  }

  const dataSetEight = {
    label: DataSetNames.dataSetEight,
    data: liquidityDebt,
    borderColor: 'rgb(139,69,19)',
    backgroundColor: 'rgba(139, 69, 19, 1)',
    yAxisID: 'y6',
  }

  const datasets = [
    dataSetOne,
    dataSetTwo,
    dataSetThree,
    dataSetFour,
    dataSetFive,
    dataSetSix,
    dataSetSeven,
    dataSetEight,
  ]

  // return datasets

  return {
    labels: Array(tokenHistoricalData.length).fill(''),
    datasets: datasets,
  }
}
