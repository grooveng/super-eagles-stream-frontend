import { Tokens } from "@/types/misc";
import { User } from "@/types/user";

import { instance } from "@/utils/instance";
import { isServer } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface State {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  // refreshToken: string | null;
}

interface ContextState extends State {
  setAuthState: (tokens: Tokens & { user: User }) => void;
  clearAuthState: () => void;
}

const AuthContext = createContext<ContextState | undefined>(undefined);

const defaultState = (): State => {
  let initialState: State = {
    user: null,
    accessToken: null,
    // refreshToken: null,
    isAuthenticated: false,
  };

  try {
    if (isServer) initialState;

    const accessToken = localStorage.getItem("accessToken");
    // const refreshToken = localStorage.getItem("refreshToken");
    const serializedUser = localStorage.getItem("user");
    const user =
      serializedUser !== null ? (JSON.parse(serializedUser) as User) : null;

    if (accessToken) {
      // const { exp: refreshTokenExp } = jwtDecode<JwtPayload>(refreshToken);
      const { exp: accessTokenExp } = jwtDecode<JwtPayload>(accessToken);
      // const isRefreshTokenExpired = refreshTokenExp
      //   ? refreshTokenExp * 1000 < Date.now()
      //   : true;
      const isAccessTokenExpired = accessTokenExp
        ? accessTokenExp * 1000 < Date.now()
        : true;

      if (!isAccessTokenExpired) {
        initialState = {
          user,
          // userLocation: null,
          accessToken,
          // refreshToken,
          isAuthenticated: true,
        };
      }
    }
  } catch {}

  return initialState;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Context: wrap the component inside AuthContextProvider");
  }

  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState(defaultState);

  const setAuthState = ({ accessToken, user }: Tokens & { user: User }) => {
    try {
      instance.defaults.headers.Authorization = accessToken;
      setState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        accessToken,
        user,
      }));
      localStorage.setItem("accessToken", accessToken);
      // localStorage.setItem("refreshToken", refreshToken)
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.log(err);
    }
  };

  const clearAuthState = () => {
    try {
      if (typeof window !== "undefined") {
        setState((prevState) => ({
          ...prevState,
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }));
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        window.location.href = "/";
      }
    } catch {}
  };

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
  );
};
