import "chart.js/auto"
import { FC, ReactNode } from "react"
import { Doughnut } from "react-chartjs-2"

interface IDoughnutChartProps {
  value: number
  title?: ReactNode
  subtitle?: ReactNode
  fillColor?: string
  emptyColor?: string
  minValue?: number
  maxValue?: number
}

const DoughnutChart: FC<IDoughnutChartProps> = ({
  value, title, subtitle,
  fillColor = "#4D9D2F",
  emptyColor = "#b1b0af",
  minValue = 0, maxValue = 100
}) => {
  const totalRange = maxValue - minValue

  const filledValue = value - minValue
  const emptyValue = totalRange - filledValue


  return <div className="relative text-center">
    <Doughnut
      data={{
        datasets: [
          {
            data: [filledValue, emptyValue],
            backgroundColor: [fillColor, emptyColor],
            borderWidth: 0,
            borderRadius: 360,
          }
        ]
      }}
      options={{
        responsive: true,
        cutout: "85%",
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        }
      }}
    />

    <div className="absolute inset-0 flex items-center justify-center flex-col">
      {title}

      {subtitle}
    </div>
  </div>
}

export default DoughnutChart
