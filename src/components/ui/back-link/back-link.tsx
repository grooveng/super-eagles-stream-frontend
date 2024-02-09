
import Link from "next/link";
import React from "react";

import styles from "./back-link.module.scss";
import classNames from "classnames";
import { Hyperlink } from "@/types/hyperlink";

type BackLinkProps = Hyperlink & {
  accountMod: boolean;
};

export function BackLink({ href, text, accountMod }: BackLinkProps) {
  return (
    <Link
      className={classNames(styles["component"], {
        [styles["component--account_mod"]]: accountMod,
      })}
      href={href}
    >
      <div className={styles.icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="11.92"
          viewBox="0 0 22 11.92"
        >
          <path
            id="left"
            d="M23,11.08H3.59L7.34,7.34l-1.3-1.3L1,11.08v1.84l5.04,5.04,1.3-1.3L3.59,12.92H23Z"
            transform="translate(-1 -6.04)"
            fill="currentColor"
          />
        </svg>
      </div>
      {text}
    </Link>
  );
}
