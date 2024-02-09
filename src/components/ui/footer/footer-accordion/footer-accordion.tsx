import React from "react";
import styles from "./footer-accordion.module.scss";
import classNames from "classnames";
import { Picture } from "@/components/ui/picture";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import Link from "next/link";

type FooterAccordionProps = {
  id: string;
  title: string;
  content: { text: string; href?: string; link?: string }[];
  active: boolean;
  changeActiveList: (id: string) => void;
};

export function FooterAccordion({
  id,
  title,
  content,
  active,
  changeActiveList,
}: FooterAccordionProps) {
  const toggleContent = () => changeActiveList(id);

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["line"]}>
      </div>
      <div
        onClick={toggleContent}
        className={classNames(
          "fa_text",
          styles["title"],
          active && styles["active"]
        )}
      >
        {title}
        <button type="button">
          <ArrowIcon active={active} />
        </button>
      </div>
      {active && (
        <div className={styles["links_section"]}>
          <ul>
            {content.map((c, idx) => {
              return c.link ? (
                <li key={idx}>
                  <Link href={c.link}>{c.text}</Link>
                </li>
              ) : (
                <li key={idx}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer">
                    {c.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
