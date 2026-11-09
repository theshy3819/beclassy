import type { Lang } from '../data/site';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Site-relative link that respects the deploy base path and the locale prefix. */
export function href(lang: Lang, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const prefix = lang === 'en' ? '/en' : '';
  const joined = `${BASE}${prefix}${clean}`;
  return joined === '' ? '/' : joined;
}

/** Static file under /public. */
export function asset(path: string): string {
  return `${BASE}/${path.replace(/^\//, '')}`;
}

/** Same page in the other language. `path` is the locale-free path, e.g. '/menu'. */
export function altHref(lang: Lang, path: string): string {
  return href(lang === 'ko' ? 'en' : 'ko', path);
}
