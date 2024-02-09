import { CSSProperties } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export type SkeletonLoaderProps = {
  height?: string | number;
  count?: number;
  width?: string | number;
  baseColor?: string;
  highlightColor?: string;
  styles?: CSSProperties;
};

export function SkeletonLoader({
  height,
  width,
  count = 1,
  baseColor = "#202020",
  highlightColor = "#444",
  styles = {
    padding: "0px",
  },
}: SkeletonLoaderProps) {
  return (
    <SkeletonTheme height={height} width={width} baseColor={baseColor} highlightColor={highlightColor}>
      <div style={styles}>
        <Skeleton width={width} count={count} height={height} />
      </div>
    </SkeletonTheme>
  );
}
