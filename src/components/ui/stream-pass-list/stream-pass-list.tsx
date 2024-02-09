import { Events } from "@/types";
import { getRightsIcon } from "@/utils";
import { format } from "date-fns";
import { NotFound } from "../not-found";
import { StreamPassCard } from "../stream-pass-card/stream-pass-card";
import styles from "./stream-pass-list.module.scss";
import { LeanStreamPassCard } from "../stream-pass-card/lean-stream-pass-card";

export type StreamPassListProps = {
  data: Events[] | undefined;
  mode?: "vertical" | "grid";
};

export function StreamPassList({ data, mode }: StreamPassListProps) {
  if (data?.length === 0) {
    return <NotFound hasButton={false} />;
  }

  return (
    <div
      className={`${
        mode === "vertical"
          ? styles["list_vert_wrapper"]
          : styles["list_wrapper"]
      }`}
    >
      {data &&
        data
          .filter((d) => Boolean(d))
          .map(
            (
              {
                printUrl,
                startAt,
                title,
                rights,
                id,
                heroSectionUrls,
                artist,
                eventMode,
                ...rest
              },
              index
            ) => {
              const date = format(new Date(startAt), "dd-MM-yyyy");
              const startTime = `${format(new Date(startAt), "HH:mm")} GMT`;
              const icon = getRightsIcon({ rights, withIcon: true });
              const heroSectionUrl = !!heroSectionUrls?.length
                ? heroSectionUrls[0]
                : "";
              const img = artist?.imageUrl ?? heroSectionUrl;
              const artistName = artist?.name;
              const color = rest.eventTag?.shortName;
              const tag = rest.eventTag?.shortName;

              return (
                <LeanStreamPassCard
                  id={id}
                  tag={tag}
                  img={img}
                  key={index}
                  date={date}
                  rights={rights}
                  icon={icon}
                  color={color}
                  title={title}
                  bgImg={printUrl}
                  eventMode={eventMode}
                  artistName={artistName}
                  duration={`${startTime}`}
                />
              );
            }
          )}
    </div>
  );
}
