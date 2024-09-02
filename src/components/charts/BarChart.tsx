import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js"
import { FC } from "react"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface IBarChartProps {
  data: Array<{
    label: string
    value: number
  }>
  colors: string[]
  axisNames: [string, string]
}

const BarChart: FC<IBarChartProps> = ({ data, colors, axisNames = ["x", "y"] }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: colors.slice(0, data.length)
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false
      },
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: axisNames[0]
        }
      },
      y: {
        title: {
          display: true,
          text: axisNames[1]
        }
      }
    }
  }

  return <Bar
    data={chartData}
    options={options}
  />
}

export default BarChart
