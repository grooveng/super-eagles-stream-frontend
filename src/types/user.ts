export type UserStatus = "ACTIVE" | "BLOCKED"

export type UserCreatedData = {
  id: number
  email: string
  countryCode: string
  phoneNumber: string
  birthday: Date | string
  gender: "MALE" | "FEMALE"
}

export interface User extends UserCreatedData {
  country?: string
  countryShortName?: string
  emailVerified: boolean
}
