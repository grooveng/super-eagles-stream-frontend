import { slugify } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Picture } from "../picture/picture";
import styles from "./stream-pass-card.module.scss";
import classNames from "classnames";
import { EventMode, EventTagShortName } from "@/types";
import { useAuthContext } from "@/context/auth";

export type StreamPassCardProps = {
  img: string;
  bgImg: string;
  icon: string;
  title: string;
  date: string;
  rights: string;
  id: number;
  duration: string;
  color: EventTagShortName;
  href?: string;
  artistName?: string;
  tag: EventTagShortName;
  eventMode: EventMode;
};

export function StreamPassCard({
  img,
  bgImg,
  icon,
  title,
  id,
  date,
  duration,
  rights,
  color,
  artistName,
  tag,
  eventMode,
}: StreamPassCardProps) {
  const { push } = useRouter();
  const slugifiedTitle = slugify(title);
  const { userLocation, geoCode } = useAuthContext();

  const [url, setUrl] = useState(
    `/events/${slugifiedTitle}?eid=${id}&tag=${tag}`
  );

  const mappedContentType = {
    LIVESTREAM: "Livestream",
    ON_DEMAND: "On-Demand",
  };

  const isUnavailableInRegion =
    (rights === "nigeria" &&
      userLocation?.country?.toLowerCase() !== "nigeria") ||
    (rights === "africa" && geoCode?.continent.toLowerCase() !== "africa");

  const handleRoutingToSingleEvent = () => {
    if (!isUnavailableInRegion) {
      push(url);
    }
  };

  if (isUnavailableInRegion) {
    return (
      <div className={styles["disabled-card"]}>
        <div className={styles["disabled-img__main_in"]}>
          <Picture img={img} alt={title} noSource />
        </div>

        {eventMode && (
          <div className={styles["disabled-event_mode"]}>
            <p>{mappedContentType[eventMode]}</p>
          </div>
        )}

        <div className={classNames(styles["disabled-fixedLine"])} />

        <div className={styles["disabled-unavailable"]}>
          <p>This is unavailable in your region</p>
        </div>

        <div className={styles.disabled_card_footer}>
          <div className={styles.disabled_footer_text}>
            <div className={classNames(styles.disabled_artist_name)}>
              {artistName}
            </div>
            <div className={styles.disabled_event_name}>{title}</div>
            <div className={styles.disabled_event_date}>
              Live from {date}{" "}
              <span className={classNames(styles.disabled_event_duration)}>
                {duration}
              </span>
            </div>
          </div>
          <div className={styles.disabled_footer_icon}>
            <Image src={icon} alt="icon" width={100} height={100} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["card"]} onClick={handleRoutingToSingleEvent}>
      <div className={styles["img__main_in"]}>
        <Picture img={img} alt={title} noSource />
      </div>

      {eventMode && (
        <div className={styles["event_mode"]}>
          <p>{mappedContentType[eventMode]}</p>
        </div>
      )}

      <div className={classNames(`${color}_bg`, styles["fixedLine"])} />

      <div className={styles.card_footer}>
        <div className={styles.footer_text}>
          <div className={classNames(`${color}_color`, styles.artist_name)}>
            {artistName}
          </div>
          <div className={styles.event_name}>{title}</div>
          <div className={styles.event_date}>
            Live from {date}{" "}
            <span
              className={classNames(`${color}_color`, styles.event_duration)}
            >
              {duration}
            </span>
          </div>
        </div>
        <div className={styles.footer_icon}>
          <Image src={icon} alt="icon" width={100} height={100} />
        </div>
      </div>
    </div>
  );
}
