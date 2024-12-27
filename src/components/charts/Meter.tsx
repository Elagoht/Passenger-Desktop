import classNames from "classnames"
import { FC } from "react"

interface IMeterProps {
  percentage: number
  colors?: string[]
  className?: string
}

const Meter: FC<IMeterProps> = ({ percentage, className, colors = [
  "#FF4040", "#FF8C00", "#FFD700", "#ADFF2F", "#32CD32", "#228B22"
] }) => {
  return <div role="presentation"
    className={classNames(
      "w-full h-1 rounded-full overflow-hidden bg-tuatara-500",
      className
    )}
  >
    <div style={{
      height: "100%",
      width: "100%",
      background: `linear-gradient(to right, ${colors.join(", ")})`,
      clipPath: `inset(0% ${100 - percentage}% 0% 0% round 10px)`
    }} />
  </div>
}

export default Meter