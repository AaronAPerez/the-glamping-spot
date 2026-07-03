export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Builds BreadcrumbList JSON-LD from the same {name, url} pairs a page
 * already renders in its visual breadcrumb nav, so the two never drift.
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
