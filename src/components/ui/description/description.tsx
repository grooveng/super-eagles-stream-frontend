import { ReactNode } from "react";
import DOMPurify from "isomorphic-dompurify";
import { cva, VariantProps } from "class-variance-authority";
import styles from "./description.module.scss";

const className = cva(styles["description"], {
  variants: {
    size: {
      xxs: styles["description--xxs_mod"],
      xs: styles["description--xs_mod"],
      base: styles["description--base_mod"],
      lg: styles["description--lg_mod"],
    },
    mobSize: {
      base: styles["description--base_mobile_mod"],
      lg: styles["description--lg_mobile_mod"],
    },
    text_center: {
      true: styles["description--text_center_mod"],
    },
    fontMod: {
      base: "",
      style_1: styles["description--style_1_mod"],
    },
    color: {
      base: styles["description--color_base_mod"],
      style_1: styles["description--color_1_mod"],
      danger: styles["description--color_danger_mod"],
    },
  },
  defaultVariants: {
    size: "base",
    color: "base",
  },
});

type DescriptionProps = VariantProps<typeof className> & {
  children: string | ReactNode;
};

export function Description({
  children,
  size,
  mobSize,
  fontMod,
  color,
  text_center
}: DescriptionProps) {
  if (typeof children === "string")
    return (
      <div
        className={className({ size, mobSize, fontMod, color, text_center })}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(children) }}
      />
    );

  return (
    <div className={className({ size, mobSize, fontMod, color, text_center })}>
      {children}
    </div>
  );
}
