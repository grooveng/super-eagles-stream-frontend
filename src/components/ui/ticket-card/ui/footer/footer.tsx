import Image from "next/image";
import { ReactNode } from "react";
import styles from "./footer.module.scss";
import { ShareStatus } from "@/types";

type FooterProps = {
  children: ReactNode;
  icon: string;
  title: string;
  type: string;
  shareStatus?: ShareStatus;
  isMTN?: boolean;
};

export function Footer({
  children,
  icon,
  title,
  type,
  isMTN,
  shareStatus,
}: FooterProps) {
  if (shareStatus === "SHARED") {
    return (
      <div className={styles["footer"]}>
        <div className={styles["footer__row"]}>
          <div className={styles["footer__column"]}>
            <div className={styles["footer__icon"]}>
              <Image src={icon} alt="ticket icon" fill />
            </div>
            <div className={styles["footer__wrap"]}>
              <div
                style={{ color: "#C5D328" }}
                className={styles["footer__title"]}
              >
                {title}
              </div>
              <div className={styles["footer__category"]}>{type}</div>
            </div>
          </div>
          <div
            style={{ color: "#C5D328" }}
            className={styles["footer__column"]}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }

  if (isMTN) {
    return (
      <div className={styles["footer"]}>
        <div className={styles["footer__row"]}>
          <div className={styles["footer__column"]}>
            <div className={styles["footer__icon"]}>
              <Image src={icon} alt="ticket icon" fill />
            </div>
            <div className={styles["footer__wrap"]}>
              <div
                style={{ color: "#FBB814" }}
                className={styles["footer__title"]}
              >
                {title}
              </div>
              <div className={styles["footer__category"]}>{type}</div>
            </div>
          </div>
          <div className={styles["footer__column"]}>{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["footer"]}>
      <div className={styles["footer__row"]}>
        <div className={styles["footer__column"]}>
          <div className={styles["footer__icon"]}>
            <Image src={icon} alt="ticket icon" fill />
          </div>
          <div className={styles["footer__wrap"]}>
            <div className={styles["footer__title"]}>{title}</div>
            <div className={styles["footer__category"]}>{type}</div>
          </div>
        </div>
        <div className={styles["footer__column"]}>{children}</div>
      </div>
    </div>
  );
}
