import { MtnIcon } from "../icons/mtn";
import { Logo } from "@/components/ui/logo";
import styles from "./powered-by.module.scss";
import { Fragment } from "react";

export const PoweredBy = () => {
  const poweredByList = [
    {
      href: "/",
      icon: <Logo />,
    },
    {
      href: "https://mtn.com.ng",
      icon: <MtnIcon />,
    },
  ];
  return (
    <div className={styles["powered_by_main"]}>
      <p className={styles["text"]}>Powered By</p>

      <div className={styles["svg_wrap"]}>
        {poweredByList.map(({ href, icon }, idx) => (
          <div className={styles["divider_wrap"]} key={idx}>
            <a href={href} className={styles["icon"]}>
              {icon}
            </a>
            <span
              className={`${styles["divider"]} ${
                idx === poweredByList.length - 1 ? styles["hidden"] : ""
              }`}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
};
