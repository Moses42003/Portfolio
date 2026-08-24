import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Skill } from "../../types/skill";

const ICON_MAP: Record<string, LucideIcon> = {
  Atom: Icons.Atom,
  Braces: Icons.Braces,
  Palette: Icons.Palette,
  Terminal: Icons.Terminal,
  Zap: Icons.Zap,
  Database: Icons.Database,
  Box: Icons.Box,
  Cpu: Icons.Cpu,
};

export function SkillCard({ skill }: { skill: Skill }) {
  const Icon = ICON_MAP[skill.icon] ?? Icons.Code2;
  return (
    <article className="rounded-lg border border-white/10 bg-white/[.035] p-5 transition hover:border-cyan-300/40 hover:bg-white/[.055]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="grid size-11 place-items-center rounded-lg border border-violet-400/30 bg-violet-500/10 text-violet-200">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <span className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-slate-300">{skill.proficiency}</span>
      </div>
      <h2 className="font-bold text-white">{skill.name}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">{skill.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-slate-500">{skill.category}</span>
        <span className="font-semibold text-cyan-200">{skill.years}+ yr</span>
      </div>
    </article>
  );
}
