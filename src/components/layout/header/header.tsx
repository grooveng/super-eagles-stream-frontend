import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useAuthContext } from "@/context/auth";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import styles from "./header.module.scss";
import { Column, Navigation } from "./ui";
import { useRouter } from "next/router";
import { useMediaQuery } from "usehooks-ts";
import { ProfileDropdown } from "@/components/ui/profile-dropdown/profile-dropdown";
import _ from "lodash";

type HeaderProps = {
  hasMobileCta?: boolean;
};

export function Header({ hasMobileCta = false }: HeaderProps) {
  // const {
  //   user,
  //   userLocation,
  //   isAuthenticated,
  //   clearAuthState,
  //   clearPlaceOrderItem,
  //   isUnavailableInRegion,
  //   ...rest
  // } = useAuthContext();
  const [scrolling, setScrolling] = useState(false);

  const [btnContent, setBtnContent] = useState("Sign Up / Login");
  const [myAccount, setMyAccount] = useState("/profile#account");
  const { query, push, pathname } = useRouter();
  const { eid, tag } = query;
  const isMobile = useMediaQuery("(max-width: 1025px)");

  // const onLogout = () => {
  //   clearAuthState();
  //   clearPlaceOrderItem();
  // };

  const onLogin = () => {
    push("/account");
  };

  const shouldRenderBuyStreamPassButton = pathname.includes("/events/[slug]");
  const shouldRenderNavigationColumn =
    pathname !== "/404" && pathname !== "/no-access-to-stream";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fragment>
      <header className={styles["header"]}>
        <div className={styles["header__row"]}>
          <Column>
            <Link href="/" className={styles["header__logo"]}>
              <Logo />
            </Link>
          </Column>
        </div>
      </header>
    </Fragment>
  );
}
