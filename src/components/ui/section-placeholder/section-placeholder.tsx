import { ReactNode } from "react";

export type SectionPlaceholderProps = {
  children: ReactNode;
};

export function SectionPlaceholder({ children }: SectionPlaceholderProps) {
  return <div className="section_placeholder">{children}</div>;
}
