/* eslint-disable react/display-name */
import { prepareSrc } from "@/utils/prepare-image-src";
import React, { Fragment, forwardRef } from "react";

import styles from "./picture.module.scss";
import Image from "next/image";

type PictureProps = {
  img?: string;
  mobileVersion?: boolean;
  alt?: string;
  noSource?: boolean;
  imgId?: string;
  imageFill?: boolean;
};

const Picture = forwardRef<HTMLPictureElement, PictureProps>(
  (
    {
      img,
      alt = "#",
      mobileVersion = false,
      noSource,
      imgId,
      imageFill,
    }: PictureProps,
    ref
  ) => {
    if (!img) return null;

    let webpMob, webpMob2x, imgMob, imgMob2x;

    const img2x = prepareSrc({
      src: img,
      suffix: "@2x",
    });

    const webp = prepareSrc({
      src: img,
      type: "webp",
    });

    const webp2x = prepareSrc({
      src: img,
      suffix: "@2x",
      type: "webp",
    });

    if (mobileVersion) {
      webpMob = prepareSrc({
        src: img,
        suffix: "-mobile",
        type: "webp",
      });
      webpMob2x = prepareSrc({
        src: img,
        suffix: "-mobile@2x",
        type: "webp",
      });
      imgMob = prepareSrc({
        src: img,
        suffix: "-mobile",
      });
      imgMob2x = prepareSrc({
        src: img,
        suffix: "-mobile@2x",
      });
    }

    return (
      <picture className={styles["picture"]} ref={ref}>
        {noSource ? (
          <img
            src={img}
            alt={alt}
            className={styles["picture__image"]}
            id={imgId}
          />
        ) : (
          <Fragment>
            <source
              srcSet={`${webp}${webp2x ? `, ${webp2x} 2x` : ""}`}
              type="image/webp"
              media={webpMob && "(min-width: 1024px)"}
            />
            <source
              srcSet={`${img}${`, ${img2x} 2x`}`}
              media={imgMob && "(min-width: 1024px)"}
            />
            {webpMob && (
              <source
                srcSet={`${webpMob}${webpMob2x ? `, ${webpMob2x} 2x` : ""}`}
                type="image/webp"
                media="(max-width: 1023px)"
              />
            )}
            {imgMob && (
              <source
                srcSet={`${imgMob}${imgMob2x ? `, ${imgMob2x} 2x` : ""}`}
                media="(max-width: 1023px)"
              />
            )}

            <img
              src={img}
              alt={alt}
              className={styles["picture__image"]}
            />
          </Fragment>
        )}
      </picture>
    );
  }
);

export { Picture };
export type { PictureProps };
