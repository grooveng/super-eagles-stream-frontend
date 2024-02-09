import { CustomSelectNew } from "../custom-select-new";
import { SelectProps } from "../custom-select";
import { InputLabel } from "../input-label";
import { CustomSelect } from "../custom-select";

export type SelectFieldProps = SelectProps & {
  label?: string;
  id: string;
  hideDropIndicator?: boolean | undefined; // Add hideDropIndicator prop to SelectFieldProps
};

export function SelectField({
  id,
  label,
  hideDropIndicator,
  ...rest
}: SelectFieldProps) {
  return (
    <div>
      <InputLabel id={id}>{label}</InputLabel>
      {/* <CustomSelectNew id={id} {...rest} />{" "} */}
      <CustomSelect id={id} {...rest} />
    </div>
  );
}
