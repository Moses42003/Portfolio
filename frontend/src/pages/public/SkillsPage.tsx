import { PageShell } from "../../components/layout/PageShell";
import { SkillCard } from "../../components/skills/SkillCard";
import { Seo } from "../../components/ui/Seo";
import { ErrorState, LoadingState } from "../../components/ui/States";
import { useSkills } from "../../features/skills/hooks";

export function SkillsPage() {
  const query = useSkills();
  const categories = ["Frontend", "Backend", "Database", "DevOps", "Tools", "Hardware / Systems"];
  return (
    <>
      <Seo title="Skills" path="/skills" />
      <PageShell eyebrow="Skills" title="Tools I use to build reliable digital products." description="A practical skill system grouped by category, represented by proficiency language instead of misleading percentage bars.">
        {query.isLoading ? <LoadingState label="Loading skills" /> : query.isError ? <ErrorState message="Unable to load skills." /> : (
          <div className="space-y-10">
            {categories.map((category) => {
              const items = query.data?.filter((skill) => skill.category === category) ?? [];
              if (!items.length) return null;
              return (
                <section key={category}>
                  <h2 className="mb-4 text-2xl font-bold text-white">{category}</h2>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map((skill) => <SkillCard key={skill.id} skill={skill} />)}</div>
                </section>
              );
            })}
          </div>
        )}
      </PageShell>
    </>
  );
}
