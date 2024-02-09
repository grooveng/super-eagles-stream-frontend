import { PropsWithChildren } from "react";
import styles from "./tickets-list.module.scss";

export function TicketsList({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>{children}</ul>
    </div>
  );
}

function TicketsItem({ children }: PropsWithChildren<{}>) {
  return <li className={styles.item}>{children}</li>;
}

TicketsList.Item = TicketsItem;
