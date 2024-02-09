import React from "react";
import styles from "./no-transaction.module.scss";
import Image from "next/image";

export function NoTransactions() {
  return (
    <div className={styles["no-results"]}>
      <Image
        src="/images/not-found/stream-pass-not-found.svg"
        alt="not found"
        className={styles["notFoundImage"]}
        fill
      />
      <p>You have not made any transactions...</p>
    </div>
  );
}

export default NoTransactions;
