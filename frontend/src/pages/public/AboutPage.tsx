import { Seo } from "../../components/ui/Seo";
import { LoadingState } from "../../components/ui/States";
import { PageShell } from "../../components/layout/PageShell";
import { useProfile } from "../../features/profile/hooks";

export function AboutPage() {
  const { data: profile, isLoading } = useProfile();
  return (
    <>
      <Seo title="About" path="/about" />
      <PageShell eyebrow="About" title="A full-stack developer with product taste and backend discipline." description="I care about interfaces that feel sharp, data contracts that stay understandable, and systems that can grow without becoming fragile.">
        {isLoading || !profile ? <LoadingState label="Loading profile" /> : (
          <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
            <div className="rounded-lg border border-white/10 bg-white/[.035] p-6">
              <h2 className="text-2xl font-bold text-white">Introduction</h2>
              <p className="mt-4 leading-8 text-slate-300">{profile.about.introduction}</p>
              <h2 className="mt-8 text-2xl font-bold text-white">Developer Philosophy</h2>
              <p className="mt-4 leading-8 text-slate-300">{profile.about.philosophy}</p>
            </div>
            <div className="grid gap-6">
              <div className="rounded-lg border border-white/10 bg-white/[.035] p-6">
                <h2 className="text-xl font-bold text-white">What I Build</h2>
                <div className="mt-4 flex flex-wrap gap-2">{profile.about.builds.map((item) => <span key={item} className="rounded-md border border-violet-400/25 bg-violet-500/10 px-3 py-1.5 text-sm text-violet-100">{item}</span>)}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[.035] p-6">
                <h2 className="text-xl font-bold text-white">Development Approach</h2>
                <ol className="mt-4 grid gap-3 text-slate-300">{profile.about.approach.map((item, index) => <li key={item} className="rounded-md border border-white/10 bg-slate-950/50 p-3"><span className="mr-3 text-violet-300">{index + 1}.</span>{item}</li>)}</ol>
              </div>
            </div>
            <div className="lg:col-span-2 rounded-lg border border-white/10 bg-white/[.035] p-6">
              <h2 className="text-xl font-bold text-white">Technology Overview</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {Object.entries(profile.about.technology_overview).map(([group, items]) => (
                  <div key={group} className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
                    <h3 className="font-semibold text-cyan-100">{group}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{items.join(", ")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </PageShell>
    </>
  );
}
