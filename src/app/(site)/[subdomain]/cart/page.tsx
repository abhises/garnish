import { SITES } from '@/lib/sites';
import Link from 'next/link';
import type { Metadata } from 'next';

interface CartPageProps {
  params: Promise<{
    subdomain: string;
  }>;
  searchParams?: Promise<{
    item?: string;
  }>;
}

export async function generateMetadata({ params }: CartPageProps): Promise<Metadata> {
  const { subdomain } = await params;
  const site = SITES[subdomain] || SITES.www;
  return {
    title: `Your Cart & Enrollment | ${site.name}`,
    description: `Review your course selections and complete enrollment at Garnish ${site.city}.`,
  };
}

export default async function CartPage({ params, searchParams }: CartPageProps) {
  const { subdomain } = await params;
  const site = SITES[subdomain] || SITES.www;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const itemSlug = resolvedSearchParams.item;

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100/80 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-8 mb-8">
            <div>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
                style={{ color: site.accentColor, backgroundColor: `${site.accentColor}10` }}
              >
                Garnish {site.city}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
                Your Enrollment Cart
              </h1>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest self-start sm:self-auto">
              Secure Checkout Ready
            </span>
          </div>

          {itemSlug ? (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Selected Program
                </span>
                <h3 className="text-lg font-bold text-slate-900 capitalize">
                  {itemSlug.replace(/-/g, ' ')}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Boutique workstation setup &bull; 1-on-1 mentorship at Garnish {site.city}
                </p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                <Link
                  href={`/checkout?product=${itemSlug}`}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 text-center w-full sm:w-auto"
                  style={{ backgroundColor: site.accentColor }}
                >
                  Proceed to Checkout →
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 px-4 rounded-2xl bg-slate-50/70 border border-dashed border-slate-200 mb-8">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-2">Your enrollment cart is currently empty</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
                Browse our music production, sound design, and mixing &amp; mastering programs to select the right course for your schedule and career goals.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/programs"
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: site.accentColor }}
                >
                  Browse Academy Programs
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl text-sm font-bold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-all"
                >
                  Speak with Admissions
                </Link>
              </div>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-3 pt-6 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
              <div>
                <strong className="block text-slate-900 mb-0.5">Instant Seat Reservation</strong>
                Your spot in the boutique class is locked in right upon enrollment confirmation.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
              <div>
                <strong className="block text-slate-900 mb-0.5">Flexible Payment Options</strong>
                Payment plans and split deposit installments are available for accredited programs.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
              <div>
                <strong className="block text-slate-900 mb-0.5">100% Workstation Guarantee</strong>
                Every student gets their own individual DAW workstation and hardware rack.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
