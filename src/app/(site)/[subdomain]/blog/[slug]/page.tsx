import { getPostBySlug, getFeaturedImage, getAuthorName, getTerms } from '@/lib/wordpress';
import { SITES } from '@/lib/sites';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{
    subdomain: string;
    slug: string;
  }>;
}

// Generate Dynamic SEO Metadata per Subdomain
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subdomain, slug } = await params;
  const post = await getPostBySlug(subdomain, slug);
  const site = SITES[subdomain];
  
  if (!post || !site) {
    return {
      title: 'Post Not Found',
    };
  }

  const featuredImg = getFeaturedImage(post);

  return {
    title: `${post.title.rendered} | ${site.name}`,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: featuredImg ? {
      images: [{ url: featuredImg.url, alt: featuredImg.alt }],
    } : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { subdomain, slug } = await params;
  const site = SITES[subdomain];
  const post = await getPostBySlug(subdomain, slug);

  if (!post || !site) {
    notFound();
  }

  const featuredImage = getFeaturedImage(post);
  const authorName = getAuthorName(post);
  const categories = getTerms(post, 'category');
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100/80 overflow-hidden">
        {/* Header Section */}
        <div className="p-8 sm:p-12 pb-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {categories.map((cat) => (
              <span 
                key={cat.id} 
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-50 text-slate-600 border border-slate-100"
              >
                {cat.name}
              </span>
            ))}
          </div>

          <h1 
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <div className="mt-6 flex items-center gap-4 text-sm text-slate-500 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">{authorName}</span>
            </div>
            <span>•</span>
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </div>

        {/* Featured Image */}
        {featuredImage && typeof featuredImage.url === 'string' && featuredImage.url.trim() !== '' && (
          <div className="relative aspect-[16/9] w-full bg-slate-100 border-y border-slate-100">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt}
              fill
              priority
              sizes="(max-w-768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        )}

        {/* Post Content */}
        <div className="p-8 sm:p-12 pt-6">
          <div 
            className="wp-content prose prose-slate max-w-none"
            style={{ '--accent': site.accentColor } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: post.content.rendered.replace(/https?:\/\/[^\/]+\/wp-content\/uploads\//gi, '/uploads/').replace(/\/wp-content\/uploads\//gi, '/uploads/') }}
          />

          {/* Footer Back Link */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex justify-between">
            <Link 
              href="/"
              className="inline-flex items-center text-sm font-bold transition-all hover:opacity-85"
              style={{ color: site.accentColor }}
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
