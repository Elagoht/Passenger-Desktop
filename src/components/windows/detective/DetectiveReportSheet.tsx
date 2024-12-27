import { FC, ReactNode } from "react"

interface IDetectiveReportSheetProps {
  title: string
  isEmpty: boolean
  subtitle?: string
  children: ReactNode
}

const DetectiveReportSheet: FC<IDetectiveReportSheetProps> = ({
  title, isEmpty, subtitle, children
}) => {
  if (isEmpty) return null
  return <fieldset className="p-2 bg-tuatara-50 dark:bg-tuatara-900 rounded-lg
    mt-4 shadow-md self-start w-full"
  >
    <legend className="text-xl font-medium text-leaf-500 px-2 bg-tuatara-50
      dark:bg-tuatara-900 rounded-lg"
    >
      {title}
    </legend>

    {subtitle &&
      <em>{subtitle}</em>
    }

    <div className="flex flex-col gap-2">
      {children}
    </div>
  </fieldset>
}

export default DetectiveReportSheet
