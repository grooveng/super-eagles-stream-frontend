import { Portal } from "@/components/portal/portal";
import { useAuthContext } from "@/context/auth";
import classNames from "classnames";
import { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { BiChevronDown, BiUserPin } from "react-icons/bi";
import { CiPassport1 } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { useMediaQuery } from "usehooks-ts";
import { Picture } from "../picture";
import styles from "./profile-dropdown.module.scss";
import defaultImage from "/public/images/default_user_banner_1.png";
import { truncate } from "lodash";
import { generateDefaultUsername } from "@/utils";
import { Popper } from "@mui/material";

export const ProfileDropdown = () => {
  const {
    user,
    isAuthenticated,
    clearAuthState,
    clearPlaceOrderItem,
    ...rest
  } = useAuthContext();
  const defaultImageUrl = (defaultImage as StaticImageData).src;
  const [openMenu, setOpenMenu] = useState(false);
  const targetElementRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const { push } = useRouter();

  const username = user?.username ? user.username : user?.email;

  const onLogout = () => {
    clearAuthState();
    clearPlaceOrderItem();
  };

  return (
    <div className={styles["pd-wrap"]}>
      <div
        className={styles["profile-dropdown"]}
        onClick={() => setOpenMenu(!openMenu)}
        ref={targetElementRef}
      >
        <div className={styles["avatar-wrap"]}>
          <Picture
            imgId="profile__image"
            img={user?.image || defaultImageUrl}
            noSource
          />
        </div>
        {/* <div className={styles["username-wrap"]}>
          <span>
            Hey, {truncate(generateDefaultUsername(username), { length: 15 })}
          </span>
        </div>
        <div className={styles["icon-wrap"]}>
          <BiChevronDown />
        </div> */}
      </div>

      {openMenu && !isMobile && (
        <Popper
          open={openMenu}
          id="profile-menu-popper"
          placement={"bottom-start"}
          className={styles["popper"]}
          anchorEl={targetElementRef.current}
        >
          <div
            className={`${styles["menu-wrap"]} ${styles["portal-container"]}
            `}
          >
            <ul className={styles["menu"]}>
              <li
                className={styles["menu-item"]}
                onClick={() => {
                  push("/profile#account");
                  setOpenMenu(false);
                }}
              >
                <span>
                  <BiUserPin />
                </span>
                My Profile
              </li>
              <li
                className={styles["menu-item"]}
                onClick={() => {
                  push("/profile#my-stream-passes");
                  setOpenMenu(false);
                }}
              >
                <span>
                  <CiPassport1 />
                </span>
                My Stream Passes
              </li>
              <li className={styles["menu-item"]} onClick={onLogout}>
                <span>
                  <IoLogOutOutline />
                </span>
                Logout
              </li>
            </ul>
          </div>
        </Popper>
      )}
    </div>
  );
};
