import { ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import classNames from "classnames";
import styles from "./action-tile.module.scss";
import { Picture, PictureProps } from "../picture/picture";
import { SanitaizedText } from "../sanitaized-text";

const textClassName = cva(styles["action_tile"], {
  variants: {
    variant: {
      primary: styles["action_tile--primary_mod"],
      secondary: styles["action_tile--secondary_mod"],
      mtn: styles["action_tile--mtn"],
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type ActionTileProps = VariantProps<typeof textClassName> & {
  children: ReactNode;
  title: string;
  icon?: string;
  bgPicture?: PictureProps;
  bgHoverPicture?: PictureProps;
  isLoading?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
};

export function ActionTile({
  children,
  title,
  bgPicture = {
    img: "images/tile_bg.png",
    alt: "decored background",
  },
  bgHoverPicture = {
    img: "images/tile_bg_hover.png",
    alt: "decored background colored",
  },
  variant,
  onClick,
  isLoading,
  onMouseEnter,
}: ActionTileProps) {
  return (
    <button
      type="button"
      onClick={() => {
        if (isLoading) return;

        return onClick ? onClick() : null;
      }}
      onMouseEnter={onMouseEnter}
      className={textClassName({ variant })}
    >
      <div className={styles["action_tile__illustration"]}>
        <div className={styles["action_tile__wrap"]}>
          <div className={styles["action_tile__bg"]}>
            <Picture {...bgPicture} />
          </div>
          <div
            className={classNames(
              styles["action_tile__bg"],
              styles["action_tile__bg--hover_state"]
            )}
          >
            <Picture {...bgHoverPicture} />
          </div>
          <div className={styles["action_tile__icon"]}>{children}</div>
        </div>
      </div>
      {isLoading ? (
        <p className={styles["action_tile__text"]}>Loading...</p>
      ) : (
        <SanitaizedText className={styles["action_tile__text"]} text={title} />
      )}
    </button>
  );
}
