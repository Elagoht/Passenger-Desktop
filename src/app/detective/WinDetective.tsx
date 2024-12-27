import Loading from "@/components/layout/Loading"
import Window from "@/components/layout/Window"
import Detective from "@/components/windows/detective"
import Newspaper from "@/components/windows/detective/Newspaper"
import Paginator from "@/components/windows/detective/Newspaper/Paginator"
import handleResponse, { handleHTTPResponse } from "@/helpers/services"
import StringHelper from "@/helpers/string"
import { useAuth } from "@/hooks/authorization"
import { getNews } from "@/services/newsServices"
import { getDetectiveReports } from "@/services/reportServices"
import { IconZoomCancel } from "@tabler/icons-react"
import { useEffect, useState } from "react"

const WinDetective = () => {
  const [detectiveReports, setDetectiveReports] = useState<
    Maybe<DetectiveReport>
  >(null)
  const [leakedData, setLeakedData] = useState<Maybe<LeakedData[]>>(null)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const handleNewsPagination = (page: number = 1) => getNews(
    page
  ).then((response) => handleHTTPResponse(
    response,
    [() => {
      setLeakedData(response.data.data)
      setTotalPages(response.data.total)
      setCurrentPage(response.data.page)
      scrollTo({ top: 0, behavior: "smooth" })
    }],
    [() => setLeakedData([]), {
      errorTitle: "Couldn't get leaked data"
    }]
  ))

  useEffect(() => {
    getDetectiveReports(
      useAuth()
    ).then((response) => handleResponse(
      response,
      [() => setDetectiveReports(StringHelper.deserialize<DetectiveReport>(
        response.stdout
      ))],
      [() => void 0, {
        errorTitle: "Error",
        errorIcon: IconZoomCancel
      }]
    ))
    handleNewsPagination()
  }, [])

  if (
    !detectiveReports
    || !leakedData
  ) return <Loading />

  return <Window
    wide
    title="Detective"
    description={
      "Detective is your personal assistant to help you"
      + " find potential security issues in your vault."
    }
  >
    <Detective detectiveReports={detectiveReports} />

    <Newspaper content={leakedData} />

    <Paginator
      totalPages={Math.floor(totalPages / 12)}
      currentPage={currentPage}
      onPageChange={handleNewsPagination}
    />
  </Window >
}

export default WinDetective
