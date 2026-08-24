import { NavigationTab } from '../types';

export const TAB_TO_PATH: Record<NavigationTab, string> = {
  marketplace: '/',
  admin: '/admin',
  blog: '/blog',
  verification_hub: '/verification',
  diaspora_gateway: '/diaspora',
  investment_calc: '/calculator',
  property_mgmt: '/management',
  client_portal: '/portal',
  title_guide: '/title-guide',
  developer_kyc: '/developer-kyc',
  help_faq: '/help',
  terms_privacy: '/terms',
};

export const PATH_TO_TAB: Record<string, NavigationTab> = {
  '/': 'marketplace',
  '/admin': 'admin',
  '/admin/': 'admin',
  '/blog': 'blog',
  '/journal': 'blog',
  '/verification': 'verification_hub',
  '/verify': 'verification_hub',
  '/diaspora': 'diaspora_gateway',
  '/calculator': 'investment_calc',
  '/calc': 'investment_calc',
  '/management': 'property_mgmt',
  '/portal': 'client_portal',
  '/title-guide': 'title_guide',
  '/developer-kyc': 'developer_kyc',
  '/help': 'help_faq',
  '/faq': 'help_faq',
  '/terms': 'terms_privacy',
};

export function getTabFromUrl(): NavigationTab {
  if (typeof window === 'undefined') return 'marketplace';

  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
  const searchParams = new URLSearchParams(window.location.search);
  const tabParam = searchParams.get('tab') || searchParams.get('page') || searchParams.get('view');

  // 1. Direct /admin path
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return 'admin';
  }

  // 2. Direct pathname match
  if (PATH_TO_TAB[pathname]) {
    return PATH_TO_TAB[pathname];
  }

  // 3. Hash match fallback (#admin, #/admin, #/admin/dashboard, #blog)
  if (hash === 'admin' || hash === 'admin/' || hash === '/admin' || hash.startsWith('admin') || hash.startsWith('/admin')) {
    return 'admin';
  }
  if (PATH_TO_TAB[`/${hash}`]) {
    return PATH_TO_TAB[`/${hash}`];
  }
  if (PATH_TO_TAB[hash]) {
    return PATH_TO_TAB[hash];
  }

  // 4. Query param fallback (?tab=admin or ?view=admin)
  if (tabParam === 'admin') {
    return 'admin';
  }
  if (tabParam && PATH_TO_TAB[`/${tabParam}`]) {
    return PATH_TO_TAB[`/${tabParam}`];
  }

  return 'marketplace';
}

export function syncUrlWithTab(tab: NavigationTab, replace: boolean = false) {
  if (typeof window === 'undefined') return;

  const targetPath = TAB_TO_PATH[tab] || '/';
  const currentPath = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';

  if (currentPath !== targetPath) {
    if (replace) {
      window.history.replaceState({ tab }, '', targetPath);
    } else {
      window.history.pushState({ tab }, '', targetPath);
    }
  }
}
