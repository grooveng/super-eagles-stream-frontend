import { ReactNode } from "react";
import styles from "./item.module.scss";

type ItemProps = {
  children: ReactNode;
};

export function Item({ children }: ItemProps) {
  return <li className={styles["item"]}>{children}</li>;
}
