import { ReactNode } from "react";
import { Column } from "./ui";
import styles from "./otp-field.module.scss";

type OtpFieldProps = {
  children: ReactNode;
};

export function OtpField({ children }: OtpFieldProps) {
  return (
    <div className={styles["body"]}>
      <div className={styles["row"]}>{children}</div>
    </div>
  );
}

OtpField.Column = Column;
