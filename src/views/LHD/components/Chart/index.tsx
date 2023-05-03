import React, { useEffect, useRef, useState } from 'react'
import { Flex, Text } from 'components/uikit'
import { createPortal } from 'react-dom'

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  LineController,
  Filler,
} from 'chart.js'
import { Scatter } from 'react-chartjs-2'
import { LiquidityHealthChart } from '../../../../state/lhd/types'
import { getColor } from '../../utils/getColor'
import { useTranslation } from '../../../../contexts/Localization'
import PriceChange from '../FullProfile/components/PercentageChange'
import { formatDollar } from '../../../../utils/formatNumbers'

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Tooltip, LineController, Filler)

const CustomTooltip = ({ show, x, y, data }) => {
  const { t } = useTranslation()

  if (!show) return null
  return createPortal(
    <Flex
      sx={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -100%)',
        zIndex: 100,
        borderRadius: '10px',
        background: 'white2',
        flexDirection: 'column',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Flex
        sx={{
          background: 'white3',
          flexDirection: 'row',
          gap: '15px',
          padding: '20px',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
        }}
      >
        <Flex>
          <img src={data?.image} width="40px" height="40px" sx={{ borderRadius: '50%' }} />
        </Flex>
        <Flex sx={{ flexDirection: 'column' }}>
          <Text>{data?.name}</Text>
          <Text sx={{ fontWeight: 700, fontSize: ['14px'] }}>
            ${data?.currentPrice.toFixed(5)}
            <PriceChange priceChange={data?.priceChange24hr.toFixed(2)} />
          </Text>
        </Flex>
        <Flex sx={{ flexDirection: 'column', alignItems: 'flex-end' }}>
          <Text sx={{ fontWeight: 400, fontSize: ['12px'], lineHeight: ['20px'], color: 'textDisabled' }}>
            {t('SCORE')}
          </Text>
          <Text
            sx={{
              fontWeight: 700,
              fontSize: ['30px'],
              lineHeight: ['30px'],
              color: getColor(data?.totalScore * 100),
            }}
          >
            {Math.round(data?.totalScore * 100)}
          </Text>
        </Flex>
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
          padding: '20px',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          gap: '10px',
        }}
      >
        <Flex sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text sx={{ fontWeight: 400 }}>Market Cap:</Text>
          <Text sx={{ alignItems: 'flex-end' }}>{formatDollar({ num: data?.mcap })}</Text>
        </Flex>
        <Flex sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text sx={{ fontWeight: 400 }}>Total Extractable Liquidity:</Text>
          <Text sx={{ alignItems: 'flex-end' }}>{Math.round(data?.extractableLiquidityPercentage)}%</Text>
        </Flex>
      </Flex>
    </Flex>,
    document.body,
  )
}

