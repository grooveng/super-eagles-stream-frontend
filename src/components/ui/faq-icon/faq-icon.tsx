import React from "react";
import {
  LivestreamIcon,
  StreamPassesIcon,
  MyAccountIcon,
  GeneralIcon,
} from "@/assets";

interface CardID {
  sectionID: string;
}

export function FaqIcon({ sectionID }: CardID) {
  return sectionID === "4c" ? (
    <LivestreamIcon width={"60"} height={"60"} color={"#fff4e9"} />
  ) : sectionID === "2c" ? (
    <StreamPassesIcon width={"60"} height={"60"} color={"#fff4e9"} />
  ) : sectionID === "3c" ? (
    <MyAccountIcon width={"60"} height={"60"} color={"#fff4e9"} />
  ) : (
    <GeneralIcon width={"60"} height={"60"} color={"#fff4e9"} />
  );
}
