import * as React from "react";
import { InputLabel } from "../input-label";

export type FormFieldProps = {
  id: string;
  label: string;
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
};

export function FormField({ id, label, children, variant="default" }: FormFieldProps) {
  return (
    <div>
      <InputLabel variant={variant}  id={id}>{label}</InputLabel>
      {children}
    </div>
  );
}
