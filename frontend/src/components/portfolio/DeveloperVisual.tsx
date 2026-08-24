import { Code2, Database, Server, Terminal } from "lucide-react";

const tech = ["React", "TypeScript", "Python", "FastAPI", "Node.js", "PostgreSQL"];

export function DeveloperVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="absolute inset-10 rounded-full bg-gradient-to-br from-violet-600/40 via-blue-500/20 to-cyan-300/30 blur-2xl" />
      <div className="absolute inset-8 rounded-[2rem] border border-white/10 bg-white/[.04] backdrop-blur">
        <div className="absolute inset-x-8 top-8 flex items-center gap-2">
          <span className="size-3 rounded-full bg-rose-400" />
          <span className="size-3 rounded-full bg-amber-300" />
          <span className="size-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex h-full items-center justify-center p-10">
          <div className="grid size-44 place-items-center rounded-full border border-violet-300/40 bg-slate-950 text-center shadow-[0_0_60px_rgba(124,58,237,.35)]">
            <div>
              <Code2 className="mx-auto size-14 text-cyan-200" aria-hidden="true" />
              <p className="mt-3 text-4xl font-black text-white">MD</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Full Stack</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-0 max-w-64 rounded-lg border border-white/10 bg-slate-950/90 p-4 text-sm shadow-2xl">
        <p className="font-mono text-violet-200">const developer = {"{"}</p>
        <p className="pl-4 font-mono text-slate-300">name: "Moses",</p>
        <p className="pl-4 font-mono text-cyan-200">focus: "Impact"</p>
        <p className="font-mono text-violet-200">{"}"}</p>
      </div>
      <div className="absolute right-2 top-16 rounded-lg border border-cyan-300/30 bg-cyan-400/10 p-3 text-cyan-100"><Terminal className="size-5" aria-hidden="true" /></div>
      <div className="absolute bottom-24 right-0 rounded-lg border border-violet-300/30 bg-violet-500/10 p-3 text-violet-100"><Database className="size-5" aria-hidden="true" /></div>
      <div className="absolute left-4 top-10 rounded-lg border border-blue-300/30 bg-blue-500/10 p-3 text-blue-100"><Server className="size-5" aria-hidden="true" /></div>
      <div className="absolute -bottom-4 right-10 flex max-w-xs flex-wrap gap-2">
        {tech.map((item) => <span key={item} className="rounded-md border border-white/10 bg-slate-950/80 px-2.5 py-1 text-xs text-slate-300">{item}</span>)}
      </div>
    </div>
  );
}
