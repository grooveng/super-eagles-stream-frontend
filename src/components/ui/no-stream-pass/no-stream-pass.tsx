import React from "react";
import styles from "./no-stream-pass.module.scss";
import Image from "next/image";

export function NoStreamPass() {
  return (
    <div className={styles["no-results"]}>
      <Image
        src="/images/not-found/stream-pass-not-found.svg"
        alt="not found"
        className={styles["notFoundImage"]}
        fill
      />
      <p>You don’t have any stream passes under this category</p>
    </div>
  );
}

export default NoStreamPass;
