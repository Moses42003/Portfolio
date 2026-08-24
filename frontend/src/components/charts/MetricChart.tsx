export function MetricChart({ values }: { values: number[] }) {
  const max = Math.max(...values);
  return (
    <div className="flex h-48 items-end gap-3 rounded-lg border border-white/10 bg-white/[.03] p-4" aria-label="Analytics chart">
      {values.map((value, index) => (
        <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center gap-2">
          <div className="w-full rounded-t-md bg-gradient-to-t from-violet-600 to-cyan-300 shadow-[0_0_18px_rgba(124,58,237,.25)]" style={{ height: `${Math.max(16, (value / max) * 150)}px` }} />
          <span className="text-xs text-slate-500">{index + 1}</span>
        </div>
      ))}
    </div>
  );
}
