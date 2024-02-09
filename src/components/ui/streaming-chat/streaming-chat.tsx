// import React, { ReactNode } from 'react';
import styles from "./streaming-chat.module.scss";
import { Picture } from "../picture/picture";
import Image from "next/image";
import {
  Events,
  ResponseWithTopSpenderDetails,
  TopSpenderDetails,
} from "@/types";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/auth";
import { useQuery } from "@tanstack/react-query";
import { socketInstance } from "@/utils/instance";
import { useState } from "react";

export type StreamingChatProps = {
  sprayMoneyEnabled: boolean;
  top?: {
    title?: string;
    hasIcon?: boolean;
    iconImage: string;
    isSuccessful: boolean;
    avatar?: string;
    username?: string;
    amount?: string;
  };
  head?: {
    upNextUserToSpray?: string;
    processedOrderId?: string;
    justSprayedUser?: string;
  };
  event?: Events;
};

export function StreamingChat({
  top,
  head,
  event,
  sprayMoneyEnabled,
}: StreamingChatProps) {
  const topSpenderTitle = top?.title?.toLowerCase();
  const [topSpenderDetails, setTopSpenderDetails] = useState<
    TopSpenderDetails[]
  >([]);

  const router = useRouter();
  const { user } = useAuthContext();

  const { query } = router;
  const eventUrlId = query.eid as string;

  const { isLoading } = useQuery(
    ["get-top-spender"],
    async (): Promise<TopSpenderDetails[]> => {
      const { data } = await socketInstance.get<ResponseWithTopSpenderDetails>(
        `/events/${eventUrlId}/top-spender`
      );
      setTopSpenderDetails(data.data);
      return data.data;
    },
    {
      enabled: !!eventUrlId,
    }
  );

  if (topSpenderDetails.length >= 1 && top?.isSuccessful === false) {
    return (
      <div className={styles["chat"]}>
        {top && (
          <div className={styles["head"]}>
            <div className={styles["head__bg"]}></div>

            <div className={styles["head-print__bg"]}>
              <Picture
                img="images/spray-money/spray-money-strip.jpg"
                noSource
              />
            </div>

            {topSpenderDetails && (
              <>
                <div className={styles["name"]}>
                  <div className={styles["name__title"]}>
                    <div className={styles["name__subtitle"]}>
                      Highest Spender
                    </div>
                    <p style={{ textTransform: "capitalize" }}>
                      {topSpenderTitle}
                    </p>
                  </div>
                  {top.hasIcon && (
                    <div className={styles["name__icon"]}>
                      <Image src={top.iconImage} alt="name icon" fill />
                    </div>
                  )}
                </div>
                <div className={styles["avatar"]}>
                  <Picture img={topSpenderDetails[0].image} noSource />
                </div>
                <div className={styles["username_title"]}>
                  @{topSpenderDetails[0].userName}
                </div>
                <div className={styles["amount_title"]}>
                  {formatCurrencyValue(topSpenderDetails[0].amount.toString())}
                </div>
              </>
            )}
          </div>
        )}

        {head && (
          <div className={styles["main"]}>
            <div className={styles["main_head"]}>
              <div className={styles["main_head__row"]}>
                <div
                  className={styles["main_head__title"]}
                  style={{ flex: "3" }}
                >
                  <div className={styles["main_head__subtitle"]}>Up Next</div>
                  {head.upNextUserToSpray}
                </div>
                {head?.processedOrderId && (
                  <div
                    className={styles["main_head__title"]}
                    style={{ flex: "2" }}
                  >
                    <div className={styles["main_head__subtitle"]}>
                      Processing Order
                    </div>
                    {head.processedOrderId}
                  </div>
                )}
                <div
                  className={styles["main_head__title"]}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <div
                      className={styles["main_head__subtitle"]}
                      // style={{ paddingRight: "14px" }}
                    >
                      Just Sprayed
                    </div>
                    <p>{head.justSprayedUser}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["main_body"]}>
              <iframe
                src={event?.chatUrl}
                width="100%"
                height="100%"
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (sprayMoneyEnabled === false) {
    return (
      <div className={styles["chat"]}>
        {head && (
          <div className={styles["main"]}>
            <div className={styles["main_body"]}>
              <iframe
                src={event?.chatUrl}
                width="100%"
                height="100%"
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles["chat"]}>
      {top && top.isSuccessful && (
        <div className={styles["head"]}>
          <div className={styles["head__bg"]}></div>

          <div className={styles["head-print__bg"]}>
            <Picture img="images/spray-money/spray-money-strip.jpg" noSource />
          </div>

          {top.isSuccessful && (
            <>
              <div className={styles["name"]}>
                <div className={styles["name__title"]}>
                  <div className={styles["name__subtitle"]}>
                    Highest Spender
                  </div>
                  <p style={{ textTransform: "capitalize" }}>
                    {topSpenderTitle}
                  </p>
                </div>
                {top.hasIcon && (
                  <div className={styles["name__icon"]}>
                    <Image src={top.iconImage} alt="name icon" fill />
                  </div>
                )}
              </div>
              <div className={styles["avatar"]}>
                <Picture img={top.avatar} noSource />
              </div>
              <div className={styles["username_title"]}>@{top.username}</div>
              <div className={styles["amount_title"]}>
                {formatCurrencyValue(top.amount?.toString())}
              </div>
            </>
          )}
        </div>
      )}

      {top && top.isSuccessful === false && (
        <div className={styles["default-head"]}>
          <div className={styles["default-head__bg"]}></div>

          <div className={styles["default-head-print__bg"]}>
            <Picture img="images/spray-money/spray-money-strip.jpg" noSource />
          </div>
          <div className={styles["default-name"]}>
            <div className={styles["default-name__title"]}>
              <div className={styles["default-name__subtitle"]}>
                Highest Spender
              </div>
              <p style={{ textTransform: "capitalize" }}>{topSpenderTitle}</p>
            </div>
            {top.hasIcon && (
              <div className={styles["default-name__icon"]}>
                <Image src={top.iconImage} alt="name icon" fill />
              </div>
            )}
          </div>
          <div className={styles["default-avatar"]}>
            <Picture img="/images/default-image.jpg" noSource />
          </div>
          <div className={styles["default-username_title"]}>
            The highest sprayer is displayed here
          </div>
        </div>
      )}

      {head && (
        <div className={styles["main"]}>
          <div className={styles["main_head"]}>
            <div className={styles["main_head__row"]}>
              <div className={styles["main_head__title"]} style={{ flex: "3" }}>
                <div className={styles["main_head__subtitle"]}>Up Next</div>
                {head.upNextUserToSpray}
              </div>
              {head?.processedOrderId && (
                <div
                  className={styles["main_head__title"]}
                  style={{ flex: "2" }}
                >
                  <div className={styles["main_head__subtitle"]}>
                    Processing Order
                  </div>
                  {head.processedOrderId}
                </div>
              )}
              <div
                className={styles["main_head__title"]}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <div>
                  <div
                    className={styles["main_head__subtitle"]}
                    // style={{ paddingRight: "14px" }}
                  >
                    Just Sprayed
                  </div>
                  <p>{head.justSprayedUser}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["main_body"]}>
            <iframe
              src={event?.chatUrl}
              width="100%"
              height="100%"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
  function formatCurrencyValue(inputValue: any) {
    if (inputValue === "") return "";
    const rawValue = inputValue.replace(/\D/g, "");
    const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "₦ " + formattedValue;
  }
}
