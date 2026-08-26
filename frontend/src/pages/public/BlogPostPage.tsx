import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { PageShell } from "../../components/layout/PageShell";
import { Seo } from "../../components/ui/Seo";
import { EmptyState, LoadingState } from "../../components/ui/States";
import { useBlogPost, useBlogPosts } from "../../features/blog/hooks";
import { asArray, getCategoryName } from "../../lib/utils";
import { formatDate } from "../../lib/utils";
import { BlogCard } from "../../components/blog/BlogCard";

export function BlogPostPage() {
  const { slug } = useParams();
  const { data: post, isLoading } = useBlogPost(slug);
  const related = useBlogPosts();
  if (isLoading) return <PageShell title="Loading post"><LoadingState /></PageShell>;
  if (!post) return <PageShell title="Post not found"><EmptyState title="Post not found" /></PageShell>;

  const tags = asArray(post.tags);
  const relatedPosts = asArray(related.data).filter((item) => item.id !== post.id).slice(0, 2);

  return (
    <>
      <Seo title={post.title} path={`/blog/${post.slug}`} description={post.excerpt} />
      <PageShell eyebrow={getCategoryName(post.category)} title={post.title} description={`${formatDate(post.published_at ?? post.created_at)} · ${post.reading_time ?? 5} min read${post.author ? ` · ${post.author}` : ""}`}>
        <div className="mb-8 h-[360px] rounded-lg border border-white/10" style={{ background: post.cover_image ?? post.thumbnail_url ?? "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(34,211,238,0.15))" }} />
        <article className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-cyan-200 prose-p:text-slate-300 prose-li:text-slate-300">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
        <div className="mt-8 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-md border border-white/10 px-2 py-1 text-xs text-slate-300">{tag}</span>)}</div>
        <section className="mt-14">
          <h2 className="mb-5 text-2xl font-bold text-white">Related Posts</h2>
          <div className="grid gap-6 md:grid-cols-2">{relatedPosts.map((item) => <BlogCard key={item.id} post={item} />)}</div>
        </section>
      </PageShell>
    </>
  );
}
