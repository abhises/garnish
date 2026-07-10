import { getProducts, getFeaturedImage } from '@/lib/wordpress';
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
  
  if (!site) return { title: 'Programs | Garnish Music Production' };

  return {
    title: `All Music Production & DJ Programs | ${site.name}`,
    description: `Browse all courses, academic diplomas, and short classes offered at Garnish ${site.city}.`,
  };
}

export default async function ProgramsPage({ params }: Props) {
  const { subdomain } = await params;
  const site = SITES[subdomain];
  if (!site) notFound();

  const products = await getProducts(subdomain, 20);
  const hasProducts = products && products.length > 0;

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span 
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: site.accentColor, backgroundColor: `${site.accentColor}10` }}
          >
            Garnish {site.city} Curriculum
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Our Courses &amp; Programs
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            From short intensive sound design workshops to comprehensive academic diplomas, explore our full course lineup.
          </p>
        </div>

        {/* Programs Grid */}
        {hasProducts ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const featuredImg = getFeaturedImage(product, 'medium');
              return (
                <div 
                  key={product.id}
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
                          Garnish Music Academy
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        <Link 
                          href={`/shop/${product.slug}`}
                          dangerouslySetInnerHTML={{ __html: product.title.rendered }}
                        />
                      </h2>
                      <div 
                        className="text-sm text-slate-500 line-clamp-3 mb-4"
                        dangerouslySetInnerHTML={{ __html: product.excerpt?.rendered || '' }}
                      />
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900">
                      {product.price || 'Book Now'}
                    </span>
                    <Link
                      href={`/shop/${product.slug}`}
                      className="px-4 py-2 rounded-lg text-xs font-bold text-white transition-all shadow-sm"
                      style={{ backgroundColor: site.accentColor }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 max-w-xl mx-auto">
            <p className="text-slate-500 mb-6">Course inventory is currently being updated for {site.city}.</p>
            <Link 
              href="/contact"
              className="inline-flex px-6 py-3 rounded-xl text-sm font-bold text-white shadow-md"
              style={{ backgroundColor: site.accentColor }}
            >
              Contact Admissions
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
