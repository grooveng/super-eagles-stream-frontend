import { ReactNode } from "react";
import styles from "./input-label.module.scss";

export type InputLabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & {
  id: string;
  children: ReactNode;
  className?: string; 
  variant?: "default" | "primary" | "secondary"; 
};

export function InputLabel({ children, id, className = "", variant = "default", ...props }: InputLabelProps) {
  const variantClassNames = {
    default: "", 
    primary: styles.primary, 
    secondary: styles.secondary, 
  };

  const variantClassName = variantClassNames[variant];

  return (
    <label className={`${styles.label} ${variantClassName} ${className}`} htmlFor={id} {...props}>
      {children}
    </label>
  );
}

export default InputLabel;
