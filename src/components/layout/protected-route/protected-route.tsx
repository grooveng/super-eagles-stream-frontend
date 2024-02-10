import { useAuthContext } from "@/context/auth";
// import { useSocket } from "@/context/socket";
import { NextRouter } from "next/router";
import React, { useCallback } from "react";

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

const URL_DEF = process.env.NEXT_PUBLIC_API_URI || "";

export type ProtectedRouteProps = {
  children: React.ReactNode;
  router: NextRouter;
};
const ProtectedRoute = ({ router, children }: ProtectedRouteProps) => {
  const [isOnMultiDevice, setIsOnMultiDevice] = React.useState(false);

  //Identify authenticated user
  const { isAuthenticated, clearAuthState, user } = useAuthContext();

  const handleLogout = useCallback(() => {
    clearAuthState();
  }, [clearAuthState]);

  let unprotectedRoutes = ["/otp", "/"];

    let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
    

    console.log(isBrowser())
    console.log(isAuthenticated)
    console.log(pathIsProtected)

    if ((isBrowser() && !isAuthenticated && pathIsProtected) || isOnMultiDevice) {
   
    window.location.href = `/${router.asPath ? `?from=${router.asPath}` : ""}`;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
