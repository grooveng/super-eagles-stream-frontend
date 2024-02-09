import { PageMeta } from "@/types/page-meta";
import Head from "next/head";

export function CustomHead({ title, meta }: PageMeta) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      {meta?.description && (
        <meta name="description" content={meta.description}></meta>
      )}
      {meta?.robots && <meta name="robots" content={meta.robots}></meta>}
      {meta?.ogTitle && <meta name="og:title" content={meta.ogTitle}></meta>}
      {meta?.ogDescription && (
        <meta name="og:description" content={meta.ogDescription}></meta>
      )}
      {meta?.ogImage && <meta name="og:image" content={meta.ogImage}></meta>}
    </Head>
  );
}
