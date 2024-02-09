export type GetRightsIconProps = {
  rights?: string;
  withIcon?: boolean;
};

export const getRightsIcon = (options: GetRightsIconProps) => {
  const { rights, withIcon } = options;

  if (withIcon) {
    if (rights === "global") {
      return "/images/stream-pass/earth.svg";
    }
    if (rights === "africa") {
      return "/images/stream-pass/africa.svg";
    }
    if (rights === "nigeria") {
      return "/images/stream-pass/nigeria.svg";
    }
  } else {
    if (rights === "global") {
      return "Global Access";
    }
    if (rights === "africa") {
      return "Africa Only";
    }
    if (rights === "nigeria") {
      return "Nigeria Only";
    }
  }

  return "";
};
