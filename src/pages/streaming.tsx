import { BaseLayout } from "@/components/layout/base-layout";
import { StreamingSection } from "@/components/section/streaming-section/";
import { QueryProps } from "@/types/query-params";

export default function StreamingPage({ query }: QueryProps) {
  return (
    <BaseLayout variant="baseOtherPages">
      <StreamingSection />
    </BaseLayout>
  );
}
