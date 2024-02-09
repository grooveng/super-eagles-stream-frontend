import classNames from "classnames";
import DOMPurify from "isomorphic-dompurify";

import styles from "./typography.module.scss";

export type TypographyProps = {
  desktop?: string;
  mobile?: string;
  overrideMobile?: boolean;
  overrideTablet?: boolean;
  disableEscaping?: boolean;
};

export function Typography({
  desktop,
  mobile,
  disableEscaping,
  overrideMobile,
}: TypographyProps) {
  if (!mobile && !desktop) return null;

  return (
    <span
      className={classNames(styles["typography"], {
        [styles["typography--override_mobile_mod"]]: overrideMobile,
      })}
    >
      {desktop && (
        <span
          className={classNames(styles["typography__node"], {
            [styles["typography__node--mobile_hidden_mod"]]: mobile,
          })}
          dangerouslySetInnerHTML={
            disableEscaping
              ? {
                  __html: DOMPurify.sanitize(desktop),
                }
              : undefined
          }
        >
          {!disableEscaping ? desktop : null}
        </span>
      )}

      {mobile && (
        <span
          className={classNames(styles["typography__node"], {
            [styles["typography__node--desktop_hidden_mod"]]: desktop,
          })}
          dangerouslySetInnerHTML={
            disableEscaping
              ? {
                  __html: DOMPurify.sanitize(mobile),
                }
              : undefined
          }
        >
          {!disableEscaping ? mobile : null}
        </span>
      )}
    </span>
  );
}
