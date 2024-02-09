import { SkeletonLoader } from "./skeleton-loader";
import styles from "./stream-pass-wrapper.module.scss";

export const StreamPassLoader = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.hBox}>
          <SkeletonLoader height={50} />
        </div>
        <div className={styles.hBox}>
          <SkeletonLoader height={50} />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.box}>
          <SkeletonLoader height={200} />
        </div>
        <div className={styles.box}>
          <SkeletonLoader height={200} />
        </div>
        <div className={styles.box}>
          <SkeletonLoader height={200} />
        </div>
        <div className={styles.box}>
          <SkeletonLoader height={200} />
        </div>
      </div>
    </div>
  );
};
