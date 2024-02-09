import React, { ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import classNames from "classnames";

const baseLayoutStyles = cva("base", {
  variants: {
    variant: {
      baseOtherPages: "base-padding-top",
      none: "",
    },
  },
});

type BaseLayoutProps = VariantProps<typeof baseLayoutStyles> & {
  children: ReactNode;
};

export function BaseLayout({ children, variant }: BaseLayoutProps) {
  return (
    <div className={classNames(baseLayoutStyles({ variant }))}>{children}</div>
  );
}
