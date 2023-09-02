import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import SwiperCore, { Navigation } from 'swiper';
import SecondIntro from './SecondIntro'
import ThirdIntro from './ThirdIntro'

SwiperCore.use([Navigation]);

const SwiperSlider = () => {
  const swiperParams = {
    spaceBetween: 10,
    navigation: true,
    slidesPerView: 'auto',
    centeredSlides: false,
    loop: true,
  };

  return (
    <Swiper {...swiperParams}>
      <SwiperSlide>
        <SecondIntro />
      </SwiperSlide>
      <SwiperSlide>
        <ThirdIntro />
      </SwiperSlide>
     
      {/* Add more slides with components as needed */}
    </Swiper>
  );
};

export default SwiperSlider;
