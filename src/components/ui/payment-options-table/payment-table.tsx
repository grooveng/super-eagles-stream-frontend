import {
  PaymentGatewayProps,
  PaymentGatewayProvider,
} from "@/components/section/stream-passes-section/confirm-basket";
import { useAuthContext } from "@/context/auth";
import { EventTagShortName, StreamPass } from "@/types";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { IoDiamond } from "react-icons/io5";
import {
  PaymentMethod,
  PaymentMethodProps,
} from "../payment-method/payment-method";
import styles from "./payment-table.module.scss";

const tableStyles = cva(styles["cart_table"], {
  variants: {
    offset: {
      none: "",
      base: styles["cart_table--offset_mod"],
    },
  },
  defaultVariants: {
    offset: "none",
  },
});

export type CartTableProps = {
  eid: string;
  list: PaymentMethodProps[];
  children?: ReactNode;
  tag?: EventTagShortName;
  streamPass?: StreamPass;
  disableSelection?: boolean;
} & {
  handlePaymentGateway: (payload: PaymentGatewayProps) => void;
} & VariantProps<typeof tableStyles>;

function PaymentMethodTable({
  list,
  children,
  offset,
  handlePaymentGateway,
}: CartTableProps) {
  const [selected, setSelected] = useState("");
  const { geoCode } = useAuthContext();

  const initRecommend = useCallback(() => {
    if (list.length === 1) {
      const item = list[0];

      setSelected(item.title);
      handlePaymentGateway({
        gateway: item.title,
        totalPrice: item.totalPrice ?? "",
      });
    }
  }, [list, handlePaymentGateway]);

  useEffect(() => {
    initRecommend();

    // eslint-disable-next-line
  }, []);

  if (!list.length) {
    return null;
  }

  return (
    <div className={tableStyles({ offset })}>
      <ul className={styles["cart_table__in"]}>
        {list.map((item, index) => {
          const itemClassName = `${styles["cart_table__row"]} ${
            item.title === selected ? styles.active : ""
          }`;

          const totalPrice = item.totalPrice ?? "";

          return (
            <li
              onClick={() => {
                setSelected(item.title);
                handlePaymentGateway({
                  gateway: item.title,
                  totalPrice,
                });
              }}
              className={itemClassName}
              key={index}
            >
              {geoCode?.isNigerian &&
                item.title === PaymentGatewayProvider.Paystack && (
                  <span className={styles["recommended"]}>
                    <IoDiamond className={styles["diamond"]} /> Recommended
                  </span>
                )}

              {!geoCode?.isNigerian &&
                (index > 0 || list.length === 1) &&
                item.title === PaymentGatewayProvider.Stripe && (
                  <span className={styles["recommended"]}>
                    <IoDiamond className={styles["diamond"]} /> Recommended
                  </span>
                )}
              <PaymentMethod {...item} totalPrice={totalPrice} />
            </li>
          );
        })}
      </ul>

      {children}
    </div>
  );
}

export { PaymentMethodTable };
