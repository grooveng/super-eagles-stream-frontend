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
  code: string;
}
const verifyOtp = async (payload: VerifyOtp) => {
  const { data } = await instance.post("/verify", payload);
  return data;
};

export default function Otp() {
  const { handleSubmit } = useForm({ mode: "all" });
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { setAuthState } = useAuthContext();
  const { showToast } = useToast();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const [otp, setOtp] = useState("");

  const submitForm = async () => {
    if (otp.length < 5) {
      return showToast("Please Ensure That All Fields Are Entered", {
        type: "error",
      });
    }

    const payload = {
      code: otp.toUpperCase(),
    };
    const parsedQuery = router.asPath.split("?from=")[1];

    setSubmitting(true);

    try {
      const { data } = await verifyOtp(payload);

      router.push(parsedQuery ? parsedQuery : "/streaming");
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
          {/* <LinkWrapper>
            <Link href={"#"} onClick={() => handleResendOtp(email)}>
              Didn’t get Token? Send again
            </Link>
          </LinkWrapper> */}
        </AccountSection>
      </>
    </BaseLayout>
  );
}
