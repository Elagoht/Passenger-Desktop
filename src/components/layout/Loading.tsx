import React, { FC } from "react"
import Window from "@/components/layout/Window"
import { IconLoader } from "@tabler/icons-react"

const Loading: FC = () => {
  return <Window center>
    <IconLoader
      size={192}
      className="loading text-tuatara-500 mx-auto"
    />
  </Window>
}

export default Loading