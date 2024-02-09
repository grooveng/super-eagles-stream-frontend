import { ReactNode } from "react";
import styles from "./logo-list.module.scss";
import { Item } from "./ui";

type LogoListProps = {
  children: ReactNode;
};

export function LogoList({ children }: LogoListProps) {
  return <ul className={styles["logo_list"]}>{children}</ul>;
}

LogoList.Item = Item;
