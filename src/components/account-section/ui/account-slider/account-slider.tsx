import { useEffect, useState } from "react";
import SwiperCore, { EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Picture, PictureProps } from "@/components/ui/picture/picture";
import styles from "./account-slider.module.scss";
import "swiper/css";
import "swiper/css/effect-fade";

type AccountSliderProps = {
  pictures: PictureProps[];
  activeSlide: number;
};

export function AccountSlider({ pictures, activeSlide }: AccountSliderProps) {
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  SwiperCore.use([EffectFade]);

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(activeSlide, 500);
    }
  }, [swiper, activeSlide]);

  return (
    <Swiper
      effect="fade"
      slidesPerView={1}
      className={styles["account_slider"]}
      initialSlide={activeSlide}
      onSwiper={setSwiper}
      allowTouchMove={false}
    >
      {pictures.map((picture, index) => {
        return (
          <SwiperSlide className={styles["account_slider__slide"]} key={index}>
            <Picture noSource {...picture} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
