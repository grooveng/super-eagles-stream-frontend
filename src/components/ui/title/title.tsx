import { ReactNode } from "react";
import DOMPurify from "isomorphic-dompurify";
import { cva, VariantProps } from "class-variance-authority";

// import { AnimSplitEl } from "../anim-split-el";
import styles from "./title.module.scss";

const className = cva(styles["title"], {
  variants: {
    size: {
      xxs: styles["title--xxs_mod"],
      xs: styles["title--xs_mod"],
      base: styles["title--base_mod"],
      md: styles["title--bigger_mod"],
    },
    text_center: {
      true: styles["title--center_mod"],
    },
    decor: {
      true: styles["title--decor_mod"],
    },
    color: {
      primary: styles["title--decor--primary_mod"],
      secondary: styles["title--decor--secondary_mod"],
      newFaqColor: styles["title--decor--newFaq_mod"],
      yellow: styles["title--decor--yellow"]
    },
  },
  defaultVariants: {
    size: "base",
  },
});

type TitleProps = VariantProps<typeof className> & {
  children: string | ReactNode;
  tag?: keyof JSX.IntrinsicElements;
  decor?: boolean;
  color?: string;
  text_center?: boolean;
};

export function Title({
  children,
  tag = "div",
  size,
  decor,
  color,
  text_center,
}: TitleProps) {
  const Tag = tag;

  if (typeof children === "string")
    return (
      <Tag
        className={className({ size, decor, color, text_center })}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(children) }}
      />
    );

  return (
    <Tag className={className({ size, decor, text_center,color })}>{children}</Tag>
  );
}
