'use client';

import { use, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SITES } from '@/lib/sites';
import Link from 'next/link';
import type { SiteConfig } from '@/lib/sites';

interface CheckoutPageProps {
  params: Promise<{ subdomain: string }>;
}

interface ProductDetails {
  title: string;
  price: string;
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { subdomain } = use(params);
  const site = SITES[subdomain] || SITES.www;
  const searchParams = useSearchParams();
  const productSlug = searchParams.get('product');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [product, setProduct] = useState<ProductDetails | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  // Fetch product detail locally to display correct price
  useEffect(() => {
    if (productSlug) {
      // Simulate fetching product details
      setLoading(true);
      const url = `${site.subdomain === 'www' ? 'http://localhost:8080' : `http://${site.subdomain}.localhost:8080`}/wp-json/wp/v2/product?slug=${productSlug}`;
      
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setProduct({
              title: data[0].title.rendered,
              price: data[0].price || '$995',
            });
          } else {
            // Fallback mock details if offline
            setProduct({
              title: productSlug.replace(/-/g, ' ').toUpperCase(),
              price: '$995',
            });
          }
        })
        .catch(() => {
          setProduct({
            title: productSlug.replace(/-/g, ' ').toUpperCase(),
            price: '$995',
          });
        })
        .finally(() => setLoading(false));
    }
  }, [productSlug, site]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate Stripe payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <main className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-lg border border-slate-100/80 animate-fade-in-up">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-display mb-2">Booking Confirmed!</h1>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Thank you for enrolling. A confirmation email with class schedules and onboarding information has been sent to <span className="font-bold text-slate-700">{formData.email}</span>.
          </p>

          <div className="bg-slate-50 rounded-2xl p-4 mb-8 text-left text-xs space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Course:</span>
              <span className="font-bold text-slate-800">{product?.title || 'Music Course'}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Location:</span>
              <span className="font-bold text-slate-800">Garnish {site.city}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Amount Paid:</span>
              <span className="font-bold text-slate-800">{product?.price || '$995'}</span>
            </div>
          </div>

          <Link
            href="/"
            className="block w-full py-4 rounded-xl text-sm font-bold text-white transition-all shadow-md"
            style={{ backgroundColor: site.accentColor }}
          >
            Return to Homepage
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-16 px-4 bg-slate-50">
      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-5">
        
        {/* Checkout Form */}
        <div className="md:col-span-3 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100/80">
          <h1 className="text-xl font-bold text-slate-900 mb-6 font-display">Student Enrollment Details</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': site.accentColor } as React.CSSProperties}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': site.accentColor } as React.CSSProperties}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': site.accentColor } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': site.accentColor } as React.CSSProperties}
              />
            </div>

            {/* Simulated Stripe Credit Card Inputs */}
            <div className="pt-6 border-t border-slate-100">
              <h2 className="text-sm font-bold text-slate-800 mb-4">Payment Method</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="xxxx xxxx xxxx xxxx"
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': site.accentColor } as React.CSSProperties}
                  />
                </div>
                
                <div className="grid gap-4 grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2">Expiration Date</label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      required
                      value={formData.expiry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2"
                      style={{ '--tw-ring-color': site.accentColor } as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2">CVC</label>
                    <input
                      type="text"
                      name="cvc"
                      placeholder="xxx"
                      required
                      value={formData.cvc}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2"
                      style={{ '--tw-ring-color': site.accentColor } as React.CSSProperties}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-sm font-bold text-white transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              style={{ backgroundColor: site.accentColor }}
            >
              {loading ? 'Processing Secure Payment...' : `Authorize Payment (${product?.price || '$995'})`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/80">
            <h2 className="text-sm font-bold text-slate-800 mb-4 font-display">Order Summary</h2>
            
            {loading && !product ? (
              <p className="text-xs text-slate-400">Loading details...</p>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Course:</span>
                  <span className="font-bold text-slate-800 text-right max-w-[150px]">{product?.title || 'Music Course'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-bold text-slate-800">Garnish {site.city}</span>
                </div>
                <div className="flex justify-between py-1 border-t border-slate-50 pt-3 text-sm">
                  <span className="font-bold text-slate-900">Total:</span>
                  <span className="font-black text-slate-900">{product?.price || '$995'}</span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
