import React, { ReactNode } from "react";
import styles from "./stream-section-filter-button.module.scss";
import classNames from "classnames";
import Image from "next/image";

export type StreamSectionFilterButtonProps = {
  title: string;
  active?: boolean;
  disabled?: boolean;
  eventTitle?: string;
  onClick?: (title: string) => void;
};

export function StreamSectionFilterButton({
  title,
  active,
  disabled,
  eventTitle,
  onClick,
}: StreamSectionFilterButtonProps) {
  return (
    <div className={styles["item"]}>
      <button
        className={classNames(styles["button"], {
          [styles["button--active_state"]]: active,
          [styles["button--disabled_state"]]: disabled,
        })}
        type="button"
        onClick={() => {
          if (onClick) {
            return onClick(title);
          }
        }}
      >
        {disabled && (
          <span className={styles["icon"]}>
            <Image src="images/locked.svg" alt="locked icon" fill />
          </span>
        )}
        {eventTitle ? eventTitle : title}
      </button>
    </div>
  );
}
