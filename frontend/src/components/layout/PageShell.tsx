import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageShell({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children: ReactNode }) {
  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">{eyebrow}</p> : null}
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">{title}</h1>
        {description ? <p className="mt-4 text-lg leading-8 text-slate-300">{description}</p> : null}
      </div>
      {children}
    </motion.section>
  );
}
