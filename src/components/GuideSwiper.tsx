import { FC, createElement, useState } from "react"
import "@/design/swiper.css"
import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/pagination"
import { A11y, EffectCards, Keyboard, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import classNames from "classnames"
import { useAuthorizationSlice } from "@/lib/stores/authorization"
import guideSlides from "@/data/guide"
import { settings } from "@/app/App"

const GuideSwiper: FC = () => {
  const setIsGuideDone = useAuthorizationSlice(state => state.setIsGuideDone)

  const [isOnLastSlide, setIsOnLastSlide] = useState<boolean>(false)

  return <main className="fixed inset-0 bg-tuatara-950 bg-opacity-70 backdrop-blur-xl z-50 grid place-items-center">
    <h1 className="font-bold text-creamcan-500 text-3xl">
      Welcome Passenger
    </h1>

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
        onSlideChange={(swiper) => setIsOnLastSlide(swiper.isEnd)}
      >
        {guideSlides.map((slide, index) =>
          <SwiperSlide
            key={index}
            className="from-tuatara-300 to-tuatara-50 dark:from-tuatara-1000 dark:to-tuatara-900 bg-gradient-to-tl  p-2 md:p-4 aspect-square shadow-lg rounded-lg flex flex-col items-center justify-center text-center prose prose-base sm:prose-lg md:prose-xl lg:prose-2xl prose-headings:my-2 dark:prose-invert prose-h1:text-3xl"
          >
            {createElement(slide.image, {
              size: 64,
              className: "stroke-creamcan-500"
            })}

            <h1 className="font-bold text-creamcan-500">
              {slide.title}
            </h1>

            {slide.content}
          </SwiperSlide>
        )}
      </Swiper>
    </div>

    <button
      className={classNames({
        "py-1 px-2 border border-tuatara-500 rounded-lg text-tuatara-500": true,
        "bg-creamcan-500 hover:bg-creamcan-600 text-creamcan-900 border-creamcan-400": isOnLastSlide
      })}
      onClick={() => {
        setIsGuideDone(true)
        settings.write("isGuideDone", "true")
      }}
    >
      Got it! Skip Guide
    </button>
  </main>
}

export default GuideSwiper