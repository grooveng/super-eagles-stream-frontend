import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

import styles from "./search-input.module.scss";

const inputClassName = cva(styles.input, {
  variants: {
    variant: {
      primary: styles.inputPrimary,
      secondary: styles.inputSecondary,
    },
    otp: {
      true: styles.otpInput,
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type SearchInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  VariantProps<typeof inputClassName> & {
    label?: string;
    onClearClick?: () => void;
  };

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    const { otp, variant, label, onClearClick, ...rest } = props;

    const handleClearClick = () => {
      if (onClearClick) {
        onClearClick();
      }
    };

    return (
      <div className={styles.component}>
        {label && <div className={styles.label}>{label}</div>}
        <input
          ref={ref}
          className={inputClassName({ otp, variant })}
          {...rest}
        />
        {rest.value && (
          <button className={styles.clearButton} onClick={handleClearClick}>
            <AiFillCloseCircle style={{ color: "white" }} />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "Input";
