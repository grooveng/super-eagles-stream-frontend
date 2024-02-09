/* eslint-disable @next/next/no-img-element */

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import gsap from 'gsap'
import styles from './partner-carousel.module.scss';
import { Fragment, useEffect, useRef } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export type PartnerCarouselProps = {
  list: {
    src: string;
    alt: string
  }[]
}
export const PartnerCarousel = ({ list }: PartnerCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const cloned = carouselRef.current;

    if (cloned) {
      const divToClone = cloned.querySelector('div');

      if (divToClone) {
        // Append cloned div to #cloned
        cloned.appendChild(divToClone.cloneNode(true));

        // Create a GSAP timeline with repeat: -1
        tl.current = gsap.timeline({ repeat: -1 });
        tl.current.to(cloned, { x: -(cloned.offsetWidth / 2), duration: 7, ease: "Power0.easeNone" });
      }
    }
  }, []);

  return (
    <div className={styles["partner_carousel"]} id="carousel__ref" ref={carouselRef}>
      {list.map(({ src, alt }, idx) => <div className={styles["picture_wrap"]} key={idx}>
        <img src={src} alt={alt} />
      </div>)
      }
    </div >
  )

}

/* First Working

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const cloned = carouselRef.current;

    if (cloned) {
      const divToClone = cloned.querySelector('div');

      if (divToClone) {
        // Append cloned div to #cloned
        cloned.appendChild(divToClone.cloneNode(true));

        // Create a GSAP timeline with repeat: -1
        tl.current = gsap.timeline({ repeat: -1 });
        tl.current.to(cloned, { x: -(cloned.offsetWidth / 2), duration: 7, ease: "Power0.easeNone" });
      }
    }
  }, []);

  return (
    <div className={styles["partner_carousel"]} id="carousel__ref" ref={carouselRef}>
      {list.map(({ src, alt }, idx) => <div className={styles["picture_wrap"]} key={idx}>
        <img src={src} alt={alt} />
      </div>)
      }
    </div >
  )
*/

/* Second working
 

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const container = containerRef.current;

    if (carousel && container) {
      const totalWidth = list.length * container.offsetWidth;
      const animationDuration = totalWidth / 100; // Adjust the speed of the animation

      // Set up CSS transition for smooth scrolling
      carousel.style.transition = `transform ${animationDuration}s linear`;

      // Start the animation by translating the carousel to the left
      const animate = () => {
        carousel.style.transform = `translateX(-${totalWidth}px)`;

        // Reset the position to the beginning after animation completes
        setTimeout(() => {
          carousel.style.transition = 'none';
          carousel.style.transform = 'translateX(0)';
          setTimeout(() => {
            carousel.style.transition = `transform ${animationDuration}s linear`;
            requestAnimationFrame(animate);
          });
        }, animationDuration * 1000);
      };

      // Kick off the animation loop
      requestAnimationFrame(animate);
    }
  }, [list]);

  return (
    <div className={styles['partner_carousel_container']} ref={containerRef}>
      <div className={styles['partner_carousel']} ref={carouselRef}>
        {list.map(({ src, alt }, idx) => (
          <div className={styles['picture_wrap']} key={idx}>
            <img src={src} alt={alt} />
          </div>
        ))}
      </div>
    </div>
  );
 
*/
