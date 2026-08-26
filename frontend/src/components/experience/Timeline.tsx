import type { Experience } from "../../types/experience";
import { asArray, formatYearRange } from "../../lib/utils";

export function Timeline({ items }: { items: Experience[] }) {
  return (
    <div className="relative space-y-8 before:absolute before:left-3 before:top-2 before:h-full before:w-px before:bg-gradient-to-b before:from-violet-400 before:to-transparent">
      {asArray(items).map((item) => {
        const responsibilities = asArray(item.responsibilities);
        const technologies = asArray(item.technologies);
        return (
        <article key={item.id} className="relative pl-10">
          <span className="absolute left-0 top-2 size-6 rounded-full border border-violet-300 bg-slate-950 shadow-[0_0_20px_rgba(168,85,247,.35)]" />
          <div className="rounded-lg border border-white/10 bg-white/[.035] p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-violet-300">{formatYearRange(item.start_date, item.end_date, item.current)}</p>
                <h2 className="mt-1 text-xl font-bold text-white">{item.role}</h2>
                <p className="text-sm text-slate-400">{item.company}{item.location ? ` · ${item.location}` : ""}</p>
              </div>
              {item.current ? <span className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-200">Current</span> : null}
            </div>
            {item.description ? <p className="mt-4 text-slate-300">{item.description}</p> : null}
            {responsibilities.length ? (
              <ul className="mt-4 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
                {responsibilities.map((responsibility) => <li key={responsibility}>• {responsibility}</li>)}
              </ul>
            ) : null}
            {technologies.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {technologies.map((technology) => <span key={technology} className="rounded-md border border-white/10 bg-slate-950/60 px-2 py-1 text-xs text-slate-300">{technology}</span>)}
              </div>
            ) : null}
          </div>
        </article>
        );
      })}
    </div>
  );
}
