import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import styles from "./input.module.scss";
import classNames from "classnames";

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

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  VariantProps<typeof inputClassName> & {
    label?: string;
    error?: boolean;
    errorMsg?: string;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { otp, variant, label, type, error, errorMsg, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [focusMode, setFocusMode] = useState(false)
  const resolvedClassNames = classNames(
    styles.input,
    inputClassName({ otp, variant }),
    {
      [styles.error]: error, // Apply the 'error' class when 'error' prop is true
    }
  );
  const handleFocus = () => {
    setFocusMode(prev=>true);
  };

  const handlePasswordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;
  return (
    <div>
      <div
        className={classNames(styles["component"], {
          [styles["password"]]: inputType === "password",
          [styles["error"]]: error,
          [styles["focus"]]: focusMode,
          [styles["blur"]]: !focusMode,
        })}
      >
        {label && <div className={styles.label}>{label}</div>}
        <input
          ref={ref}
          onFocus={() => handleFocus()}
          onBlurCapture={()=>{setFocusMode(false)}}
          className={
            (error || focusMode) ? `${resolvedClassNames} ${styles.error} ${focusMode ? styles.focus : undefined }` : `${resolvedClassNames} ${styles.blur}`
          }
          type={inputType}
          {...rest}
        />
        {type === "password" && (
          <div className={styles.eyeIcon} onClick={handlePasswordToggle}>
            {showPassword ? (
              <RiEyeOffLine
                className={classNames(styles.eye, { [styles.errorEye]: error })}
              />
            ) : (
                <RiEyeLine
                className={classNames(styles.eye, { [styles.errorEye]: error })}
              />
            )}
          </div>
        )}
        {error && (
          <img
            className={styles.x_icon}
            src="/images/icons/x_icon_error.svg"
            alt="close"
          />
        )}
      </div>
      {error && <p className={styles.errorMessage}>{errorMsg}</p>}
    </div>
  );
});

Input.displayName = "Input";
