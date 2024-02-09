import { AccountSection } from "@/components/account-section";
import { CustomHead } from "@/components/custom-head/custom-head";
import { BaseLayout } from "@/components/layout/base-layout";
import { Button } from "@/components/ui/button";
import { ButtonWrapper } from "@/components/ui/button-wrapper";
import { LinkWrapper } from "@/components/ui/link-wrapper";
import { OtpInput } from "@/components/ui/otp-field/otp-input";
import { useToast } from "@/components/ui/toaster-wrapper";
import { useAuthContext } from "@/context/auth";
import { getErrorResponse } from "@/utils";
import { instance } from "@/utils/instance";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface VerifyOtp {
  confirmEmailToken: string;
  emailAddress: string;
  sourceService: string;
}
const verifyOtp = async (payload: VerifyOtp) => {
  const { data } = await instance.post(
    `/user-auth/confirm-email-verification-otp/${encodeURIComponent(
      payload.emailAddress
    )}/${payload.confirmEmailToken}`
  );
  return data;
};

export default function Otp() {
  const { handleSubmit } = useForm({ mode: "all" });
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { setAuthState } = useAuthContext();
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const email =
    (searchParams.get("email") as string) ||
    (searchParams.get("emailAddress") as string);
  const token = searchParams.get("token");
  const [otp, setOtp] = useState("");

  const handleResendOtp = async (payload: string) => {
    try {
      const { data } = await instance.post(
        `/user-auth/resend-email-verification-mail/${payload}`
      );

      router.push({
        pathname: "/otp",
        query: {
          email,
        },
      });
      showToast("Check your Phone or your Email for the OTP", {
        type: "success",
      });
      return data;
    } catch (err) {}
  };

  const submitForm = async () => {
    if (otp.length < 5) {
      return showToast("Please Ensure That All Fields Are Entered", {
        type: "error",
      });
    }
    const localEmail = localStorage.getItem("signup-email") || "";
    const payload = {
      confirmEmailToken: otp,
      emailAddress: email || localEmail,
      sourceService: "livestream",
    };
    const parsedQuery = router.asPath.split("?from=")[1];

    setSubmitting(true);

    try {
      const { data } = await verifyOtp(payload);
      localStorage.removeItem("signup-email");
      const { tokens, user } = data;

      setAuthState({ ...tokens, user });
      router.push(parsedQuery ? parsedQuery : "/browse-events");
      setSubmitting(false);
    } catch (err: any) {
      if (err.response) {
        setSubmitting(false);
        return showToast(getErrorResponse(err), { type: "error" });
      } else {
        setSubmitting(false);
        return showToast(
          "There was an issue with your network. Pls try again later",
          { type: "error" }
        );
      }
    }
  };

  useEffect(() => {
    token ? setOtp(token) : setOtp("");
  }, [token]);

  return (
    <BaseLayout variant="baseOtherPages">
      <>
        <CustomHead title={"Enter your OTP"} />
        <AccountSection
          backLink="/login"
          contentSize="sm"
          title={"Enter your OTP"}
          subtitle={"We sent this to both your Email and Phone Number"}
          picture={{
            img: "/images/login-img.png",
          }}
          bgPicture={{
            img: "images/bg.png",
            mobileVersion: true,
          }}
        >
          <form onSubmit={handleSubmit(submitForm)}>
            <OtpInput otp={otp} setOtp={setOtp} />

            <ButtonWrapper offset="lg">
              <Button
                type={"submit"}
                isLoading={isSubmitting}
                variant={"alternate3"}
                width={"full"}
              >
                Confirm OTP
              </Button>
            </ButtonWrapper>
          </form>
          <LinkWrapper>
            <Link href={"#"} onClick={() => handleResendOtp(email)}>
              Didn’t get Token? Send again
            </Link>
          </LinkWrapper>
        </AccountSection>
      </>
    </BaseLayout>
  );
}
