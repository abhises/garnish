'use client';

import { use, useState } from 'react';
import { SITES } from '@/lib/sites';

interface ContactPageProps {
  params: Promise<{ subdomain: string }>;
}

export default function ContactPage({ params }: ContactPageProps) {
  const { subdomain } = use(params);
  const site = SITES[subdomain] || SITES.www;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', course: 'Electronic Music Production', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100/80">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Info */}
          <div>
            <span 
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ color: site.accentColor, backgroundColor: `${site.accentColor}10` }}
            >
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
              Contact Garnish {site.city}
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">
              Have questions about start dates, tuition fees, or need advice on choosing the right program? Send us a message or schedule a studio visit.
            </p>

            {site.address && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Studio Location</h3>
                <p className="text-sm font-medium text-slate-700 leading-relaxed">{site.address}</p>
              </div>
            )}
          </div>

          {/* Interactive Form */}
          <div>
            {submitted ? (
              <div className="bg-emerald-50 rounded-2xl p-6 text-center border border-emerald-100 my-8">
                <h3 className="font-bold text-emerald-800 text-lg mb-2">Message Sent!</h3>
                <p className="text-xs text-emerald-600 leading-relaxed">
                  Thank you for reaching out to Garnish {site.city}. An admissions coordinator will reply to your inbox shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': site.accentColor } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': site.accentColor } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Program of Interest</label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': site.accentColor } as React.CSSProperties}
                  >
                    <option>Electronic Music Production</option>
                    <option>DJ Course</option>
                    <option>Songwriting & Production</option>
                    <option>Mixing & Mastering</option>
                    <option>Private Tuition</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': site.accentColor } as React.CSSProperties}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all shadow-md hover:shadow-lg"
                  style={{ backgroundColor: site.accentColor }}
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
