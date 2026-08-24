import { AlertCircle, Inbox, Loader2 } from "lucide-react";
import { Button } from "./Button";

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-48 items-center justify-center rounded-lg border border-white/10 bg-white/[.03] text-slate-300">
      <Loader2 className="mr-2 size-5 animate-spin text-violet-300" aria-hidden="true" />
      {label}
    </div>
  );
}

export function ErrorState({ title = "Something went wrong", message = "Please try again.", onRetry }: { title?: string; message?: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="rounded-lg border border-rose-400/30 bg-rose-500/10 p-6 text-rose-100">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-1 size-5" aria-hidden="true" />
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-rose-100/80">{message}</p>
          {onRetry ? <Button className="mt-4" variant="secondary" onClick={onRetry}>Try again</Button> : null}
        </div>
      </div>
    </div>
  );
}

export function EmptyState({ title = "Nothing here yet", message = "Content will appear here when it is available." }: { title?: string; message?: string }) {
  return (
    <div className="rounded-lg border border-dashed border-white/15 bg-white/[.02] p-8 text-center">
      <Inbox className="mx-auto size-8 text-slate-500" aria-hidden="true" />
      <h2 className="mt-3 font-semibold text-white">{title}</h2>
      <p className="mt-1 text-sm text-slate-400">{message}</p>
    </div>
  );
}
