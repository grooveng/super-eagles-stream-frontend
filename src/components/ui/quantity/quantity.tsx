import React from "react";
import styles from "./quantity.module.scss";
import { useToast } from "../toaster-wrapper";

type QuantityProps = {
  qtyValue?: number;
  handleIncrease?: () => void;
  handleDecrease?: () => void;
  disableSelection?: boolean;
  disableInc?: boolean;
};

function Quantity({
  qtyValue = 0,
  handleIncrease,
  handleDecrease,
  disableSelection,
  disableInc,
}: QuantityProps) {
  const { showToast } = useToast();

  return (
    <div className={styles["quantity"]}>
      {!disableSelection && (
        <button
          className={styles["quantity__decrease"]}
          type="button"
          onClick={handleDecrease}
        />
      )}
      <input
        type="number"
        className={styles["quantity__hidden_input"]}
        value={qtyValue}
        disabled
        hidden
        aria-hidden
      />
      <div className={styles["quantity__value"]}>{qtyValue}</div>
      {!disableSelection && (
        <button
          className={`${styles["quantity__increase"]} ${
            disableInc ? styles["disable__inc"] : ""
          }`}
          type="button"
          onClick={() => {
            if (disableInc) {
              showToast(`You reached maximum selection for this pass.`, {
                type: "info",
              });
            } else {
              handleIncrease && handleIncrease();
            }
          }}
        />
      )}
    </div>
  );
}

export { Quantity };
export type { QuantityProps };
