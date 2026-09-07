/**
 * Resolves an asset path to an absolute path that respects the application's base href.
 * Works seamlessly on localhost, Netlify, Vercel, and GitHub Pages subpaths.
 */
export function resolveAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  // Strip leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Retrieve base href from <base href="..."> or document.baseURI
  let baseHref = '/';
  if (typeof document !== 'undefined') {
    const baseEl = document.querySelector('base');
    if (baseEl && baseEl.getAttribute('href')) {
      baseHref = baseEl.getAttribute('href')!;
    }
  }

  if (!baseHref.endsWith('/')) {
    baseHref += '/';
  }

  return baseHref + cleanPath;
}
