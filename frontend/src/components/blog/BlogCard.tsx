import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogPost } from "../../types/blog";
import { formatDate } from "../../lib/utils";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="overflow-hidden rounded-lg border border-white/10 bg-white/[.035] transition hover:-translate-y-1 hover:border-violet-400/40">
      <Link to={`/blog/${post.slug}`} className="block h-44" aria-label={`Read ${post.title}`}>
        <div className="h-full" style={{ background: post.cover_image }} />
      </Link>
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-md bg-violet-500/15 px-2 py-1 text-xs font-semibold text-violet-200">{post.category.name}</span>
          <span className="rounded-md border border-white/10 px-2 py-1 text-xs text-slate-400">{post.reading_time} min read</span>
        </div>
        <h2 className="text-xl font-bold text-white">{post.title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between gap-3 text-sm">
          <span className="text-slate-500">{formatDate(post.published_at)}</span>
          <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 font-semibold text-cyan-200">Read <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </article>
  );
}
