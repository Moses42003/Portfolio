import type { ReactNode } from "react";

export function AdminTable({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/[.035]">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-white/[.03] text-xs uppercase tracking-[0.12em] text-slate-500">
          <tr>{headers.map((header) => <th key={header} className="px-4 py-3">{header}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-white/10 text-slate-300">{children}</tbody>
      </table>
    </div>
  );
}

export function AdminPageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">Admin</p>
        <h1 className="mt-2 text-3xl font-black text-white">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
