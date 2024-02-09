import React, { ReactNode } from "react";

import styles from "./arrow-down.module.scss";

export function ArrowDown() {
  return (
    <div className={styles["arrow_down"]}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 21.781 60.672"
        className="icon"
      >
        <path
          id="up-arrow"
          d="M196.645,42.811l-9.316-11.244a1.583,1.583,0,0,0-2.427,0l-9.316,11.244A1.57,1.57,0,0,0,178,44.82l6.539-7.887V90.094a1.577,1.577,0,1,0,3.155,0V36.932l6.539,7.887a1.568,1.568,0,0,0,2.211.2A1.577,1.577,0,0,0,196.645,42.811Z"
          transform="translate(197.006 91.672) rotate(180)"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
