import { ReactNode } from "react";
import styles from "./text.module.scss";

type TextProps = {
  children: ReactNode;
};

export function Text({ children }: TextProps) {
  return <div className={styles["text"]}>{children}</div>;
}
