import classNames from "classnames";
import styles from "./payment-method.module.scss";

export type PaymentMethodProps = {
  id: number;
  title: string;
  method: JSX.Element;
  qtyValue: number;
  totalPrice?: string;
};

function PaymentMethod({
  id,
  method,
  qtyValue = 0,
  totalPrice,
}: PaymentMethodProps) {
  return (
    <div className={styles["product"]}>
      <div className={styles["product__image"]}>
        <span className={styles["pay_with"]}>Pay with </span>
        <div className="icon">{method}</div>
      </div>
      <div className={styles["product__qty"]}>
        <div className={styles["quantity_value"]}>{qtyValue}</div>
        <div className={styles["quantity_text"]}>QTY</div>
      </div>
      <div className={classNames(styles["product__price"])}>
        <div className={styles["price"]}>{totalPrice}</div>
      </div>
    </div>
  );
}

export { PaymentMethod };
