import { useState } from "react";
import { FooterAccordion } from "../footer-accordion/footer-accordion";
import { list } from "./nav-data";
import styles from './footer-nav-mobile.module.scss'


export const FooterNavMobile = () => {
  const [activeListId, setActiveListId] = useState("");

  const changeActiveList = (id: string) =>
    setActiveListId(activeListId === id ? "" : id);

  return (
    <div className={styles["footer-nav-mobile"]}>
      {list.map((list, index) => {
        return (
          <FooterAccordion
            key={index}
            active={activeListId === list.id}
            changeActiveList={changeActiveList}
            {...list}
          />
        );
      })}
    </div>
  )
}