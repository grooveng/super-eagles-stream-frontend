import React, { ReactNode } from "react";

import styles from "./container.module.scss";
import { VariantProps, cva } from "class-variance-authority";

const ContainerStyles = cva(styles["container"], {
  variants: {
    height: {
      base: styles["container--height_mod"],
    },
  },
});

type ContainerProps = VariantProps<typeof ContainerStyles> & {
  children: ReactNode;
};

export function Container({ height, children }: ContainerProps) {
  return <div className={ContainerStyles({ height })}>{children}</div>;
}
