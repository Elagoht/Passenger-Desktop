import classNames from "classnames"
import { FC } from "react"
import "swiper/css"
import "swiper/css/pagination"
import { A11y, Keyboard, Pagination, Scrollbar } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import StatisticsSummary from "./StatisticsSummary"
import Statistics from "../../helpers/statistics"
import { usePassphrasesSlice } from "../../stores/passphrases"

const StatisticsSwiper: FC = () => {
  const passphrases = usePassphrasesSlice(state => state.passphrases)

  const statisticsManager = new Statistics(passphrases)

  return <Swiper
    slidesPerView={1.25}
    spaceBetween={10}
    centeredSlides
    loop
    grabCursor
    a11y={{ enabled: true }}
    keyboard={{ enabled: true, onlyInViewport: true }}
    pagination={{ clickable: true }}
    modules={[Scrollbar, A11y, Keyboard, Pagination]}
    className={classNames({
      "fixed top-0 left-0 w-full h-80 -z-10": true,
      "transition-all duration-300 ease-in-out": true
    })}
  >
    <SwiperSlide>
      <StatisticsSummary statisticsManager={statisticsManager} />
    </SwiperSlide>
  </Swiper>
}

export default StatisticsSwiper
