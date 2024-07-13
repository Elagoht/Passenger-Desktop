import React, { FC } from "react"
import Window from "@/components/layout/Window"
import { IconLoader } from "@tabler/icons-react"

const Loading: FC = () => {
  return <Window>
    <div className="flex gap-2 items-center justify-center h-full">
      <IconLoader className="animate-spin fade-in" size={128} />
    </div>
  </Window>
}

export default Loading