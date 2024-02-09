import { VariantProps, cva } from "class-variance-authority";
import React, { ReactNode } from "react";

import styles from "./button-wrapper.module.scss";

const buttonWrapperStyles = cva(styles["component"], {
  variants: {
    offset: {
      base: styles["component--offset_mod"],
      lg: styles["component--offset_lg_mod"],
      xl: styles["component--offset_xl_mod"],
    },
  },
});

type ButtonWrapperProps = VariantProps<typeof buttonWrapperStyles> & {
  children: ReactNode;
};

export function ButtonWrapper({ children, offset }: ButtonWrapperProps) {
  return <div className={buttonWrapperStyles({ offset })}>{children}</div>;
}
