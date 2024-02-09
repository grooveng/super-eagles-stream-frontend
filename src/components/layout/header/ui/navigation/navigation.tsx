import Link from "next/link";
import styles from "./navigation.module.scss";
import { Hyperlink } from "@/types/hyperlink";

type NavigationProps = {
  items: Hyperlink[];
};

export function Navigation({ items }: NavigationProps) {
  return (
    <nav>
      <ul className={styles["header__list"]}>
        {items.map(({ href, text }) => {
          return (
            <li key={text} className={styles["header__item"]}>
              <Link href={href} className={styles["header__link"]}>
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
