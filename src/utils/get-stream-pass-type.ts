import { StreamPassType } from "@/types";

export const getStreamPassType = (
  type: StreamPassType,
  lean?: boolean
): string => {
  if (lean) {
    if (type === "LIVESTREAM") {
      return "Livestream";
    }
    if (type === "BACKSTAGE") {
      return "Backstage";
    }
    if (type === "EXCLUSIVE" || type === "ON_DEMAND") {
      return "Exclusive";
    }
  } else {
    if (type === "LIVESTREAM") {
      return "Livestream";
    }
    if (type === "BACKSTAGE") {
      return "Livestream + Backstage";
    }
    if (type === "EXCLUSIVE" || type === "ON_DEMAND") {
      return "Livestream + Backstage + Rehearsals";
    }
  }

  return "";
};
