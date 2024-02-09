import { ReactNode } from "react";
import styles from "./column.module.scss";
import classNames from "classnames";

type ColumnProps = {
  children: ReactNode;
  mod?: string;
};

export function Column({ children, mod }: ColumnProps) {
  return (
    <div
      className={classNames(styles["header__column"], {
        [styles[mod!]]: mod,
      })}
    >
      {children}
    </div>
  );
}
