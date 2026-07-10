import type { Metadata } from 'next';
import { SITES } from '@/lib/sites';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

interface SubdomainLayoutProps {
  children: React.ReactNode;
  params: Promise<{ subdomain: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ subdomain: string }> }): Promise<Metadata> {
  const { subdomain } = await params;
  const site = SITES[subdomain];
  
  if (!site) {
    return {
      title: 'Garnish Music Production School',
    };
  }

  return {
    title: `${site.name} | ${site.tagline}`,
    description: `Learn professional music production, DJing, and sound engineering at Garnish ${site.city}. Explore our programs and start booking your courses.`,
  };
}

export default async function SubdomainLayout({
  children,
  params,
}: SubdomainLayoutProps) {
  const { subdomain } = await params;
  const site = SITES[subdomain];

  if (!site) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Header with active location config */}
      <Header site={site} />
      
      {/* Dynamic Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer with active location details */}
      <Footer site={site} />
    </div>
  );
}
