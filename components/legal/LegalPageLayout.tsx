import Link from 'next/link';
import { getBreadcrumbSchema } from '@/lib/seo/breadcrumb';
import { SITE_URL } from '@/lib/seo/localBusiness';

interface LegalPageLayoutProps {
  title: string;
  /** URL path for this page, e.g. "/privacy-policy" — used for breadcrumb structured data. */
  path: string;
  lastUpdated: string;
  intro?: string;
  children: React.ReactNode;
}

/**
 * Shared shell for legal/policy pages (Privacy Policy, Terms of Service,
 * Accessibility Statement) — breadcrumb, title, and prose container so the
 * pages stay visually consistent without duplicating layout markup.
 */
export function LegalPageLayout({ title, path, lastUpdated, intro, children }: LegalPageLayoutProps) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: title, url: `${SITE_URL}${path}` },
  ]);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-emerald-600 transition-colors focus:outline-none focus:underline">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 font-medium" aria-current="page">{title}</li>
          </ol>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
          {intro && <p className="mt-4 text-gray-600 leading-relaxed">{intro}</p>}
        </header>

        <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600">
          {children}
        </div>
      </main>
    </div>
  );
}
