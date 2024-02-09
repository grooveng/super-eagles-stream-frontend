import { Picture, PictureProps } from "@/components/ui/picture/picture";
import { Quantity, QuantityProps } from "@/components/ui/quantity/quantity";
import { useAuthContext } from "@/context/auth";
import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./product.module.scss";
import { CurrencySymbolEnum, StreamPass } from "@/types";
import { useToast } from "@/components/ui/toaster-wrapper";

export type ProductProps = {
  id: number;
  eid: number;
  title: string;
  subtitle: string;
  description: string;
  disabled?: boolean;
  tier?: number;
  disableSelection?: boolean;
} & QuantityProps &
  PictureProps &
  StreamPass;

function Product({
  id,
  img,
  eid,
  title,
  subtitle,
  description,
  qtyValue = 0,
  maxPerUser = 0,
  disabled = false,
  tier,
  disableSelection,
  ...rest
}: ProductProps) {
  const { priceGBP, priceNGN, priceUSD, priceMTN } = rest;
  const [qty, setQty] = useState(qtyValue);
  const [price, setPrice] = useState(0);
  const [locale, setLocale] = useState("");
  const [currency, setCurrency] = useState<CurrencySymbolEnum>(
    CurrencySymbolEnum.USD
  );
  const {
    user,
    discount,
    currencySym,
    geoCode,
    __enriched,

    setTotalPrice,
    incTotalPrice,
    decTotalPrice,
    addToPlaceOrderItem,
    subFromPlaceOrderItem,
  } = useAuthContext();

  const { showToast } = useToast();
  const prevDiscountActivated = useRef(discount?.activated);
  const prevIsMtn = useRef(__enriched?.isMtn);

  const updatePrice = useCallback(() => {
    if (discount?.activated) {
      setCurrency(CurrencySymbolEnum.NGN);
      setLocale("en-NG");
      setPrice(priceMTN);
      return;
    }
    if (discount?.activated || geoCode?.isNigerian) {
      setCurrency(CurrencySymbolEnum.NGN);
      setLocale("en-NG");
      setPrice(priceNGN);
      return;
    } else if (geoCode?.continent === "Europe") {
      setCurrency(CurrencySymbolEnum.GBP);
      setLocale("en-GB");
      setPrice(priceGBP);
      return;
    } else {
      setCurrency(CurrencySymbolEnum.USD);
      setLocale("en-US");
      return setPrice(priceUSD);
    }
  }, [
    priceNGN,
    priceGBP,
    priceUSD,
    geoCode,
    setPrice,
    priceMTN,
    discount?.activated,
  ]);

  useEffect(() => {
    if (
      discount?.activated !== prevDiscountActivated.current ||
      __enriched?.isMtn !== prevIsMtn.current
    ) {
      if (discount?.activated && __enriched?.isMtn) {
        setPrice(priceMTN);
      }
      prevDiscountActivated.current = discount?.activated;
      prevIsMtn.current = __enriched?.isMtn;
    }
  }, [priceMTN, setTotalPrice, discount?.activated, __enriched?.isMtn]);

  useEffect(() => {
    updatePrice();
  }, [updatePrice]);

  const handleQtyIncrease = () => {
    if (!user?.id) return;
    if (disabled) {
      return showToast("You can only buy one ticket per discount", {
        type: "error",
      });
    }

    if (discount?.activated && qty === 1) {
      showToast("You can only buy one ticket per discount", {
        type: "error",
      });
      return;
    }

    if (qty < maxPerUser) {
      incTotalPrice(price);
      setQty((val) => val + 1);

      addToPlaceOrderItem({
        eid,
        price,
        userId: user.id,
        passId: id,
        quantity: qty + 1,
        tier: discount?.activated ? tier : undefined,
        currency,
        locale,
      });
    }
  };
  const handleQtyDecrease = () => {
    if (!user?.id) return;
    if (disabled) return;

    setQty((val) => {
      if (val > 0) {
        return val - 1;
      }
      return val;
    });

    if (qty > 0) {
      decTotalPrice(price);
      subFromPlaceOrderItem({
        eid,
        price,
        userId: user.id,
        passId: id,
        quantity: qty - 1,
        tier: discount?.activated && qty === 1 ? undefined : tier,
        currency,
        locale,
      });
    }
  };

  const priceTotal = qty > 0 && `${currencySym} ${price * qty}`;

  return (
    <div className={styles["product"]}>
      <div className={styles["product__image"]}>
        <Picture img={img} noSource />
      </div>
      <div className={styles["product__content"]}>
        <div className={styles["product__title"]}>
          <div className={styles["product__title_in"]}>{title}</div>
          <div
            className={classNames(
              styles["product__price"],
              styles["product__price--mobile_mod"]
            )}
          >
            {priceTotal}
          </div>
        </div>
        <div className={styles["product__subtitle"]}>{subtitle}</div>
        <div className={styles["product__description"]}>{description}</div>
      </div>
      <div className={styles["product__qty"]}>
        <Quantity
          qtyValue={qty}
          disableInc={rest.disableInc}
          handleIncrease={handleQtyIncrease}
          handleDecrease={handleQtyDecrease}
          disableSelection={disableSelection}
        />
      </div>
      <div
        className={classNames(
          styles["product__price"],
          styles["product__price--desktop_mod"]
        )}
      >
        {priceTotal}
      </div>
    </div>
  );
}

export { Product };
