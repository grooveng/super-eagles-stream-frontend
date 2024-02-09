import { CustomSelect, SelectProps } from "../custom-select/custom-select";
import { InputLabel } from "../input-label";

export type SelectFieldProps = SelectProps & {
  label?: string;
  id: string;
  variant?: "default" | "primary" | "secondary";
  hideDropIndicator?: boolean | undefined; // Add hideDropIndicator prop to SelectFieldProps
};

export function SelectField({
  id,
  label,
  hideDropIndicator,
  variant = "default",
  ...rest
}: SelectFieldProps) {
  return (
    <div>
      <InputLabel variant={variant} id={id}>
        {label}
      </InputLabel>
      <CustomSelect id={id} {...rest} />{" "}
    </div>
  );
}
