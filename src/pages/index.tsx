import { CustomHead } from "@/components/custom-head/custom-head"
// import { BaseLayout } from "@/components/layout/base-layout";

import { Button } from "@/components/ui/button"
import { ButtonWrapper } from "@/components/ui/button-wrapper"
import { FormField } from "@/components/ui/form-field"
import { FormGrid } from "@/components/ui/form-grid"
import { Input } from "@/components/ui/input"
import { LinkWrapper } from "@/components/ui/link-wrapper"
import { useToast } from "@/components/ui/toaster-wrapper"
import { useAuthContext } from "@/context/auth"

import {
  CountryInputProps,
  getCountries,
  getErrorResponse,
  onlyNumberKey,
} from "@/utils"
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
import { SelectField } from "@/components/ui/select-field"
import { isPossiblePhoneNumber } from "libphonenumber-js"
import { User } from "@/types/user"
import { devDomains } from "@/utils/dev-domains"
import { isTemporaryEmail } from "@/utils/email-validator"
import { parsePhoneNumber } from "@/utils/parse-phone-number"

export interface LoginMutResponse {
  status?: string
  data: Data
  message: string
}

export interface Data {
  tokens: Tokens
  user: User
}

export interface Tokens {
  accessToken: string
}

export const metadata: Metadata = {
  title: "Login to Your Account",
}

export default function Home() {
  const [countryCode, setCountryCode] = useState<CountryInputProps>()
  const [phoneNumber, setPhoneNumber] = useState("")
  const { push, asPath } = useRouter()
  const { setAuthState } = useAuthContext()
  type FormState = z.infer<typeof formSchema>

  const formSchema = z.object({
    phoneNumber: z.string().refine(
      () => {
        const isAValidPhoneNumber = isPossiblePhoneNumber(
          phoneNumber ?? "",
          countryCode?.countryName ?? "NG"
        )

        return isAValidPhoneNumber
      },
      {
        message: "Invalid Phone Number",
      }
    ),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormState>({
    resolver: zodResolver(formSchema),
  })

  const { showToast } = useToast()
  const { mutate, isLoading } = useMutation(async (variables: FormState) => {
    const { data } = await instance.post<LoginMutResponse>("/record", variables)
    return data
  })

  const isInDevDomain = devDomains.includes(window.location.host)

  const onSubmit: SubmitHandler<FormState> = ({ email, phoneNumber }) => {
    const parsedQuery = asPath.split("?from=")[1]

    const isTempEmail = !isInDevDomain && isTemporaryEmail(email)?.isTemporary
    const emailHasPlusCharacter =
      !isInDevDomain && isTemporaryEmail(email)?.hasPlusCharacter
    const emailHasMoreThanTwoDots = isTemporaryEmail(email)?.hasMoreThanTwoDots
    const emailHasFakeDomain = isTemporaryEmail(email)?.fakeMails

    if (isTempEmail || emailHasFakeDomain)
      return showToast(
        "Unfortunately you can’t open a livestream account using a temp email provider.",
        { type: "error" }
      )
    if (emailHasPlusCharacter)
      return showToast("Oops! No forwarding email addresses allowed", {
        type: "error",
      })
    if (emailHasMoreThanTwoDots)
      return showToast(
        "Something doesn’t look right with this email. Please register with another account",
        { type: "error" }
      )

    let variables: FormState = {
      email,
      phoneNumber: parsePhoneNumber(countryCode, phoneNumber),
    }

    mutate(variables, {
      onSuccess: ({ data }: LoginMutResponse) => {
        const { tokens, user } = data

        setAuthState({ ...tokens, user })

        push(`/otp?email=${user.email}`)
      },
      onError: err => {
        const message = getErrorResponse(err)
        showToast(message, { type: "error" })
      },
    })
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGrid offset="intermediate">
              <FormGrid.Container>
                <FormGrid.Tile size="thirty">
                  <SelectField
                    options={getCountries()}
                    id="country_code"
                    label="Country Code"
                    placeholder="Search"
                    size="md"
                    handleChange={(value: CountryInputProps) =>
                      setCountryCode(value)
                    }
                    isSearchable
                  />
                </FormGrid.Tile>
                <FormGrid.Tile size="seventy">
                  <FormField id="phone" label="Phone Number ">
                    <Input
                      {...register("phoneNumber", {
                        onChange: e => {
                          setPhoneNumber(e.target.value)
                        },
                      })}
                      placeholder="Enter phone number"
                      onKeyDown={onlyNumberKey}
                      maxLength={11}
                      error={Boolean(errors.phoneNumber)}
                      onBlur={() => {
                        trigger("phoneNumber")
                      }}
                      errorMsg={errors?.phoneNumber?.message}
                    />
                  </FormField>
                </FormGrid.Tile>
                <FormGrid.Tile>
                  <FormField id="email" label="Email Address">
                    <Input
                      type="email"
                      placeholder="What’s your email"
                      {...register("email")}
                      error={Boolean(errors.email)}
                      errorMsg={errors?.email?.message}
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
        </AccountSection>
      </Fragment>
    </BaseLayout>
  )
}
