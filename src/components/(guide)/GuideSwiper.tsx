import { FC } from "react"
import "../../design/swiper.css"
import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/pagination"
import { A11y, EffectCards, Keyboard, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const GuideSwiper: FC = () => {
  return <main className="fixed inset-0 bg-red-50 dark:bg-tuatara-950 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-xl z-50 grid place-items-center">
    <div className="max-w-screen-sm w-screen p-4">
      <Swiper
        grabCursor
        effect="cards"
        spaceBetween={50}
        slidesPerView={1}
        a11y={{ enabled: true }}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        modules={[Pagination, Keyboard, A11y, EffectCards]}
      >
        {[...Array.from({ length: 10 })].map((_, index) =>
          <SwiperSlide
            key={index}
            className="bg-red-50 p-8 aspect-square dark:bg-tuatara-950 shadow-modal-xl dark:shadow-tuatara-1000 rounded-lg flex items-center justify-center"
          >
            Slide {index + 1}
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  </main>
}

export default GuideSwiper