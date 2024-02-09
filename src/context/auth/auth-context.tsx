import { GeoCode } from "@/types/geocode"
import { LocationData, Tokens } from "@/types/misc"
import { User } from "@/types/user"
import { APP_VERSION, continents, formatCurrency } from "@/utils"
import { instance } from "@/utils/instance"
import { isServer } from "@tanstack/react-query"
import axios from "axios"
import { jwtDecode, JwtPayload } from "jwt-decode"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

interface State {
  user: User | null
  isAuthenticated: boolean
  geoCode?: GeoCode | null
  accessToken: string | null
  refreshToken: string | null
  userLocation: LocationData | null
}

interface ContextState extends State {
  setAuthState: (tokens: Tokens & { user: User }) => void
  clearAuthState: () => void
}

const AuthContext = createContext<ContextState | undefined>(undefined)

const defaultState = (): State => {
  let initialState: State = {
    user: null,
    userLocation: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  }

  try {
    if (isServer) initialState

    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    const serializedUser = localStorage.getItem("user")
    const user =
      serializedUser !== null ? (JSON.parse(serializedUser) as User) : null

    if (refreshToken && accessToken) {
      const { exp: refreshTokenExp } = jwtDecode<JwtPayload>(refreshToken)
      const { exp: accessTokenExp } = jwtDecode<JwtPayload>(accessToken)
      const isRefreshTokenExpired = refreshTokenExp
        ? refreshTokenExp * 1000 < Date.now()
        : true
      const isAccessTokenExpired = accessTokenExp
        ? accessTokenExp * 1000 < Date.now()
        : true

      if (!isRefreshTokenExpired && !isAccessTokenExpired) {
        initialState = {
          user,
          userLocation: null,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }
      }
    }
  } catch {}

  return initialState
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("Context: wrap the component inside AuthContextProvider")
  }

  return context
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, setState] = useState(defaultState)
  const [userLocation, setUserLocation] = useState<LocationData | null>(null)
  const [ipAddress, setIpAddress] = useState<string | null>(null)

  const setAuthState = ({
    accessToken,
    refreshToken,
    user,
  }: Tokens & { user: User }) => {
    try {
      instance.defaults.headers.Authorization = accessToken
      setState(prevState => ({
        ...prevState,
        isAuthenticated: true,
        accessToken,
        refreshToken,
        user,
      }))
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      localStorage.setItem("user", JSON.stringify(user))
    } catch (err) {
      console.log(err)
    }
  }

  const clearAuthState = () => {
    try {
      if (typeof window !== "undefined") {
        setState(prevState => ({
          ...prevState,
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }))
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("user")

        window.location.href = "/"
      }
    } catch {}
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        clearAuthState,
        setAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