const Chart = ({ chartData }: { chartData: LiquidityHealthChart }) => {
  const canvasRef = useRef(null)
  const [zoomPlugin, setZoomPlugin] = useState(null)
  const [tooltipState, setTooltipState] = useState({ show: false, x: 0, y: 0, data: '' })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('chartjs-plugin-zoom').then((plugin) => {
        setZoomPlugin(plugin.default)
      })
    }
  }, [])

  useEffect(() => {
    if (zoomPlugin) {
      ChartJS.register(
        zoomPlugin,
        BarElement,

        CustomImagePlugin,
        gradientFillBetweenLines,
      )
    }
  }, [zoomPlugin])

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Extractable Liquidity / Market Cap', // add your Y axis label here
        },
        ticks: {
          callback: function (value: number) {
            return `${value}%`
          },
          font: {
            weight: 'bold',
          },
        },
        type: 'linear',
        border: { dash: [4, 4] },
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: 'Market Cap',
        },
        ticks: {
          callback: function (value: number) {
            return `$${value}M`
          },
          font: {
            weight: 'bold',
          },
        },
        border: { dash: [4, 4] }, //
        min: chartData.healthBottom[0].x,
        beginAtZero: false,
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
        limits: {
          x: {
            min: 1,
            max: 10,
            minRange: 1,
          },
        },
      },
      tooltip: {
        enabled: false,
        external: (context) => {
          customTooltipHandler(context)
        },
      },
    },
  }

  function isBelowBottomLine(chart, point) {
    const { x, y } = point
    const line1Meta = chart.getDatasetMeta(0)
    const xScale = chart.scales[line1Meta.xAxisID]
    const yScale = chart.scales[line1Meta.yAxisID]

    const xPixel = xScale.getPixelForValue(x)
    const yPixel = yScale.getPixelForValue(y)

    const line1Dataset = chart.config.data.datasets[0]
    const index = line1Dataset.data.findIndex((linePoint) => linePoint.x >= x)

    const point1 = line1Dataset.data[index - 1]
    const point2 = line1Dataset.data[index]

    const slope = (point2?.y - point1?.y) / (point2?.x - point1?.x)
    const yIntercept = point1?.y - slope * point1?.x

    const bottomLineY = slope * x + yIntercept

    return y > bottomLineY
  }

  const customTooltipHandler = (context) => {
    const { tooltip } = context

    if (tooltip.opacity === 0) {
      setTooltipState((prevState) => ({ ...prevState, show: false }))
      return
    }

    const currentItem = tooltip.dataPoints[0]
    const data = context.chart.data.datasets[currentItem.datasetIndex].data[currentItem.dataIndex].data

    const canvasPosition = context.chart.canvas.getBoundingClientRect()

    setTooltipState({
      show: true,
      x: canvasPosition.left + currentItem.element.x,
      y: canvasPosition.top + currentItem.element.y,
      data: data,
    })
  }

  function drawDebtLine(chart, point1, point2) {
    const { ctx } = chart
    const xScale = chart.scales['x']
    const yScale = chart.scales['y']
    const xPixel1 = xScale?.getPixelForValue(point1.x)
    const yPixel1 = yScale?.getPixelForValue(point1.y)
    const xPixel2 = xScale?.getPixelForValue(point2.x)
    const yPixel2 = yScale?.getPixelForValue(point2.y)

    ctx.beginPath()
    ctx.setLineDash([5, 5])
    ctx.lineWidth = 2
    ctx.strokeStyle = '#DF4141'
    ctx.moveTo(xPixel1, yPixel1)
    ctx.lineTo(xPixel2, yPixel2)
    ctx.stroke()
    ctx.setLineDash([])
  }

  const CustomImagePlugin = {
    id: 'printIcons', // plugins won't work without an ID

    afterDraw: function (chart: ChartJS) {
      const { ctx } = chart
      // make sure it is the dataset that has the tokens position information, in this case the dataset 0
      const dataset = chart.config.data.datasets[2]
      let point1: any, point2

      //fetch icon and draws it
      dataset?.data?.forEach(function (point: any) {
        const { x, y, r, data } = point

        const imageData = new Image()
        imageData.src = `${data.image}`

        const size = r * 3
        const chartArea = chart.chartArea
        const xScale = chart.scales['x']
        const yScale = chart.scales['y']
        const xPixel = xScale?.getPixelForValue(x)
        const yPixel = yScale?.getPixelForValue(y)
        const imageX = xPixel - size / 2
        const imageY = yPixel - size / 2

        ctx.beginPath()

        if (r == 10) {
          ctx.globalAlpha = 1
          if (!point1) {
            point1 = point
            ctx.strokeStyle = '#1179A6'
          } else {
            point2 = point
            ctx.strokeStyle = '#904DC4'
          }
        } else {
          ctx.globalAlpha = 0.7
          const borderColor = isBelowBottomLine(chart, { x, y }) ? '#38A611' : '#DF4141'
          ctx.strokeStyle = borderColor
        }

        ctx.lineWidth = 3
        ctx.arc(imageX + size / 2, imageY + size / 2, size / 2 + 3, 0, 2 * Math.PI) // Add 3 to the radius to draw the green border outside the image
        ctx.stroke()

        // Draw a white border inside the green border
        ctx.beginPath()
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 5
        ctx.arc(imageX + size / 2, imageY + size / 2, size / 2, 0, 2 * Math.PI) // Draw the white border inside the green border
        ctx.stroke()

        if (point1 && point2) {
          drawDebtLine(chart, point1, point2)
        }

        ctx.save()
        ctx.beginPath()
        ctx.arc(imageX + size / 2, imageY + size / 2, size / 2, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.clip()

        ctx.drawImage(imageData, imageX, imageY, size, size)

        ctx.restore()

        ctx.globalAlpha = 1
      })
    },
  }

  const gradientFillBetweenLines = {
    id: 'gradientFillBetweenLines',
    beforeDatasetsDraw: (
      chart: { getDatasetMeta?: any; scales?: any; width?: any; ctx?: any },
      _args: any,
      options: any,
    ) => {
      const { ctx } = chart
      const line1Meta = chart.getDatasetMeta(0)
      const line2Meta = chart.getDatasetMeta(1)
      const yAxis = chart.scales[line1Meta.yAxisID]

      // Create green gradient for the area between the lines
      const greenGradient = ctx.createLinearGradient(0, 0, chart.width, 0)
      greenGradient.addColorStop(0, 'rgba(56, 166, 17, 0.3)')
      greenGradient.addColorStop(1, 'rgba(191, 220, 181, 0.3)')

      // Create red gradient for the area below the bottom line
      const redGradient = ctx.createLinearGradient(0, 0, chart.width, 0)
      redGradient.addColorStop(0, 'rgba(233, 35, 35, 0.1)')
      redGradient.addColorStop(1, 'rgba(166, 17, 17, 0.1)')

      // Draw the area between the lines
      ctx.save()
      ctx.fillStyle = greenGradient
      ctx.beginPath()

      ctx.moveTo(line2Meta.data[0]?.x, line2Meta.data[0]?.y)
      for (let i = 1; i < line2Meta.data.length; i++) {
        const pointProps = line2Meta.data[i].getProps(['x', 'y'])
        ctx.lineTo(pointProps.x, pointProps.y)
      }

      for (let i = line1Meta.data.length - 1; i >= 0; i--) {
        const pointProps = line1Meta.data[i].getProps(['x', 'y'])
        ctx.lineTo(pointProps.x, pointProps.y)
      }

      ctx.closePath()
      ctx.fill()
      ctx.restore()

      // Draw the area below the bottom line
      ctx.save()
      ctx.fillStyle = redGradient
      ctx.beginPath()

      ctx.moveTo(line1Meta.data[0].x, line1Meta.data[0].y)
      for (let i = 1; i < line1Meta.data.length; i++) {
        const pointProps = line1Meta.data[i].getProps(['x', 'y'])
        ctx.lineTo(pointProps.x, pointProps.y)
      }

      ctx.lineTo(line1Meta.data[line1Meta.data.length - 1].x, yAxis?.getPixelForValue(0))
      ctx.lineTo(line1Meta.data[0].x, yAxis?.getPixelForValue(0))
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    },
  }

  const data = {
    datasets: [
      {
        label: 'Line 1',
        data: chartData.healthBottom,
        borderColor: '#38A611',
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.4,
        fill: false, // This line will not be filled.
        showLine: true,
      },
      {
        label: 'Line 2',
        data: chartData.healthTop,
        borderColor: '#38A611',
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.4,
        fill: '-1', // This line will be filled with the area between the lines.
        showLine: true,
      },
      {
        label: 'Comparable Tokens',
        data: chartData?.tokens,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        showLine: false,
        hitRadius: 30,
      },
    ],
  }

  return (
    <>
      <Scatter options={options} data={data} ref={canvasRef} sx={{ ml: '20px', mr: '20px', mt: '20px' }} />
      <CustomTooltip show={tooltipState.show} x={tooltipState.x} y={tooltipState.y} data={tooltipState.data} />
    </>
  )
}

export default Chart
