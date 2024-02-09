// import { useAuthContext } from "@/context/auth";
// import { useSocket } from "@/context/socket";
// import { NextRouter } from "next/router";
// import React, { useCallback } from "react";

// //check if you are on the client (browser) or server
// const isBrowser = () => typeof window !== "undefined";

// const URL_DEF = process.env.NEXT_PUBLIC_API_URI || "";

// export type ProtectedRouteProps = {
//   children: React.ReactNode;
//   router: NextRouter;
// };
// const ProtectedRoute = ({ router, children }: ProtectedRouteProps) => {
//   const [isOnMultiDevice, setIsOnMultiDevice] = React.useState(false);

//   //Identify authenticated user
//   const { isAuthenticated, clearAuthState, clearPlaceOrderItem, user } =
//     useAuthContext();
//   const socket = useSocket(URL_DEF);

//   const handleLogout = useCallback(() => {
//     clearAuthState();
//     clearPlaceOrderItem();
//   }, [clearAuthState, clearPlaceOrderItem]);

//   React.useEffect(() => {
//     if (socket) {
//       socket.on("logout_event", (data) => {
//         // Handle incoming data from the server
//         if (data.userId === user?.id) {
//           handleLogout();
//         }
//       });
//     }
//   }, [socket, handleLogout, user]);

//   let unprotectedRoutes = [
//     "/otp",
//     "/404",
//     "/faq",
//     "/login",
//     "/signup",
//     "/account",
//     "/help-desk",
//     "/about-us",
//     "/enter-otp",
//     "/contact-us",
//     "/verify-otp",
//     "/forgot-pass",
//     "/browse-events",
//     "/events/[slug]",
//     "/reset-password",
//     "/check-your-phone",
//     "/continue-with-mtn",
//     "/continue-with-momo",
//     "/terms-and-conditions",
//     "/no-access-to-stream",
//     "/privacy-policy",
//     "/cookie-policy",
//     "/help-desk",
//     "/help-desk/category-view",
//     "/help-desk/category-read",
//     "/purchase-policy",
//     "/purchase-terms",
//     "/",
//     // "/payment-success",
//     // "/payment-failed"
//   ];

//   let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

//   if ((isBrowser() && !isAuthenticated && pathIsProtected) || isOnMultiDevice) {
//     window.location.href = `/account${
//       router.asPath ? `?from=${router.asPath}` : ""
//     }`;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;
