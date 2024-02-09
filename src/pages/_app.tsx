import { AppLoader } from "@/components/ui/loaders";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import React, {
  Fragment,
  JSXElementConstructor,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNavBar } from "@/components/layout/mobile-nav-bar";
import { useRouter } from "next/router";
import { AuthContextProvider } from "@/context/auth";
import "@/styles/globals.css";
import "@/styles/globals.scss";
import { ToastContainerWrapper } from "@/components/ui/toaster-wrapper";
// import "react-toastify/dist/ReactToastify.css";

if (typeof window === "undefined") React.useLayoutEffect = React.useEffect;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: JSXElementConstructor<any>;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [appLoading, setAppLoading] = useState(true);
  const Layout = Component.layout ?? Fragment;
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setAppLoading(false);
    }, 2000);
  }, []);

  useLayoutEffect(() => {
    document.body.classList.add("body--loaded");
  }, []);

  return appLoading ? (
    <AppLoader styles={{ height: "100dvh" }} />
  ) : (
    <ToastContainerWrapper>
      <AuthContextProvider>
        <Layout>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ReactQueryDevtools initialIsOpen={false} />
              <div className="wrapper">
                <Header />
                {/* <SmootherContext.Provider value={smoother}> */}
                <div id="smooth-wrapper">
                  <div id="smooth-content">
                    {/* <ProtectedRoute router={router}> */}
                    <Component {...pageProps} />
                    {/* </ProtectedRoute> */}
                  </div>
                </div>
                {/* </SmootherContext.Provider> */}
                <Footer />
              </div>
            </Hydrate>
          </QueryClientProvider>
        </Layout>
      </AuthContextProvider>
    </ToastContainerWrapper>
  );
}
