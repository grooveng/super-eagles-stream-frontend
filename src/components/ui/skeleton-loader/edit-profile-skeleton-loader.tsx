import { SkeletonLoader } from "./skeleton-loader";
import styles from "./edit-profile-wrapper.module.scss";

export const EditProfileLoader = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.hBox}>
          <div>
          <SkeletonLoader height={50} />
          </div>
        </div>
        <div className={styles.hBox}>
          <div>
          <SkeletonLoader height={50} />
          </div>
        </div>
      </div>

      <div className={styles.left}>
        <div>
        <SkeletonLoader height={450} />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.box}>
          <div>
          <SkeletonLoader height={200} />
          </div>
        </div>
        <div className={styles.box}>
          <div>
          <SkeletonLoader height={200} />
          </div>
        </div>
      </div>
    </div>
  );
};
