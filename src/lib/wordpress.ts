import { getPayload } from 'payload';
import configPromise from '@/payload.config';

// src/lib/wordpress.ts (Now completely backed by Neon DB / Payload CMS)

// General WordPress Post/Page Interface (Maintained for backward compatibility with React components)
export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  acf?: Record<string, any>;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: {
        sizes?: Record<string, { source_url: string; width: number; height: number }>;
      };
    }>;
    'author'?: Array<{
      name: string;
      avatar_urls?: Record<string, string>;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
  };
}

import { resolveImageUrl } from './resolve-image';
export { resolveImageUrl };


export function getFeaturedImage(post: WordPressPost, size: string = 'full'): { url: string; alt: string } | null {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return null;

  const rawUrl = media.media_details?.sizes?.[size]?.source_url || media.source_url;
  const url = resolveImageUrl(rawUrl) || rawUrl;
  const alt = media.alt_text || post.title.rendered;

  return { url, alt };
}

export function getAuthorName(post: WordPressPost): string {
  return post._embedded?.['author']?.[0]?.name || 'Admin';
}

export function getTerms(post: WordPressPost, taxonomy: string = 'category') {
  const termGroups = post._embedded?.['wp:term'] || [];
  for (const group of termGroups) {
    const match = group.filter(t => t.taxonomy === taxonomy);
    if (match.length > 0) return match;
  }
  return [];
}

// Convert a Payload CMS document into the legacy WordPress format
function mapPayloadToWP(doc: any, type: string): WordPressPost {
  let contentHtml = doc.htmlFallback || doc.description || '';
  if (doc.content && typeof doc.content === 'string') contentHtml = doc.content;
  if (!contentHtml && doc.layout) {
    // Basic extraction if it uses blocks
    contentHtml = doc.layout.map((b: any) => b.htmlContent || '').join('\n');
  }

  let imgObj = doc.featuredImage;
  let imgUrl = '';
  let imgAlt = doc.title || '';
  if (imgObj && typeof imgObj === 'object') {
     imgUrl = imgObj.url || (imgObj.filename ? `/media/${imgObj.filename}` : '') || (imgObj.wpUploadPath ? `/uploads/${imgObj.wpUploadPath}` : '');
     imgAlt = imgObj.alt || doc.title || '';
  }

  return {
    id: doc.id || 1,
    date: doc.publishedAt || doc.createdAt || new Date().toISOString(),
    slug: doc.slug,
    status: 'publish',
    type: type,
    link: `/${doc.slug}`,
    title: { rendered: doc.title || '' },
    content: { rendered: contentHtml },
    excerpt: { rendered: doc.excerpt || doc.shortDescription || contentHtml.replace(/<[^>]*>/g, '').substring(0, 160) },
    featured_media: imgUrl ? 1 : 0,
    price: doc.price,
    acf: {
      duration: doc.duration,
      schedule: doc.schedule || 'Flexible',
      level: doc.level || 'Beginner to Intermediate',
      price: doc.price,
    },
    _embedded: {
      'wp:featuredmedia': imgUrl ? [{
         source_url: resolveImageUrl(imgUrl) || imgUrl,
         alt_text: imgAlt,
      }] : [],
    }
  };
}

export async function getCollection(
  subdomain: string,
  endpoint: string,
  queryParameters: Record<string, string | number> = {}
): Promise<WordPressPost[]> {
  const payload = await getPayload({ config: configPromise });
  let collection = 'posts';
  if (endpoint === 'product' || endpoint === 'products') collection = 'courses';
  if (endpoint === 'pages') collection = 'pages';

  const where: any = {
    tenant: { equals: subdomain === 'www' || !subdomain ? 'www' : subdomain }
  };

  if (queryParameters.slug) {
    where.slug = { equals: queryParameters.slug };
  }

  try {
    const result = await payload.find({
      collection: collection as any,
      where,
      limit: Number(queryParameters.per_page) || 10,
      page: Number(queryParameters.page) || 1,
    });

    // Fallback to www for subdomains if content isn't found
    if (result.docs.length === 0 && subdomain !== 'www') {
      const fbResult = await payload.find({
        collection: collection as any,
        where: { ...where, tenant: { equals: 'www' } },
        limit: Number(queryParameters.per_page) || 10,
        page: Number(queryParameters.page) || 1,
      });
      return fbResult.docs.map(d => mapPayloadToWP(d, endpoint));
    }

    return result.docs.map(d => mapPayloadToWP(d, endpoint));
  } catch (e) {
    console.error('Payload fetch error:', e);
    return [];
  }
}

export async function getSingleBySlug(subdomain: string, endpoint: string, slug: string): Promise<WordPressPost | null> {
  const posts = await getCollection(subdomain, endpoint, { slug });
  if (posts && posts.length > 0) return posts[0];
  return null;
}

export async function getPosts(subdomain: string, limit: number = 10, page: number = 1): Promise<WordPressPost[]> {
  return getCollection(subdomain, 'posts', { per_page: limit, page });
}

export async function getPostBySlug(subdomain: string, slug: string): Promise<WordPressPost | null> {
  return getSingleBySlug(subdomain, 'posts', slug);
}

export async function getPageBySlug(subdomain: string, slug: string): Promise<WordPressPost | null> {
  return getSingleBySlug(subdomain, 'pages', slug);
}

export async function getProducts(subdomain: string, limit: number = 20): Promise<WordPressPost[]> {
  return getCollection(subdomain, 'product', { per_page: limit });
}

export async function getProductBySlug(subdomain: string, slug: string): Promise<WordPressPost | null> {
  return getSingleBySlug(subdomain, 'product', slug);
}
