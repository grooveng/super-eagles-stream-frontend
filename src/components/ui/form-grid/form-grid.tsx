import React, { ReactNode } from "react";

import styles from "./form-grid.module.scss";
import { Tile } from "./ui/tile";
import { Container } from "./ui/container";
import { Text } from "./ui/text";
import { VariantProps, cva } from "class-variance-authority";

const formGridStyles = cva(styles["component"], {
  variants: {
    offset: {
      base: styles["component--offset_mod"],
      sm: styles["component--offset_sm_mod"],
      md: styles["component--offset_md_mod"],
      regular: styles["component--offset_regular_mod"],
      intermediate: styles["component--offset_int_mod"],
      lg: styles["component--offset_lg_mod"],
    },
    heightMod: {
      true: styles["component--height_mod"],
    },
  },
});

export type FormGridProps = VariantProps<typeof formGridStyles> & {
  children: ReactNode;
};

export function FormGrid({ offset, heightMod, children }: FormGridProps) {
  return (
    <div className={formGridStyles({ offset, heightMod })}>{children}</div>
  );
}

FormGrid.Tile = Tile;
FormGrid.Container = Container;
FormGrid.Text = Text;
