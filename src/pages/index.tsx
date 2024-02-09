import { CustomHead } from "@/components/custom-head/custom-head"
// import { BaseLayout } from "@/components/layout/base-layout";

import { Button } from "@/components/ui/button"
import { ButtonWrapper } from "@/components/ui/button-wrapper"
import { FormField } from "@/components/ui/form-field"
import { FormGrid } from "@/components/ui/form-grid"
import { Input } from "@/components/ui/input"
import { LinkWrapper } from "@/components/ui/link-wrapper"
import {
  ToastContainerWrapper,
  useToast,
} from "@/components/ui/toaster-wrapper"
import { useAuthContext } from "@/context/auth"
// import { CheckMomoUserData, User } from "@/types";
import { getErrorResponse } from "@/utils"
import { instance } from "@/utils/instance"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Metadata } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { NextPageWithLayout } from "./_app"
import { AccountSection } from "@/components/account-section"
import { BaseLayout } from "@/components/layout/base-layout"

export interface LoginMutResponse {
  status: string
  data: Data
  message: string
}

export interface Data {
  tokens: Tokens
  // user: User;
}

export interface Tokens {
  accessToken: string
  refreshToken: string
}

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  emailAddress: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),
})

type FormState = z.infer<typeof formSchema>
export type LoginParams = FormState & {
  isMomoUser?: string
  momoMssidn?: string
}

export const metadata: Metadata = {
  title: "Login to Your Account",
}

export default function Home() {
  const { asPath } = useRouter()
  // const { setAuthState } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    resolver: zodResolver(formSchema),
  })

  const { showToast } = useToast()
  const { mutate, isLoading } = useMutation(async (variables: LoginParams) => {
    const { data } = await instance.post<LoginMutResponse>(
      "/user-auth/login",
      variables
    )
    return data
  })

  // const onSubmit: SubmitHandler<FormState> = ({ emailAddress, password }) => {
  //   const { success: isEmail } = z.string().email().safeParse(emailAddress);

  //   if (isEmail) {
  //     let variables: LoginParams = {
  //       password,
  //       emailAddress: emailAddress.toLowerCase(),
  //     };

  //     if (momoUserObject) {
  //       variables.isMomoUser = String(momoUserObject.isMomoUser);
  //       variables.momoMssidn = momoUserObject.momoMssidn;
  //     }

  //     const parsedQuery = asPath.split("?from=")[1];

  //     mutate(variables, {
  //       onSuccess: ({ data }: LoginMutResponse) => {
  //         const { tokens, user } = data;
  //         setAuthState({ ...tokens, user });

  //         window.location.href = parsedQuery
  //           ? parsedQuery
  //           : momoUserObject
  //           ? "/browse-events"
  //           : "/browse-events";
  //         localStorage.removeItem("momo-number-check");
  //         localStorage.removeItem("momo-user-object");
  //       },
  //       onError: (error) => {
  //         const message = getErrorResponse(error);

  //         showToast(message, {
  //           type: "error",
  //         });
  //       },
  //     });
  //   } else {
  //     showToast("Invalid email address. Please enter a valid email.", {
  //       type: "error",
  //     });
  //   }
  // };

  return (
    <BaseLayout variant="baseOtherPages">
      <Fragment>
        <CustomHead title={"Login to your profile"} />
        <AccountSection
          backLink="/account"
          contentSize="sm"
          subtitleOffset="md"
          title="Stream now"
          subtitle="Access the eagles triumphant return"
          picture={{
            img: "images/login-img.png",
          }}
          bgPicture={{
            img: "images/bg.png",
            mobileVersion: true,
          }}
        >
          <form
          // onSubmit={handleSubmit(onSubmit)}
          >
            <FormGrid offset="intermediate">
              <FormGrid.Container>
                <FormGrid.Tile>
                  <FormField id="password" label="Username">
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      {...register("username")}
                      error={Boolean(errors.username)}
                      errorMsg={
                        // errors?.username?.message
                        "Stop"
                      }
                    />
                  </FormField>
                </FormGrid.Tile>
                <FormGrid.Tile>
                  <FormField id="email" label="Email Address">
                    <Input
                      type="email"
                      placeholder="What’s your email"
                      {...register("emailAddress")}
                      error={Boolean(errors.emailAddress)}
                      errorMsg={
                        // errors?.emailAddress?.message ||
                        "Stop"
                      }
                    />
                  </FormField>
                </FormGrid.Tile>
              </FormGrid.Container>
            </FormGrid>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "4rem",
                textAlign: "left",
                opacity: "0.8",
              }}
              className="sign__upTerms"
            >
              <small>
                By continuing past this page, you agree to the
                <Link
                  style={{
                    color: "#F5C350",
                  }}
                  className="link"
                  href="/terms-and-conditions/"
                >
                  Terms of Use
                </Link>
                and understand that information will be used as described in our
                <Link
                  style={{
                    color: "#F5C350",
                  }}
                  className="link"
                  href="/privacy-policy"
                >
                  Privacy Policy.
                </Link>
              </small>
            </div>

            <ButtonWrapper offset="xl">
              <Button
                type="submit"
                variant={"alternate3"}
                width={"full"}
                isLoading={isLoading}
              >
                Continue
              </Button>
            </ButtonWrapper>
          </form>
          <ToastContainerWrapper />
        </AccountSection>
      </Fragment>
    </BaseLayout>
  )
}
