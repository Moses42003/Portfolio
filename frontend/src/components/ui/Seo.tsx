import { useEffect } from "react";
import { CANONICAL_URL, SITE_DESCRIPTION, SITE_NAME } from "../../lib/constants";

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
}

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(property ? "property" : "name", name);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function Seo({ title, description = SITE_DESCRIPTION, path = "/" }: SeoProps) {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = pageTitle;
    setMeta("description", description);
    setMeta("og:title", pageTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", `${CANONICAL_URL}${path}`, true);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${CANONICAL_URL}${path}`;
  }, [description, path, title]);
  return null;
}
