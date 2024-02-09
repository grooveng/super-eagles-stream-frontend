import { ReactNode } from "react";
import styles from "./account-link.module.scss";

type AccountLinkWrapperProps = {
  children: ReactNode;
};

export function AccountLinkWrapper({ children }: AccountLinkWrapperProps) {
  return <div className={styles["wrapper"]}>{children}</div>;
}
