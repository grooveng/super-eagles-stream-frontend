import { ReactNode } from "react";
import styles from "./column.module.scss";

type ColumnProps = {
  children: ReactNode;
};

export function Column({ children }: ColumnProps) {
  return <div className={styles["column"]}>{children}</div>;
}
