import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import '../css/ScreenshotGallery.css'

// Import Swiper styles
import 'swiper/swiper.scss';
const ScreenshotGallery = (props) => {
  if (props.screenshots.length > 0) {
    return (
      <div className="ScreenshotGallery">
        <Swiper
          spaceBetween={20}
          slidesPerView={1.5}
          loop={true}
          autoplay={true}
          centeredSlides={true}
          breakpoints={{
            640: {
              slidesPerView: 2.5
            },
            1200: {
              slidesPerView: 4.5
            }
          }}>
          {props.screenshots.map((screenshot, idx) => {
            return (
              <SwiperSlide key={idx}>
                <img src={screenshot.image} alt="game screenshot"></img>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    )
  } else {
    return null
  }
}
export default ScreenshotGallery;
