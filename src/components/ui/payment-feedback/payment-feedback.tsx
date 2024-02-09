import { PaymentFailedCard } from "@/components/section/payment-failed-card";
import { PaymentSuccessCard } from "@/components/section/payment-success-card";
import { StreamPassesSection } from "@/components/section/stream-passes-section";
import { Events, ResponseWithEvent } from "@/types";
import { instance } from "@/utils/instance";
import { ClockIcon } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { EventBanner, EventBannerProps } from "../event-banner";
import { CalendarIcon } from "../icons/calendar";
import { ParticlesBackground } from "../particles-backround";

export const PaymentFeedback = () => {
  const { Banner } = StreamPassesSection;
  const [streamEvent, setStreamEvent] = useState<Events>();
  const { query, pathname } = useRouter();
  const { eid } = query;
  const tag = streamEvent?.eventTag.shortName;
  const { isLoading } = useQuery(
    ["get-event-payment"],
    async (): Promise<Events> => {
      const { data } = await instance.get<ResponseWithEvent>(`/events/${eid}`);

      setStreamEvent(data.data);
      return data.data;
    },
    {
      enabled: !!eid,
    }
  );

  const banner: EventBannerProps | undefined = {
    tag,
    image: {
      img: streamEvent?.artist.imageUrl,
    },
    details: {
      name: streamEvent?.artist?.name,
      label: streamEvent?.title,
      list: [
        {
          title: streamEvent?.startAt
            ? format(new Date(streamEvent.startAt), "dd-MM-yyyy")
            : "",
          icon: <CalendarIcon />,
        },
        {
          title: streamEvent?.startAt
            ? format(new Date(streamEvent.startAt), "HH:mm aa")
            : "",
          icon: <ClockIcon />,
        },
      ],
    },
  };
  return (
    <StreamPassesSection
      bg={{
        img: "images/bg.png",
      }}
    >
      <Fragment>
        <Banner>
          <EventBanner {...banner} noSource />
        </Banner>
        {pathname === "/payment-failed" && <PaymentFailedCard eid={eid as string} tag={tag} />}
        {pathname === "/payment-success" && (
          <>
            <ParticlesBackground />
            <PaymentSuccessCard tag={tag} />
          </>
        )}
      </Fragment>
    </StreamPassesSection>
  );
};
