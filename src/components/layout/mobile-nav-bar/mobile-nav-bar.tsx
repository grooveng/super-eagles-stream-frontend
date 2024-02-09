import { HomeIcon } from "@/components/ui/home-icon";
import { Picture } from "@/components/ui/picture";
import { QuestionIcon } from "@/components/ui/question-icon";
import { RadioIcon } from "@/components/ui/radio-icon";
import { TicketIcon } from "@/components/ui/ticket-icon";
import { useAuthContext } from "@/context/auth";
import classNames from "classnames";
import { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import defaultImage from "./../../../../public/images/default_user_banner_1.png";
import styles from "./mobile-nav-bar.module.scss";
import { NavItem } from "./ui/nav-item";
import { Description } from "@/components/ui/description";
import { truncate } from "lodash";
import _ from "lodash";

type MobileNavBarProps = {
  pathname?: string;
  avatarUrl?: string;
};

export function MobileNavBar({ pathname, avatarUrl }: MobileNavBarProps) {
  // const { user } = useAuthContext();
  const { asPath, push } = useRouter();
  const hashString = asPath.split("#")[1];
  // const defaultImageUrl = (defaultImage as StaticImageData).src;

  return (
    <nav className={styles["nav_bar"]}>
      <ul className={styles["nav_bar__list"]}>
        <NavItem currentPath={pathname} path="/" menuTitle="Home">
          <HomeIcon onClick={() => push("/")} />
        </NavItem>
        <NavItem
          currentPath={pathname}
          path="/browse-events"
          menuTitle="Events"
        >
          <RadioIcon onClick={() => push("/browse-events")} />
        </NavItem>
        <NavItem
          currentPath={pathname}
          path="/profile#my-stream-passes"
          hashString="my-stream-passes"
          menuTitle="My Account"
        >
          <TicketIcon onClick={() => push("/profile#my-stream-passes")} />
        </NavItem>
        <NavItem currentPath={pathname} path="/faq" menuTitle="Faqs">
          <QuestionIcon onClick={() => push("/faq")} />
        </NavItem>
        <li
          className={classNames(
            styles["nav_bar__item"],
            styles["nav_bar__item--profile_mod"]
          )}
        >
          {/* <Link href="/profile">
            <div
              className={`${styles["nav_bar__image"]} ${
                hashString === "account" && styles["nav__bar__border"]
              }`}
            >
              <Picture
                imgId="profile__image"
                img={user?.image}
                noSource
              />
            </div>
          </Link> */}
          {/* <Description size="xs">
            <span className={styles["username"]}>
              {_.capitalize(_.truncate(user?.username, { length: 9 }))}
            </span>
          </Description> */}
        </li>
      </ul>
    </nav>
  );
}
