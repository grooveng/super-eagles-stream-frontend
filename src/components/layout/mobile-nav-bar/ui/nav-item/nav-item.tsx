import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import styles from "./nav-item.module.scss";
import { Description } from "@/components/ui/description";
import { useRouter } from "next/router";

type NavItemProps = {
  path: string;
  children: ReactNode;
  currentPath?: string;
  menuTitle?: string;
  hashString?: string;
};

export function NavItem({
  currentPath,
  path,
  children,
  menuTitle,
  hashString = "",
}: NavItemProps) {
  const { asPath } = useRouter();
  const [isHashedAlive, setIsHashedAlive] = useState(false);
  const hashedString =
    asPath.split("#")[1] === undefined ? "" : asPath.split("#")[1];

  useEffect(() => {
    if (asPath) {
      if (hashString === hashedString) setIsHashedAlive(true);
    }
  }, [isHashedAlive]);

  return (
    <li
      className={classNames(styles["item"], {
        [styles["item--active_state"]]: currentPath === path,
      })}
    >
      <Link href={path} className={styles["link"]}>
        {children}
        <Description size="xs">
          <span
            className={
              currentPath === path && isHashedAlive
                ? styles["sub--text_active"]
                : styles["sub--text_not_active"]
            }
          >
            {menuTitle}
          </span>
        </Description>
      </Link>
    </li>
  );
}
