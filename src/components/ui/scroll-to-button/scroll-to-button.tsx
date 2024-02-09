import React from "react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";

import styles from "./scroll-to-button.module.scss";
import { VariantProps, cva } from "class-variance-authority";

gsap.registerPlugin(ScrollToPlugin);

const scrollToButtonClassName = cva(styles["scroll_to_button"], {
  variants: {
    variant: {
      secondary: styles["scroll_to_button--secondary"],
      tertiary: styles["scroll_to_button--tertiary"],
    },
    position: {
      hero: styles["scroll_to_button--hero_position"],
    },
  },
});

export type ScrollToButtonProps = {
  direction?: "up" | "down";
  position?: "hero";
  targetElementId?: string;
} & VariantProps<typeof scrollToButtonClassName>;

export function ScrollToButton({
  variant,
  direction = "down",
  position,
  targetElementId,
}: ScrollToButtonProps) {
  const scrollTo = (position: number) => {
    gsap.to(window, {
      scrollTo: { y: position, autoKill: false },
      duration: 1,
      ease: 'power2.out',
    });
  };

  const handleClick = () => {
    if (direction === "up") {
      scrollTo(0);
    }

    if (targetElementId) {
      const $targetElement = document.querySelector(targetElementId);

      if ($targetElement !== null && $targetElement instanceof HTMLElement) {
        scrollTo($targetElement.offsetTop);
      }
    }
  };


  return (
    <button
      className={scrollToButtonClassName({ variant, position })}
      type="button"
      onClick={handleClick}
    >
      {direction === "down" && (
        <svg
          id="a"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10.14 28.28"
          className={styles.icon}
        >
          <path d="m.17,22.78l4.34,5.24c.26.31.73.35,1.04.09.03-.03.06-.06.09-.09l4.34-5.24c.25-.32.2-.78-.12-1.03-.31-.24-.75-.2-1,.09l-3.05,3.68V.74C5.81.33,5.48,0,5.08,0s-.74.33-.74.73h0v24.78l-3.05-3.68c-.26-.31-.72-.35-1.03-.1,0,0,0,0,0,0-.31.26-.35.72-.09,1.03Z" />
        </svg>
      )}
      {direction === "up" && (
        <svg
          id="a"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10.14 28.28"
          className={styles.icon}
        >
          <path d="m.17,5.5L4.51.26c.26-.31.73-.35,1.04-.09.03.03.06.06.09.09l4.34,5.24c.25.32.2.78-.12,1.03-.31.24-.75.2-1-.09l-3.05-3.67v24.78c0,.41-.33.74-.74.74s-.74-.33-.74-.74V2.76l-3.05,3.68c-.26.31-.72.35-1.03.1,0,0,0,0,0,0-.31-.26-.35-.72-.09-1.03Z" />
        </svg>
      )}
    </button>
  );
}
