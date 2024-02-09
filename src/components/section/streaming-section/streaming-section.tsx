import { Loader } from "@/components/ui/loaders";
import { NoAccessToStream } from "@/components/ui/no-access-to-stream/no-access-to-stream";
import { StreamingChat } from "@/components/ui/streaming-chat";
import {
  ToastContainerWrapper,
  useToast,
} from "@/components/ui/toaster-wrapper";
import { useAuthContext } from "@/context/auth";

import { DEFAULT_USER_IMAGE, getErrorResponse } from "@/utils";
import { instance, socketInstance } from "@/utils/instance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { capitalize } from "lodash";
import { useRouter } from "next/router";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SubmitHandler } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { Picture } from "../../ui/picture/picture";

import { StreamingFilters } from "./data";
import styles from "./streaming-section.module.scss";
import { format } from "date-fns";
// import { useSocket } from "@/context/socket";

import { Button } from "@/components/ui/button";
import { Events } from "@/types/events";
import { ResponseWithEvent } from "@/types/network-response";
import { MtnLogo } from "@/components/ui/mtn-logo";
import { UduxIcon } from "@/components/ui/logo";

export type StreamingSectionProps = {
  eid: string;
};

export function StreamingSection({ eid }: StreamingSectionProps) {
  const [event, setEvent] = useState<Events>();

  const { showToast } = useToast();

  const { push } = useRouter();

  const [streamUrl, setStreamUrl] = useState("");

  // const socket = useSocket();
  // const { userLocation, geoCode } = useAuthContext();

  // const { user } = useAuthContext();
  // const userId = user?.id;

  const router = useRouter();
  const { query } = router;
  const passId = query.pass as string;
  const eventUrlId = query.eid as string;

  const { isLoading: isEventLoading } = useQuery(
    ["get-single-event"],
    async (): Promise<Events> => {
      const { data } = await instance.get<ResponseWithEvent>(`/events/${eid}`);
      setEvent(data.data);
      return data.data;
    },
    {
      enabled: !!eid,
    }
  );

  const isFetching = false;

  // const getStreamUrlFromPass = useCallback(() => {
  //   const passes = event?.passes?.filter((p) => p.isEnabled);

  //   if (Array.isArray(passes)) {
  //     if (activeIndex === 0) {
  //       const activePass = passes.find((p) => p.type === "LIVESTREAM");
  //       const playerType = activePass?.streamUrl?.includes("vimeo.com/event")
  //         ? activePass?.streamUrl
  //         : `https://player.vimeo.com/video/${
  //             activePass?.streamUrl?.split("https://vimeo.com/")[1]
  //           }`;
  //       setStreamUrl(playerType ?? "");
  //     }

  //     if (activeIndex === 1) {
  //       const activePass = passes.find((p) => p.type === "BACKSTAGE");
  //       const playerType = activePass?.streamUrl?.includes("vimeo.com/event")
  //         ? activePass?.streamUrl
  //         : `https://player.vimeo.com/video/${
  //             activePass?.streamUrl.split("https://vimeo.com/")[1]
  //           }`;
  //       setStreamUrl(playerType ?? "");
  //     }

  //     if (activeIndex === 2) {
  //       const activePass = passes.find((p) => p.type === "EXCLUSIVE");
  //       const playerType = activePass?.streamUrl?.includes("vimeo.com/event")
  //         ? activePass?.streamUrl
  //         : `https://player.vimeo.com/video/${
  //             activePass?.streamUrl.split("https://vimeo.com/")[1]
  //           }`;
  //       setStreamUrl(playerType ?? "");
  //     }
  //   }

  //   return "";
  // }, [activeIndex, event?.passes]);

  // useEffect(() => {
  //   getStreamUrlFromPass();
  // }, [getStreamUrlFromPass]);

  // if (error) {
  //   const message = getErrorResponse(error);
  //   const __error = error as AxiosError;
  //   const status = __error?.response?.status === 404;

  //   if (status || message?.toLowerCase()?.includes("not found"))
  //     return <NoAccessToStream />;
  // }

  return isFetching ? (
    <section className={styles["streaming"]}>
      <Loader size="xs" styles={{ height: "80svh" }} />
    </section>
  ) : (
    <div className={styles["page-wrapper"]}>
      <section className={styles["streaming"]}>
        {/* <div className={styles["bg"]}>
          <Picture img="images/streaming/bg.png" />
        </div> */}

        <div className={styles["account__description-wrap"]}>
          <div className={styles["account__description"]}>
            <div className={styles["account__description-top"]}>
              <h1>Together, we rise</h1>
              <p>unite for Victory, Nigeria</p>
            </div>

            <div className={styles["account__description-bottom"]}>
              <p>Brought to you by </p>
              <MtnLogo />
            </div>
          </div>
        </div>

        <div className={styles["cols"]}>
          <div className={styles["col"]}>
            <div className={styles["video_block"]}>
              <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                <iframe
                  src={"https://www.youtube.com/watch?v=ETUdvy_8zfU"}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                  }}
                ></iframe>
              </div>
            </div>
            <div className={styles["udux-section"]}>
              <div className={styles["udux-inner"]}>
                <p>For All The Ways Music Moves You</p>
                <UduxIcon />
              </div>
            </div>
            <div className={styles["posters"]}>
              <div className={styles["first-ad"]}>
                <Picture
                  img={event?.bannerUrl || "images/streaming/bg.png"}
                  noSource
                />
              </div>

              <div className={styles["second-ad"]}>
                <Picture
                  img={event?.bannerUrl || "images/streaming/bg.png"}
                  noSource
                />
              </div>
            </div>
          </div>
        </div>

        <ToastContainerWrapper />
      </section>
    </div>
  );
}
