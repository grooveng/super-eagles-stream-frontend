import { User } from "./user"

export interface LoginMutResponse {
  status: string
  data: Data
  message: string
}

export interface Data {
  tokens: Tokens
  user: User
}

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface LocationData {
  as: string
  city: string
  country: string
  countryCode: string
  ip: string
  isp: string
  lat: number
  lon: number
  org: string
  query: string
  region: string
  regionName: string
  status: string
  timezone: string
  zip: string
}
