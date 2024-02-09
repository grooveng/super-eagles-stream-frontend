import React, { ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";

import styles from "./tile.module.scss";

const tileStyles = cva(styles["tile"], {
  variants: {
    size: {
      base: styles["tile--full_width"],
      half: styles["tile--half_width"],
      third: styles["tile--third_width"],

      seventy: styles["tile--seventy_width"],
      thirty: styles["tile--thirty_width"],
    },
    terms: {
      true: styles["tile--terms_mod"],
    },
  },
  defaultVariants: {
    size: "base",
  },
});

type TileProps = VariantProps<typeof tileStyles> & {
  children: ReactNode;
};

export function Tile({ size, terms, children }: TileProps) {
  return <div className={tileStyles({ size, terms })}>{children}</div>;
}
