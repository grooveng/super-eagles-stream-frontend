import {
  CtaButton,
  PassShareMutResponse,
  ShareStatus,
  StreamEvent,
} from "@/types";
import { getErrorResponse } from "@/utils";
import { instance } from "@/utils/instance";
import { useMutation } from "@tanstack/react-query";
import { VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../button";
import { Picture, PictureProps } from "../picture";
import { ShareIcon } from "../share-icon";
import { useToast } from "../toaster-wrapper";
import styles from "./ticket-card.module.scss";
import { Footer, ShareForm } from "./ui";
import MTNIcon from "../mtn-icon/mtn-icon";
import SharedIcon from "../shared-icon/shared-icon";
import ReceivedPassIcon from "../received-pass-icon/received-pass-icon";
import { MyTicketsLogo } from "../icons/my-tickets-logo";
import { MtnLogo } from "../mtn-logo";
import { SharedToUduxLogo } from "../icons/sharedto-udux-logo";
import { GiftedToIcon } from "../icons/gifted-to";
import { ReceivedFromIcon } from "../icons/received-from";
import { truncate } from "lodash";
import { useAuthContext } from "@/context/auth";
import MomoLogo from "../momo-logo/momo-logo";

const cardClassName = cva(styles["card"], {
  variants: {
    variant: {
      primary: styles["card--primary_mod"],
      secondary: styles["card--secondary_mod"],
      MTN: styles["card--MTN_mod"],
      SHARED: styles["card--SHARED_mod"],
      RECEIVED: styles["card--RECEIVED_mod"],
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type TicketCardProps = {
  orderItemId: number;
  picture: PictureProps;
  refetch: any;
  decorPicture: PictureProps;
  bgPicture: PictureProps;
  countryIcon: string;
  isMTN: boolean;
  isMomo: boolean;
  shareStatus: ShareStatus;
  icon: string;
  rights: string;
  name: string;
  date?: string;
  passShareUserEmail: string;
  time?: string;
  ctaButton: CtaButton;
  formData: {
    title: string;
    subtitle: string;
    disclaimer: string;
    buttonText: string;
  };
  passId: number;
  title: string;
  type: string;
  event: StreamEvent;
} & VariantProps<typeof cardClassName>;

export type TicketFormProps = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
};

export function TicketCard({
  orderItemId,
  event,
  title,
  passShareUserEmail,
  type,
  refetch,
  variant,
  passId,
  picture,
  decorPicture,
  bgPicture,
  icon,
  rights,
  isMTN,
  isMomo,
  countryIcon,
  name,
  shareStatus,
  date,
  time,
  ctaButton,
  formData,
}: TicketCardProps) {
  const { register, handleSubmit } = useForm<TicketFormProps>();
  const [isFormOpen, setFormOpen] = useState(false);
  const { showToast } = useToast();

  const { userLocation, geoCode } = useAuthContext();

  const isUnavailableInRegion =
    (rights === "nigeria" &&
      userLocation?.country.toLowerCase() !== "nigeria") ||
    (rights === "africa" && geoCode?.continent.toLowerCase() !== "africa");

  const { mutate, isLoading } = useMutation(
    async (variables: {
      orderItemId: number;
      userEmail: string;
      firstName: string;
      lastName: string;
    }) => {
      await instance.post<PassShareMutResponse>(
        "/users/passes/share",
        variables
      );
    }
  );

  const handleOpen = () => setFormOpen(true);
  const handleClose = () => setFormOpen(false);

  const onSubmit: SubmitHandler<TicketFormProps> = (data: TicketFormProps) => {
    if (data.email.length < 1) return;

    mutate(
      {
        orderItemId: orderItemId,
        userEmail: data.email,
        lastName: data.lastName,
        firstName: data.firstName,
      },
      {
        onSuccess: () => {
          setFormOpen(false);
          showToast("You have shared this ticket.", { type: "success" });
          refetch();
        },
        onError: (err) => {
          const message = getErrorResponse(err);
          showToast(message, { type: "error" });
        },
      }
    );
  };

  const renderSharedCard = () => (
    <div className={styles["card"]}>
      {isUnavailableInRegion && (
        <div className={styles["disabled-unavailable"]}>
          <p>This is unavailable in your region</p>
        </div>
      )}

      <div className={`${styles["card-top"]} ${styles["card-top-shared"]}`}>
        <div
          style={{
            background: `linear-gradient(
          rgba(0, 0, 0, 0.712),
          rgba(0, 0, 0, 0.611)
        ), url(${picture.img}) center top / cover no-repeat`,
          }}
          className={styles["card-top-inner"]}
        >
          <div className={styles["card-logo-title"]}>
            <div>
              <SharedToUduxLogo />
            </div>
            <div className={styles["card-top-titles"]}>
              <p>{title}</p>
              <p>{type}</p>
            </div>
          </div>

          <div className={styles["card-top-details"]}>
            <p>{name}</p>
            <p>{event?.title}</p>
            <p>{`Live From: ${date}. ${time}`}</p>
          </div>
        </div>
      </div>

      <div className={styles["card__footer"]}>
        <div className={styles["card-footer-text"]}>
          <div>
            <GiftedToIcon />
          </div>
        </div>

        <div className={styles["card-footer-text"]}>
          <div>icon</div>
          <div>
            <p className={styles["card-footer-from"]}>Gifted to</p>
            <p className={styles["card-footer-email"]}>
              {truncate(passShareUserEmail, {
                length: 18,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReceivedCard = () => (
    <div className={styles["card"]}>
      {isUnavailableInRegion && (
        <div className={styles["disabled-unavailable"]}>
          <p>This is unavailable in your region</p>
        </div>
      )}
      <div className={`${styles["card-top"]} ${styles["card-top-received"]}`}>
        <div
          style={{
            background: `linear-gradient(
            rgba(0, 0, 0, 0.712),
            rgba(0, 0, 0, 0.611)
          ), url(${picture.img}) center top / cover no-repeat`,
          }}
          className={styles["card-top-inner"]}
        >
          <div className={styles["card-logo-title"]}>
            <div className={styles["card-top-titles"]}>
              <p>{title}</p>
              <p>{type}</p>
            </div>
          </div>

          <div className={styles["card-top-details"]}>
            <p>{name}</p>
            <p>{event?.title}</p>
            <p>{`Live From: ${date}. ${time}`}</p>
          </div>
        </div>
      </div>

      <div className={styles["card__footer"]}>
        <div className={styles["card-footer-text__received"]}>
          <div>
            <ReceivedFromIcon />
          </div>
          <div>
            <p className={styles["card-footer-from"]}>From</p>
            <p className={styles["card-footer-email"]}>
              {truncate(passShareUserEmail, {
                length: 12,
              })}
            </p>
          </div>
        </div>

        <a
          className={styles["received-button"]}
          href={`/streaming?eid=${event.id}&pass=${passId}`}
        >
          Watch
        </a>
      </div>
    </div>
  );

  const renderMTNCard = () => (
    <div className={styles["card"]}>
      {isUnavailableInRegion && (
        <div className={styles["disabled-unavailable"]}>
          <p>This is unavailable in your region</p>
        </div>
      )}
      <div className={`${styles["card-top"]} ${styles["card-top-mtn"]}`}>
        <div
          style={{
            background: `linear-gradient(
            rgba(0, 0, 0, 0.712),
            rgba(0, 0, 0, 0.611)
          ), url(${picture.img}) center top / cover no-repeat`,
          }}
          className={styles["card-top-inner"]}
        >
          <div className={styles["card-logo-title"]}>
            <div>
              <MTNIcon />
            </div>

            <div className={styles["card-top-titles"]}>
              <p>{title}</p>
              <p>{type}</p>
            </div>
          </div>

          <div className={styles["card-top-details"]}>
            <p>{name}</p>
            <p>{event?.title}</p>
            <p>{`Live From: ${date}. ${time}`}</p>
          </div>
        </div>
      </div>

      <div className={styles["card__footer"]}>
        <a
          className={styles["mtn-button"]}
          href={`/streaming?eid=${event?.id}&pass=${passId}`}
        >
          Watch
        </a>
      </div>
    </div>
  );

  const renderMomoCard = () => (
    <div className={styles["card"]}>
      {isUnavailableInRegion && (
        <div className={styles["disabled-unavailable"]}>
          <p>This is unavailable in your region</p>
        </div>
      )}
      <div className={`${styles["card-top"]} ${styles["card-top-momo"]}`}>
        <div
          style={{
            background: `linear-gradient(
            rgba(0, 0, 0, 0.712),
            rgba(0, 0, 0, 0.611)
          ), url(${picture.img}) center top / cover no-repeat`,
          }}
          className={styles["card-top-inner"]}
        >
          <div className={styles["card-logo-title"]}>
            <div className={styles["momo-logo"]}>
              <MomoLogo />
            </div>

            <div className={styles["card-top-titles"]}>
              <p>{title}</p>
              <p>{type}</p>
            </div>
          </div>

          <div className={styles["card-top-details"]}>
            <p>{name}</p>
            <p>{event?.title}</p>
            <p>{`Live From: ${date}. ${time}`}</p>
          </div>
        </div>
      </div>

      <div className={styles["card__footer"]}>
        <a
          className={styles["mtn-button"]}
          href={`/streaming?eid=${event?.id}&pass=${passId}`}
        >
          Watch With Momo
        </a>
      </div>
    </div>
  );

  const renderDefaultCard = () => (
    <form
      action="#"
      onSubmit={handleSubmit(onSubmit)}
      className={cardClassName({ variant })}
    >
      <div className={styles["card"]}>
        {isUnavailableInRegion && (
          <div className={styles["disabled-unavailable"]}>
            <p>This is unavailable in your region</p>
          </div>
        )}

        <div className={styles["card-top"]}>
          <div
            style={{
              background: `linear-gradient(
              rgba(0, 0, 0, 0.712),
              rgba(0, 0, 0, 0.611)
            ), url(${picture.img}) center top / cover no-repeat`,
            }}
            className={styles["card-top-inner"]}
          >
            {isFormOpen ? (
              <ShareForm
                isOpen={isFormOpen}
                formData={formData}
                onClose={handleClose}
                register={register}
              />
            ) : (
              <>
                <div className={styles["card-logo-title"]}>
                  <div>
                    <MyTicketsLogo />
                  </div>

                  <div className={styles["card-top-titles"]}>
                    <p>{title}</p>
                    <p>{type}</p>
                  </div>
                </div>

                <div className={styles["card-top-details"]}>
                  <p>{name}</p>
                  <p>{event?.title}</p>
                  <p>{`Live From: ${date}. ${time}`}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles["card__footer"]}>
          <button
            type="submit"
            className={styles["by-me-button"]}
            onClick={handleOpen}
          >
            Share
          </button>
          <a
            className={styles["by-me-button"]}
            href={`/streaming?eid=${event?.id}&pass=${passId}`}
          >
            Watch
          </a>
        </div>
      </div>
    </form>
  );

  switch (shareStatus) {
    case "SHARED":
      return renderSharedCard();
    case "RECIEVED":
      return renderReceivedCard();
    default:
      if (isMTN) {
        return renderMTNCard();
      }
      if (isMomo) {
        return renderMomoCard();
      } else {
        return renderDefaultCard();
      }
  }
}
