import React from "react";
import styles from "./sticky-container.module.scss";

export type StickyContainerProps = {
  children?: React.ReactNode;
};

export const StickyContainer = ({ children }: StickyContainerProps) => {
  return <div className={styles["sticky-container"]}>{children}</div>;
};
