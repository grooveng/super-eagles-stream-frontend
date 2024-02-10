import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <script
          defer
          data-domain="supereaglesevent.com"
          src="https://plausible.io/js/script.js"
        ></script>
        <script
          defer
          data-domain="uduxconcerts.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
