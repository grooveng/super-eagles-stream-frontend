import { Logo } from "@/components/ui/logo";
import MTNIcon from "@/components/ui/mtn-icon/mtn-icon";
import { getYear } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { footerLinks, footerSocialLinks } from "./footer.data";
import styles from "./footer.module.scss";
import { useMediaQuery } from "usehooks-ts";
import { FooterNavMobile } from "@/components/ui/footer/footer-nav-mobile/footer-nav-mobile";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/auth";

export function Footer() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const year = getYear(new Date());
  // const { isAuthenticated } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <footer className={styles["footer"]}>
      <div className={styles["bottom__row"]}>
        <div className={styles["social__media"]}>
          {footerSocialLinks.map(({ icon, href }, idx) => (
            <Image
              key={idx}
              src={icon}
              width={18}
              height={18}
              alt="social"
              onClick={() => window.open(href, "_blank", "noopener noreferrer")}
            />
          ))}
        </div>

        <ul className={styles["footer__list"]}>
          {footerLinks.map(({ href, text }) => {
            return (
              <li key={text} className={styles["footer__item"]}>
                <Link className={styles["footer__link"]} href={href ?? "#"}>
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
