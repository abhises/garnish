import { getPosts, getFeaturedImage, getTerms } from '@/lib/wordpress';
import { SITES } from '@/lib/sites';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ subdomain: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subdomain } = await params;
  const site = SITES[subdomain];
  if (!site) return { title: 'Blog | Garnish Music Production' };

  return {
    title: `Blog & Tutorials | ${site.name}`,
    description: `Read the latest music production tips, gear reviews, and tutorials from Garnish ${site.city} instructors.`,
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { subdomain } = await params;
  const site = SITES[subdomain];
  if (!site) notFound();

  const posts = await getPosts(subdomain, 12);
  const hasPosts = posts && posts.length > 0;

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span 
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: site.accentColor, backgroundColor: `${site.accentColor}10` }}
          >
            Garnish {site.city} Journal
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Articles &amp; Tutorials
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Expert insights, mixing tricks, synthesizer sound design guides, and school updates directly from our tutors.
          </p>
        </div>

        {hasPosts ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const featuredImg = getFeaturedImage(post, 'medium');
              const categories = getTerms(post, 'category');
              return (
                <article 
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      {featuredImg && typeof featuredImg.url === 'string' && featuredImg.url.trim() !== '' ? (
                        <Image
                          src={featuredImg.url}
                          alt={featuredImg.alt}
                          fill
                          className="object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-mono text-xs">
                          Garnish Music Production
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {categories.map((cat) => (
                          <span 
                            key={cat.id} 
                            className="text-[9px] font-extrabold tracking-wider uppercase bg-slate-50 px-2 py-0.5 rounded text-slate-500 border border-slate-100"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        <Link 
                          href={`/blog/${post.slug}`}
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                      </h2>
                      <div 
                        className="text-xs text-slate-500 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                      />
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-xs font-bold hover:underline"
                      style={{ color: site.accentColor }}
                    >
                      Read Article <span className="ml-1">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 max-w-xl mx-auto">
            <p className="text-slate-500">No blog posts found for this location yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
