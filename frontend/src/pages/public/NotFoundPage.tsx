import { LinkButton } from "../../components/ui/Button";
import { Seo } from "../../components/ui/Seo";

export function NotFoundPage() {
  return (
    <section className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-4 text-center">
      <Seo title="Not Found" path="/404" />
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">404</p>
        <h1 className="mt-3 text-5xl font-black text-white">Page not found</h1>
        <p className="mt-4 text-slate-400">The route exists in neither the public portfolio nor the admin application.</p>
        <LinkButton to="/" className="mt-8">Back Home</LinkButton>
      </div>
    </section>
  );
}
