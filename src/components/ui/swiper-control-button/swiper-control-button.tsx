import { useSwiper } from "swiper/react";
import classNames from "classnames";

import styles from "./swiper-control-button.module.scss";

export interface SwiperControlButtonProps {
  variant: string;
}

const SwiperControlButton = ({ variant }: SwiperControlButtonProps) => {
  const swiper = useSwiper();

  return (
    <button
      className={classNames(styles["slide__control"], {
        [styles["slide__control--prev_mod"]]: variant == "prev",
        [styles["slide__control--next_mod"]]: variant == "next",
      })}
      onClick={() => {
        if (variant === "prev") {
          swiper.slidePrev();
        }

        if (variant === "next") {
          swiper.slideNext();
        }
      }}
    >
      {variant == "prev" && (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 11.92">
            <path
              d="M22,5.04H2.59L6.34,1.3l-1.3-1.3L0,5.04v1.84l5.04,5.04,1.3-1.3-3.75-3.74H22v-1.84Z"
              fill="currentColor"
            />
          </svg>
          <div className={styles["slide__control_title"]}>Back</div>
        </>
      )}
      {variant == "next" && (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 11.92">
            <path
              d="M0,5.04H19.41l-3.75-3.74,1.3-1.3,5.04,5.04v1.84l-5.04,5.04-1.3-1.3,3.75-3.74H0v-1.84Z"
              fill="currentColor"
            />
          </svg>
          <div className={styles["slide__control_title"]}>Next</div>
        </>
      )}
    </button>
  );
};

export default SwiperControlButton;
