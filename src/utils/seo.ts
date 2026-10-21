import { SITE_URL } from '../constants/seo';

const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.content = content;
};

const setCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
};

export interface PageSeo {
  /** App path of the current page, e.g. '/program/spi-core'. */
  path: string;
  /** Search title. Left out, the page keeps the title it set itself. */
  title?: string;
  /** Search description. Left out, the description stays as it was. */
  description?: string;
  noindex: boolean;
}

/** Sets the search snippet, share tags, canonical URL and robots directive for the page now on screen. */
export const applyPageSeo = ({ path, title, description, noindex }: PageSeo) => {
  const url = `${SITE_URL}${path}`;
  if (title) {
    document.title = title;
    setMeta('property', 'og:title', title);
    setMeta('name', 'twitter:title', title);
  }
  if (description) {
    setMeta('name', 'description', description);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:description', description);
  }
  setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
  setCanonical(url);
  setMeta('property', 'og:url', url);
};
