import { BaseLayout } from "@/components/layout/base-layout";
import { StreamingSection } from "@/components/section/streaming-section/";
import { QueryProps } from "@/types/query-params";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function StreamingPage({ query }: QueryProps) {
  const { push } = useRouter();

  useEffect(() => {
    // if (!query?.eid) {
    //   push("/browse-events");
    // }
  }, [query?.eid, push]);

  return query?.eid ? (
    <BaseLayout variant="baseOtherPages">
      <StreamingSection eid={query.eid as string} />
    </BaseLayout>
  ) : null;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      query,
    },
  };
};