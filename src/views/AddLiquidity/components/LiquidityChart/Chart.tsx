import { max, scaleLinear, ZoomTransform } from 'd3'
import { Chart as ChartJS, LinearScale, LineElement, Tooltip, Legend, CategoryScale, BarElement } from 'chart.js'
import { useMemo, useRef, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { ChartEntry, LiquidityChartRangeInputProps } from './types'
import { Area } from './Area'
ChartJS.register(LinearScale, CategoryScale, LineElement, BarElement, Tooltip, Legend)

const xAccessor = (d: ChartEntry) => d.price0
const yAccessor = (d: ChartEntry) => d.activeLiquidity

const Chart = ({
  data: { series, current },
  dimensions: { width, height },
  zoomLevels,
  margins,
}: LiquidityChartRangeInputProps) => {
  const zoomRef = useRef<SVGRectElement | null>(null)

  const [zoom, setZoom] = useState<ZoomTransform | null>(null)

  const [innerHeight, innerWidth] = useMemo(
    () => [height - margins.top - margins.bottom, width - margins.left - margins.right],
    [width, height, margins],
  )

  const { xScale, yScale } = useMemo(() => {
    const scales = {
      xScale: scaleLinear()
        .domain([current * zoomLevels.initialMin, current * zoomLevels.initialMax] as number[])
        .range([0, innerWidth]),
      yScale: scaleLinear()
        .domain([0, max(series, yAccessor)] as number[])
        .range([innerHeight, 0]),
    }

    if (zoom) {
      const newXscale = zoom.rescaleX(scales.xScale)
      scales.xScale.domain(newXscale.domain())
    }

    return scales
  }, [current, zoomLevels.initialMin, zoomLevels.initialMax, innerWidth, series, innerHeight, zoom])
  return (
    <Area
      series={series}
      xScale={xScale}
      yScale={yScale}
      xValue={xAccessor}
      yValue={yAccessor}
      //   fill={styles.area.selection}
    />
    // <Bar
    //   sx={{ border: '1px solid red' }}
    //   data={{
    //     datasets: [
    //       {
    //         data: [1, 2],
    //       },
    //     ],
    //     labels: ['a', 'b'],
    //   }}
    //   options={{
    //     plugins: {
    //       legend: {
    //         display: false,
    //       },
    //     },
    //   }}
    // />
  )
}

export default Chart
