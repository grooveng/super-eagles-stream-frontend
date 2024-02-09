import React from "react";
import styles from "./not-found.module.scss";
import Image from "next/image";
import { Button } from "../button";

type NotFoundProps = {
  hasButton?: boolean;
  isForTransactions?: boolean;
};

export function NotFound({ hasButton, isForTransactions }: NotFoundProps) {
  if (isForTransactions) {
    return (
      <div className={styles["no-results"]}>
        <Image
          src="/images/not-found/no-results.svg"
          alt="not found"
          className={styles["notFoundImage"]}
          fill
        />
        <p>Transactions Unavailabe</p>

        {hasButton && (
          <div className={styles["recommendButton"]}>
            <Button>Recommend An Event</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles["no-results"]}>
      <Image
        src="/images/not-found/no-results.svg"
        alt="not found"
        className={styles["notFoundImage"]}
        fill
      />
      <p>We can’t find that event… or maybe you’re ahead of your time…</p>

      {hasButton && (
        <div className={styles["recommendButton"]}>
          <Button>Recommend An Event</Button>
        </div>
      )}
    </div>
  );
}

export default NotFound;
