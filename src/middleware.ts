import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getRankMathRedirect } from './lib/redirects';

// All recognized Garnish Multisite subdomains
const RECOGNIZED_SUBDOMAINS = new Set([
  'www', 'la', 'ny', 'nsh', 'ber', 'hk', 'mia', 'edu',
  'tyo', 'sea', 'bcn', 'mrb', 'hou', 'syd', 'av', 'lis', 'sf', 'sg', 'bh', 'pdx'
]);

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Exclude static assets, system routes, AND Payload admin/API routes (excluding .php paths like wp-signup.php)
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/favicon.ico') ||
    (url.pathname.includes('.') && !url.pathname.endsWith('.php'))
  ) {
    return NextResponse.next();
  }

  // Strip port number from hostname: "la.localhost:3000" → "la.localhost"
  const hostWithoutPort = hostname.split(':')[0];
  const hostParts = hostWithoutPort.split('.');

  // Resolve subdomain from hostname
  // Handles: la.localhost, la.garnishmusicproduction.com, la.localhost.com
  let subdomain = 'www';

  if (hostParts.length >= 2) {
    const candidate = hostParts[0];
    // Only treat first segment as subdomain if it's not bare "localhost" or a bare domain
    if (candidate !== 'localhost' && candidate !== 'garnishmusicproduction' && candidate !== 'www') {
      if (RECOGNIZED_SUBDOMAINS.has(candidate)) {
        subdomain = candidate;
      }
    }
  }

  // Check Rank Math 301 redirects (subdomain & attachment aware)
  const redirectTarget = getRankMathRedirect(url.pathname, url.search, subdomain);
  if (redirectTarget) {
    // In local development (localhost), do not redirect out to production external domains (like https://edu.garnishmusicproduction.com/music/dave-garnish/)
    const isLocalhost = hostname.includes('localhost') || hostname.startsWith('127.0.0.1');
    const isExternalGarnish = typeof redirectTarget === 'string' && (redirectTarget.includes('dave-garnish') || redirectTarget.includes('garnishmusicproduction.com'));
    if (!isLocalhost || !isExternalGarnish) {
      return NextResponse.redirect(new URL(redirectTarget, request.url), 301);
    }
  }

  // Rewrite path internally: /about → /la/about  (so Next.js routes to [subdomain]/page.tsx)
  url.pathname = `/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
};
