import { ReactNode } from "react";
import styles from "./link-wrapper.module.scss";

type LinkWrapperProps = {
  children: ReactNode;
};

export function LinkWrapper({ children }: LinkWrapperProps) {
  return <div className={styles["wrapper"]}>{children}</div>;
}
