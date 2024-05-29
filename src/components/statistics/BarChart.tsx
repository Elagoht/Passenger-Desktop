import React, { FC } from "react"
import { Bar } from "react-chartjs-2"
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js"

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
    labels: data.map(item => item.label), // X eksenindeki değerler
    datasets: [
      {
        data: data.map(item => item.value), // Y eksenindeki değerler
        backgroundColor: colors.slice(0, data.length),
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false, // Başlığı devre dışı bırakmak için
      },
      legend: {
        display: false, // İsterseniz legend'ı da devre dışı bırakabilirsiniz
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: axisNames[0],
        },
      },
      y: {
        title: {
          display: true,
          text: axisNames[1],
        },
      },
    },
  }

  return <Bar
    data={chartData}
    options={options}
  />
}

export default BarChart
