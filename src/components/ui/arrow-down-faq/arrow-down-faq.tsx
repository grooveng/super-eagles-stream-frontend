import React from "react";

type ArrowIconProps = {
    active?: boolean;
  };

export function ArrowDownFaq({ active }: ArrowIconProps) {
  return (
    <svg
      id="Layer_1"
      enable-background="new 0 0 128 128"
      height="512"
      viewBox="0 0 128 128"
      width="512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Down_Arrow_3_"
              d="m64 88c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z"
              fill={active ? "#F5C350" : "#FFF4E9"}
      />
    </svg>
  );
}


