export type PrepareSrcProps = {
  src: string;
  suffix?: string;
  type?: string;
};

export const prepareSrc = ({ src, suffix = "", type }: PrepareSrcProps) => {
  const prepareMobileUrl: string[] | undefined = src?.split(".");

  if (prepareMobileUrl && prepareMobileUrl.length > 1) {
    let newUrl;
    const srcType = prepareMobileUrl.pop();
    const newType = type || srcType || "";
    return prepareMobileUrl
      .join(".")
      .concat(suffix)
      .concat(".")
      .concat(newType);
  }

  return src;
};
