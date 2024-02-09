import { ReactNode } from "react";
import classNames from "classnames";
import styles from "./account-section.module.scss";
import { Picture, PictureProps } from "@/components/ui/picture/picture";
import { Title } from "@/components/ui/title/title";
import { AccountSlider } from "./ui";
import { VariantProps, cva } from "class-variance-authority";
import { boolean } from "zod";
import { Description } from "../ui/description";
import { MtnLogo } from "../ui/mtn-logo";

const contentStyles = cva(styles["account__content"], {
  variants: {
    contentSize: {
      sm: styles["account__content--sm"],
    },
    subtitleOffset: {
      sm: styles["account__content--subtitle_sm_offset"],
      base: styles["account__content--subtitle_base_offset"],
      md: styles["account__content--subtitle_md_offset"],
    },
  },
  defaultVariants: {
    subtitleOffset: "base",
  },
});

export type AccountSectionProps = VariantProps<typeof contentStyles> & {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  picture?: PictureProps[] | PictureProps;
  bgPicture?: PictureProps;
  // breadcrumbs?: BreadcrumbsProps | any[];
  activeSlide?: number;
  backLink?: string;
  heightMod?: boolean;
  imageFill?: boolean;
};

export function AccountSection({
  children,
  picture,
  bgPicture,
  title,
  subtitle,
  activeSlide = 0,
  contentSize,
  subtitleOffset,
  // breadcrumbs,
  backLink,
  heightMod = true,
  imageFill,
}: AccountSectionProps) {
  return (
    <section className={styles["account"]}>
      <div className={styles["account__bg"]}>
        <Picture imageFill={imageFill} {...bgPicture} noSource />
      </div>
      {/* {breadcrumbs && (
        <div className={styles["account__nav"]}>
          <Breadcrumbs {...breadcrumbs} />
        </div>
      )} */}
      <div className={styles["account__row"]}>
        <div className={styles["account__column"]}>
          <div className={styles["account__container"]}>
            <div className={styles["account__wrap"]}>
              {Array.isArray(picture) ? (
                <AccountSlider pictures={picture} activeSlide={activeSlide} />
              ) : (
                <div className={styles["account__image"]}>
                  <Picture {...picture} noSource />

                  <div className={styles["account__description-wrap"]}>
                    <div className={styles["account__description"]}>
                      <div className={styles["account__description-top"]}>
                        <p>Together, we rise</p>
                        <p>unite for Victory, Nigeria</p>
                      </div>

                      <div className={styles["account__description-bottom"]}>
                        <p>Brought to you by </p>
                        <MtnLogo />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={classNames(styles["account__column"], {
            [styles["account__column--height_mod"]]: heightMod,
          })}
        >
          <div className={styles["account__body"]}>
            <div className={contentStyles({ subtitleOffset, contentSize })}>
              <div className={styles["account__title"]}>
                <Title size="xs" tag="h1">
                  {title}
                </Title>
              </div>
              <div className={styles["account__subtitle"]}>{subtitle}</div>
              <div className={styles["account__children"]}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
