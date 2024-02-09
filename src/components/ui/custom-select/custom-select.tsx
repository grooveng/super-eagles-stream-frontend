import { ComponentPropsWithoutRef, useEffect } from "react";
import { cva, VariantProps } from "class-variance-authority";
import Select, {
  ActionMeta,
  OnChangeValue,
  Props,
  components,
} from "react-select";
import Image from "next/image";
import styles from "./custom-select.module.scss";
import { InputDropdown } from "@/assets";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import classNames from "classnames";

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
  name: string;
  countryName?: string;
};

export type SelectProps = Props &
  VariantProps<typeof selectStyles> & {
    id: string;
    isDisabled?: boolean;
    handleChange?: any;
    newInput?: boolean;
    error?: boolean;
    errorMsg?: string;
  };

const DropdownIndicator = (
  props: ComponentPropsWithoutRef<typeof components.DropdownIndicator>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 1.263a.737.737 0 011.197.238.738.738 0 01-.162.801L5.445 5.88a.734.734 0 01-1.011-.023L.794 2.224a.735.735 0 011.039-1.037l3.086 3.117L8 1.264z"
          fill="currentColor"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

export function CustomSelect({
  id,
  required,
  size,
  isDisabled = false,
  height,
  handleChange,
  newInput = false,
  error,
  errorMsg,
  ...props
}: SelectProps) {
  const containerClassName = classNames(
    selectStyles({ size, isDisabled, height }),
    styles["custom-container-class"]
  );

  return (
    <div className={containerClassName}>
      {newInput ? (
        <div className={styles["full__width__height"]}>
          <div className={styles["svg__wrapper"]}>
            <IoIosArrowDropdownCircle color="#D07649" />
          </div>
          <select
            className={`select__in ${styles["full__width__height"]} ${styles["select__custom__style"]}`}
            id={id}
          >
            {props.options?.map((option: any, idx: number) => (
              <option key={idx} value={"nigeria"}>
                {option?.image && (
                  <div className="select__country-image">
                    <Image src={option?.image} alt="country-image" fill />
                  </div>
                )}
                <span>{option?.label}</span>
              </option>
            ))}
          </select>
        </div>
      ) : (
        <Select
          classNamePrefix="select"
          className={error ? "select__in select__error" : "select__in"}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          unstyled={true}
          id={id}
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 10000000000 }) }}
          isDisabled={isDisabled}
          instanceId={id}
          onChange={handleChange}
          formatOptionLabel={(data: CountryOptionProps | unknown) => {
            const { image, label, name } = data as CountryOptionProps;
            return (
              <div className="select__country-option">
                {image && (
                  <div className="select__country-image">
                    <Image src={image} alt="country-image" fill   />
                  </div>
                )}
                <span>{label}</span>
              </div>
            );
          }}
          filterOption={(option, inputValue) => {
            const { data, label } = option;
            const { name } = data as CountryOptionProps;
            const labelMatches = label
              .toLowerCase()
              .includes(inputValue.toLowerCase());
            const nameMatches = name
              ?.toLowerCase()
              .includes(inputValue.toLowerCase());
            return labelMatches || nameMatches;
          }}
          {...props}
        />
      )}

      {error && <small className={styles.errorMessage}>{errorMsg}</small>}
    </div>
  );
}
