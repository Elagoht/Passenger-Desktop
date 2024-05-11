import classNames from "classnames"
import { FC } from "react"
import "swiper/css"
import "swiper/css/pagination"
import { A11y, Keyboard, Pagination, Scrollbar } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { usePassphrasesSlice } from "../../stores/passphrases"

const StatisticsSwiper: FC = () => {
  const detailsVisible = usePassphrasesSlice((state) => state.detailsVisible)

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
      "transition-all duration-300 ease-in-out": true,
      "-translate-y-full": detailsVisible,
    })}
  >
    {Array.from({ length: 3 }).map((_, i) =>
      <SwiperSlide key={i} className="p-8 h-72 my-4 text-2xl text-center flex items-center justify-center">
        {i + 1}
      </SwiperSlide>
    )}
  </Swiper >
}

export default StatisticsSwiper
