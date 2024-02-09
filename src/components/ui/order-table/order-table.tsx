import React, { UIEventHandler, useEffect, useRef, useState } from "react";
import styles from "./order-table.module.scss";
import { OrderTableDataType } from "@/components/section/wallet-section/wallet-section";
import { capitalize } from "lodash";

type OrderTableProps = {
  orderTableData?: OrderTableDataType[];
};

function OrderTable({ orderTableData }: OrderTableProps) {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const tableRowsRef = useRef<HTMLDivElement | null>(null);
  const tableRows = tableRowsRef.current!;



  return (
    <div className={styles["orderTable__wrapper"]}>
      <div style={{ marginRight: "5px" }}>
        <article className={styles["orderTable__container"]}>
          <section ref={tableRowsRef}>
            <ul className={styles["orderTable__columns"]}>
              <li>Order ID</li>
              <li>Amount</li>
              <li>Status</li>
              <li>Sprayed</li>
            </ul>
          </section>
          <section
            className={`${
              scrolledToBottom ? styles["orderTable__scrollAtBottom"] : ""
            }`}
            ref={tableRowsRef}
          >
            {orderTableData?.map((order, index) => (
              <ul key={`order_${index}`} className={styles["orderTable__row"]}>
                <li>#{order.orderId}</li>
                <li>{formatCurrencyInput(order.amount.toString())}</li>
                <li
                  className={
                    order.status === "SUCCESSFUL"
                      ? styles["orderTable__success"]
                      : ""
                  }
                >
                  {capitalize(order.status.toLowerCase())}
                </li>
                <li>{order.sprayed.toLowerCase()}</li>
              </ul>
            ))}
          </section>
        </article>
      </div>
    </div>
  );
  function formatCurrencyInput(inputValue: any) {
    if (inputValue === "") return "";
    const rawValue = inputValue.replace(/\D/g, "");
    const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "₦ " + formattedValue;
  }
}


export default OrderTable;

