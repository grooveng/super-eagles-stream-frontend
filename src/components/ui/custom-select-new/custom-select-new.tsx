import { ComponentPropsWithoutRef, useEffect } from "react";
import { cva, VariantProps } from "class-variance-authority";
import Select, {
  ActionMeta,
  OnChangeValue,
  Props,
  components,
} from "react-select";
import Image from "next/image";
import styles from "./custom-select-new.module.scss";
import { InputDropdown } from "@/assets";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const selectStyles = cva("select", {
  variants: {
    size: {
      md: "select--md_size",
    },
    isDisabled: {
      true: "select--disabled_mod",
    },
    height: {
      low: "select--low_mod",
    },
  },
});

export type CountryOptionProps = {
  value: string;
  label: string;
  image: string;
};

export type SelectProps = Props &
  VariantProps<typeof selectStyles> & {
    id: string;
    isDisabled?: boolean;
    handleChange?: any;
  };

export function CustomSelectNew({
  id,
  required,
  size,
  handleChange,
  isDisabled = false,
  height,
  ...props
}: SelectProps) {
  return (
    <div className={selectStyles({ size, isDisabled, height })}>
      <div className={styles["full__width__height"]}>
        <div className={styles["svg__wrapper"]}>
          <IoIosArrowDropdownCircle color="#D07649" />
        </div>
        <select
          className={`select__in ${styles["full__width__height"]} ${styles["select__custom__style"]}`}
          id={id}
          onChange={handleChange}
        >
          {props.options?.map((option: any, idx: number) => (
            <option key={idx} value={"nigeria"}>
              {option?.image && (
                <div className="select__country-image">
                  <Image src={option?.image} alt="country-image" fill />
                </div>
              )}
              {option?.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
