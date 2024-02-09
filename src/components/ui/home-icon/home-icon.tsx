import { SVGBaseProps } from "@/types";

export function HomeIcon({ onClick }: SVGBaseProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 506 512"
      onClick={onClick}
    >
      <path
        fill="currentColor"
        d="M505.815 252.894l-57.532-57.532V78.192H331.086L252.841 0-.001 252.894l57.532 57.664v201.574h390.75V310.559zM252.842 42.505l105.274 105.274v-39.477h60.111v99.615l45.163 44.978-21.239 21.239L252.842 85.009 63.743 274.16l-21.239-21.239zm-45.084 439.518V361.721h90.167v120.223zm120.223 0v-150.41H177.755v150.279H87.588V292.82l165.254-165.306L418.149 292.82v189.125h-90.115z"
      />
    </svg>
  );
}
