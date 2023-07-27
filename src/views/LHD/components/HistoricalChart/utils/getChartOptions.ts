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
      y6: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: false,
          text: 'Seven',
        },
      },
      y7: {
        type: 'linear' as const,
        display: false,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: false,
          text: 'Eight',
        },
      },
    },
  }

  return options
}
