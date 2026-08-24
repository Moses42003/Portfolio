import { BlogCard } from "../../components/blog/BlogCard";
import { PageShell } from "../../components/layout/PageShell";
import { Seo } from "../../components/ui/Seo";
import { EmptyState, ErrorState, LoadingState } from "../../components/ui/States";
import { useBlogPosts } from "../../features/blog/hooks";

export function BlogPage() {
  const query = useBlogPosts();
  return (
    <>
      <Seo title="Blog" path="/blog" />
      <PageShell eyebrow="Blog" title="Notes on building better web software." description="Architecture, frontend craft, backend contracts, and practical developer workflow.">
        {query.isLoading ? <LoadingState label="Loading posts" /> : query.isError ? <ErrorState message="Unable to load blog posts." /> : query.data?.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{query.data.map((post) => <BlogCard key={post.id} post={post} />)}</div>
        ) : <EmptyState title="No posts yet" />}
      </PageShell>
    </>
  );
}
