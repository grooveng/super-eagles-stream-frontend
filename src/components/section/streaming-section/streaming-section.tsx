import { Loader } from "@/components/ui/loaders";

import {
  ToastContainerWrapper,
  useToast,
} from "@/components/ui/toaster-wrapper";
import { useAuthContext } from "@/context/auth";

import { DEFAULT_USER_IMAGE, getErrorResponse } from "@/utils";
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

// import { ResponseWithEvent } from "@/types/network-response";
import { MtnLogo } from "@/components/ui/mtn-logo";
import { UduxIcon } from "@/components/ui/logo";

export function StreamingSection() {
  const { showToast } = useToast();

  const { push } = useRouter();

  const router = useRouter();
  const { query } = router;
  const passId = query.pass as string;
  const eventUrlId = query.eid as string;

  return (
    <div className={styles["page-wrapper"]}>
      <section className={styles["streaming"]}>
        <div className={styles["bg"]}>
          <Picture img="images/super-eagles.png" noSource />
        </div>

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
                  src="https://vimeo.com/event/4080120/embed/interaction"
                  frameBorder={"0"}
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
            {/* <div className={styles["udux-section"]}>
              <div className={styles["udux-inner"]}>
                <p>For All The Ways Music Moves You</p>
                <UduxIcon />
              </div>
            </div> */}
            {/* <div className={styles["posters"]}>
              <div className={styles["first-ad"]}>
                <Picture
                  img={
                    // event?.bannerUrl ||
                    "images/streaming/bg.png"
                  }
                  noSource
                />
              </div>

              <div className={styles["second-ad"]}>
                <Picture
                  img={
                    // event?.bannerUrl ||
                    "images/streaming/bg.png"
                  }
                  noSource
                />
              </div>
            </div> */}
          </div>
        </div>

        <ToastContainerWrapper />
      </section>
    </div>
  );
}
