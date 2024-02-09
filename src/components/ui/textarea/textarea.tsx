import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, Fragment, useState } from "react";
import styles from "./textarea.module.scss";
import classNames from "classnames";

const inputClassName = cva(styles.input, {
  variants: {
    variant: {
      primary: styles.inputPrimary,
      secondary: styles.inputSecondary,
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type TextareaProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  VariantProps<typeof inputClassName> & {
    label?: string;
    error?: boolean;
    errorMsg?: string;
  };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { variant, label, type, error, errorMsg, ...rest } = props;

    const resolvedClassNames = classNames(
      styles.textarea,
      inputClassName({ variant }),
      {
        [styles["error"]]: error,
      }
    );

    return (
      <Fragment>
        <div
          className={classNames(styles["component"], {
            [styles["error"]]: error,
          })}
        >
          {label && <div className={styles.label}>{label}</div>}

          <textarea ref={ref} className={resolvedClassNames} {...rest} />
        </div>

        {error && <p className={styles.errorMessage}>{errorMsg}</p>}
      </Fragment>
    );
  }
);

Textarea.displayName = "Textarea";
