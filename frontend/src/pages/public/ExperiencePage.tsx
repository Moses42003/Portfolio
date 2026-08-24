import { PageShell } from "../../components/layout/PageShell";
import { Timeline } from "../../components/experience/Timeline";
import { Seo } from "../../components/ui/Seo";
import { ErrorState, LoadingState } from "../../components/ui/States";
import { useExperience } from "../../features/experience/hooks";

export function ExperiencePage() {
  const query = useExperience();
  return (
    <>
      <Seo title="Experience" path="/experience" />
      <PageShell eyebrow="Experience" title="Experience across frontend, backend, and technical systems." description="A timeline of software work, client projects, and systems-focused problem solving.">
        {query.isLoading ? <LoadingState label="Loading experience" /> : query.isError ? <ErrorState message="Unable to load experience." /> : <Timeline items={query.data ?? []} />}
      </PageShell>
    </>
  );
}
