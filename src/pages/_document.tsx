import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  // const src_domain = process.env.NEXT_PUBLIC_MAIN_WEBSITE_URL;
  // const zendesk = process.env.NEXT_PUBLIC_ZENDESK_KEY;
  // const env = process.env.NODE_ENV;
  // const domain =
  //   env === "development"
  //     ? "http://localhost:3000"
  //     : src_domain?.includes("stage")
  //     ? "stagestream.udux.com"
  //     : src_domain?.includes("www")
  //     ? "livestreams.udux.com"
  //     : "stream.udux.com";

  return (
    <Html lang="en">
      <Head>
        {/* <link rel="shortcut icon" href="/favicon.png" type="image/png" /> */}
        <script defer data-domain="uduxconcerts.com" src="https://plausible.io/js/script.js"></script>
        {/* <script
          defer
          data-domain={domain}
          src="https://plausible.io/js/script.js"
        ></script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
