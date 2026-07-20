import React from 'react';
import Link from 'next/link';
import { getLocalLink } from '@/lib/sites';

interface SmartLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * SmartLink wraps Next.js <Link> to safely handle cross-subdomain navigations.
 * - Same-domain links use Next.js <Link> for fast RSC (React Server Component) soft-navigation.
 * - Cross-domain links use a native <a> tag to force a hard browser navigation.
 * 
 * This completely prevents Next.js from attempting cross-origin JSON fetches,
 * which otherwise crash with "Failed to fetch RSC payload" (CORS).
 */
export function SmartLink({ href, children, className, onClick, target, rel, ...rest }: SmartLinkProps) {
  // 1. Compile the href using our environment-aware site router (localhost vs production)
  const localHref = getLocalLink(href);

  // 2. Is it an absolute URL? (Cross-domain or external)
  const isExternal = localHref.startsWith('http');

  if (isExternal) {
    // Determine if it belongs to our Multisite network
    const isInternalSubdomain = localHref.includes('garnishmusicproduction.com') || localHref.includes('.localhost:3000');
    
    // Internal cross-subdomain links stay in the same tab (_self).
    // Truly external links (like Discord) open in a new tab (_blank).
    const resolvedTarget = target || (isInternalSubdomain ? "_self" : "_blank");
    const resolvedRel = rel || (isInternalSubdomain ? undefined : "noopener noreferrer");

    return (
      <a 
        href={localHref} 
        className={className} 
        target={resolvedTarget} 
        rel={resolvedRel} 
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  // 3. Same-domain relative links use Next.js fast routing
  return (
    <Link href={localHref} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
