import Lottie from "lottie-react";
import uduxAnimation from "../../../../public/static/loader.json";
import { CSSProperties } from "react";
import { LivestreamLoaderIcon } from "@/assets";
import loaderStyles from "./loader.module.scss";

export type LoaderProps = {
  styles?: CSSProperties;
  size?: "xl" | "lg" | "md" | "sm" | "xs";
};
export const AppLoader = ({ styles }: LoaderProps) => {
  return <Lottie style={styles} animationData={uduxAnimation} />;
};

export const Loader = ({ styles, size = "md" }: LoaderProps) => {
  return (
    <div className={loaderStyles["loader"]} style={styles}>
      <LivestreamLoaderIcon className={loaderStyles[size]} />
    </div>
  );
};
