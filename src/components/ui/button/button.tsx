import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import gsap from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import Link from "next/link";
import { MouseEventHandler, ReactNode, useEffect, useRef } from "react";
import styles from "./button.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";

const buttonStyles = cva(styles["button"], {
  variants: {
    variant: {
      plain: styles["button--plain_variant"],
      primary: styles["button--primary_variant"],
      secondary: styles["button--secondary_variant"],
      alternate: styles["button--alternate_variant"],
      alternate3: styles["button--alternate3_variant"],
      alternate2: styles["button--alternate2_variant"],
      alternate5: styles["button--alternate5_variant"],
      alternate6: styles["button--alternate6_variant"],
      x_live: styles["button--x-live-color"],
      nxt_up: styles["button--nxt-up-color"],
      africa_world: styles["button--africa-world-color"],
      withIcon: "",
    },
    size: {
      base: styles["button--base_size"],
      small: styles["button--small_size"],
      withIcon: "",
    },
    width: {
      full: styles["button--width_full"],
    },
    disabled: {
      true: styles["disabled-button"],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "base",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & {
  children: ReactNode | string;
  type?: "submit" | "reset";
  isLoading?: boolean;
  href?: string;
  anchor?: boolean;
  handleClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  newTab?: boolean;
  className?: string; // Added className prop
};

export function Button({
  children,
  href,
  variant,
  size,
  width,
  isLoading,
  handleClick,
  type,
  anchor,
  disabled,
  newTab,
  className, // Added className prop
}: ButtonProps) {
  const anchorButtonRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationTimeline = useRef<gsap.core.Timeline | null>(null);

  const { asPath } = useRouter();

  useEffect(() => {
    if (anchor && href && href.includes("#") && typeof window !== "undefined") {
      gsap.registerPlugin(ScrollToPlugin);
      buttonRef?.current?.addEventListener("click", (e) => {
        e.preventDefault();
        gsap.to(window, {
          scrollTo: {
            y: href,
            offsetY: 50,
          },
        });
      });
    }
  });

  const isProfileDetailsRoute = asPath === "/profile#details"; // Check if the route is "/profile#details"

  const buttonClassName = classNames(
    buttonStyles({ variant, size, width }),
    className,
    { [styles["button--zindex-negative"]]: isProfileDetailsRoute } // Add the z-index class if it's the profile details route
  );

  // Hover state animation
  useEffect(() => {
    if (buttonRef.current) {
      const span = buttonRef.current.querySelector("span");

      if (span) {
        const tl = gsap.timeline({ paused: true }); // Specify the type of tl

        animationTimeline.current = gsap.timeline({ paused: true });
        animationTimeline.current.to(span, {
          duration: 0.2,
          yPercent: -150,
          ease: "power2.in",
        });
        animationTimeline.current.set(span, { yPercent: 150 });
        animationTimeline.current.to(span, { duration: 0.2, yPercent: 0 });

        tl.to(span, { duration: 0.2, yPercent: -150, ease: "power2.in" });
        tl.set(span, { yPercent: 150 });
        tl.to(span, { duration: 0.2, yPercent: 0 });

        const handleMouseEnter = () => {
          animationTimeline.current?.play(0);
        };

        const handleMouseLeave = () => {
          // Reverse the animation on mouse leave
          animationTimeline.current?.reverse(0);
        };

        buttonRef.current.addEventListener("mouseenter", handleMouseEnter);
        buttonRef.current.addEventListener("mouseleave", handleMouseLeave);

        // Clean up the event listeners on unmount
        return () => {
          buttonRef.current?.removeEventListener(
            "mouseenter",
            handleMouseEnter
          );
          buttonRef.current?.removeEventListener(
            "mouseleave",
            handleMouseLeave
          );
        };
      }
    }
  }, []);

  // Loading state animation
  useEffect(() => {
    if (isLoading) {
      // Create a GSAP animation for the loading state (e.g., rotation)
      const loaderTween = gsap.to(".loader", {
        rotation: 360,
        duration: 1,
        repeat: -1, // Infinite rotation
      });

      // Return a cleanup function to stop the animation when isLoading becomes false
      return () => {
        loaderTween.kill(); // Stop the rotation animation
      };
    }
  }, [isLoading]);

  if (href) {
    return (
      <Link
        className={buttonClassName} // Added className to the classnames
        ref={anchorButtonRef}
        href={href}
        target={newTab ? "_blank" : ""}
      >
        {isLoading ? (
          <span className={styles["loading--wrap"]}>
            <div className={styles["loader"]} />
            {children}
          </span>
        ) : (
          children
        )}
      </Link>
    );
  } else {
    return (
      <button
        type={type ?? "button"}
        className={classNames(
          buttonStyles({ variant, size, width }),
          className
        )}
        onClick={(e) => (handleClick ? handleClick(e) : undefined)}
        disabled={isLoading || disabled}
        ref={buttonRef}
      >
        <span>
          {isLoading ? (
            <span className={styles["loading--wrap"]}>
              <div className={styles["loader"]} />
              {children}
            </span>
          ) : (
            children
          )}
        </span>
      </button>
    );
  }
}
