import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { useRef } from "react";
import { UseFormRegisterReturn, RegisterOptions } from "react-hook-form";
import { CheckIcon } from "../check-icon";
import styles from "./checkbox.module.scss";

export type CheckboxProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  id: string;
  name: string;
  label: string;
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
};

export function Checkbox({
  id,
  label,
  register,
  name,
  required,
  ...props
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register(name, {
    required: required ? `${name} field is required` : false,
  });

  return (
    <div className={styles["checkbox"]}>
      <label htmlFor={id} className={styles["checkbox__label"]}>
        <input
          id={id}
          className={styles["checkbox__input"]}
          type="checkbox"
          {...rest}
          {...props}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
        />
        <div className={styles["checkbox__check_mark"]}>
          <div className={styles["checkbox__icon"]}>
            <CheckIcon />
          </div>
        </div>
        <div className={styles["checkbox__text"]}>{label}</div>
      </label>
    </div>
  );
}
