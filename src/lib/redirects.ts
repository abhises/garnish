// 301 Redirections imported from all Rank Math settings JSON exports across subdomains
export interface RedirectRule {
  source: string;
  destination: string;
  statusCode: 301 | 302;
  comparison?: 'exact' | 'contains' | 'regex';
  subdomain?: string;
}

export interface SubdomainRankMathSettings {
  subdomain: string;
  websiteName: string;
  attachmentRedirectUrls: boolean;
  attachmentRedirectDefault: string;
}

export const RANK_MATH_SUBDOMAIN_SETTINGS: Record<string, SubdomainRankMathSettings> = {
  "www": {
    "subdomain": "www",
    "websiteName": "Garnish Music Production School | San Francisco Bay",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://www.garnishmusicproduction.com"
  },
  "nsh": {
    "subdomain": "nsh",
    "websiteName": "Garnish Music Production School | Nashville",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://nsh.garnishmusicproduction.com"
  },
  "ber": {
    "subdomain": "ber",
    "websiteName": "Garnish Music Production School | Berlin",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://ber.garnishmusicproduction.com"
  },
  "hk": {
    "subdomain": "hk",
    "websiteName": "Garnish Music Production School | Hongkong",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://hk.garnishmusicproduction.com"
  },
  "mia": {
    "subdomain": "mia",
    "websiteName": "Garnish Music Production",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://mia.garnishmusicproduction.com"
  },
  "la": {
    "subdomain": "la",
    "websiteName": "Garnish Music Production",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://la.garnishmusicproduction.com"
  },
  "edu": {
    "subdomain": "edu",
    "websiteName": "Garnish",
    "attachmentRedirectUrls": false,
    "attachmentRedirectDefault": "https://edu-1.garnishmusicproduction.com"
  },
  "ny": {
    "subdomain": "ny",
    "websiteName": "Garnish Music Production",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://ny.garnishmusicproduction.com"
  },
  "tyo": {
    "subdomain": "tyo",
    "websiteName": "Garnish Music Production School | Tokyo",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://tyo.garnishmusicproduction.com"
  },
  "sea": {
    "subdomain": "sea",
    "websiteName": "Garnish Music Production School | Seattle",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://sea.garnishmusicproduction.com"
  },
  "bcn": {
    "subdomain": "bcn",
    "websiteName": "Garnish Music Production School | Barcelona",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://bcn.garnishmusicproduction.com"
  },
  "mrb": {
    "subdomain": "mrb",
    "websiteName": "Garnish Music Production School | Barcelona",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://mrb.garnishmusicproduction.com"
  },
  "syd": {
    "subdomain": "syd",
    "websiteName": "Garnish Music Production School | Berlin",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://syd.garnishmusicproduction.com"
  },
  "lis": {
    "subdomain": "lis",
    "websiteName": "Garnish Music Production School | Barcelona",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://lis.garnishmusicproduction.com"
  },
  "bh": {
    "subdomain": "bh",
    "websiteName": "Garnish Music Production School | Barcelona",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://bh.garnishmusicproduction.com"
  },
  "sg": {
    "subdomain": "sg",
    "websiteName": "Garnish Music Production School | Singapore",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://sg.garnishmusicproduction.com"
  }
};

export const RANK_MATH_REDIRECTS: RedirectRule[] = [
  {
    "source": "wp-signup.php?new=to.garnishmusicproduction.com",
    "destination": "https://www.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/courses/dave-garnish/",
    "destination": "https://edu.garnishmusicproduction.com/music/dave-garnish/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "music/dave-garnish/",
    "destination": "/courses/dave-garnish/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/dave-garnish/",
    "destination": "/courses/dave-garnish/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/courses/electronic-emp/",
    "destination": "https://www.garnishmusicproduction.com/programs/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/2011/04/24/electronic-dance-music-how-to-make-electronic-dance-music/",
    "destination": "https://www.garnishmusicproduction.com/electronic-dance-music-how-to-make-electronic-dance-music/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/category/miscellaneous/",
    "destination": "https://www.garnishmusicproduction.com/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/2011/09/05/resident-advisor-ableton-competition-winner/",
    "destination": "https://www.garnishmusicproduction.com/resident-advisor-ableton-competition-winner/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/2016/07/03/artist-website-tips/",
    "destination": "https://www.garnishmusicproduction.com/artist-website-tips/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/2019/12/11/the-art-of-soulful-songwriting/",
    "destination": "https://www.garnishmusicproduction.com/the-art-of-soulful-songwriting/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/2011/02/21/sampling-frequencies-bit-rates-96-v-44-1khz-24-v-16bit/",
    "destination": "https://www.garnishmusicproduction.com/sampling-frequencies-bit-rates-96-v-44-1khz-24-v-16bit/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "los-angeles-la-contact-map/",
    "destination": "https://www.garnishmusicproduction.com/contact-map/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "logic-training-how-to-use-logic/",
    "destination": "https://www.garnishmusicproduction.com/courses/logic-pro-x-course-london/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "diplomas/electronic-music-producer/",
    "destination": "https://www.garnishmusicproduction.com/programs/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/portfolio-category/mixing/feed/",
    "destination": "https://www.garnishmusicproduction.com/mixing-3/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "links",
    "destination": "https://www.garnishmusicproduction.com/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/2016/07/09/mastering-tips-beginners/",
    "destination": "https://www.garnishmusicproduction.com/mastering-tips-beginners/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/2016/07/04/how-to-develop-your-sound/",
    "destination": "https://www.garnishmusicproduction.com/how-to-develop-your-sound/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/2012/06/26/girl-dj-manchester-dj-l-roche-does-logic-course/",
    "destination": "https://www.garnishmusicproduction.com/girl-dj-manchester-dj-l-roche-does-logic-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/2012/06/26/vocal-eq/",
    "destination": "https://www.garnishmusicproduction.com/vocal-eq/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/2012/06/26/vocal-eq/feed/",
    "destination": "https://www.garnishmusicproduction.com/vocal-eq/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "online-school/",
    "destination": "https://edu.garnishmusicproduction.com/online-music-production/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/electronic-music-emp/",
    "destination": "https://la.garnishmusicproduction.com/courses/electronic-music-emp/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/2019/12/13/nyc-compression-or-parallel-compression-in-ableton-live/",
    "destination": "https://www.garnishmusicproduction.com/nyc-compression-or-parallel-compression-in-ableton-live/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/courses/ableton-course-london/",
    "destination": "https://www.garnishmusicproduction.com/courses/ableton-live-course-london/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/courses/aamir-yaqub/",
    "destination": "https://www.garnishmusicproduction.com/courses/aamir-yaqub/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "21295/",
    "destination": "https://www.garnishmusicproduction.com/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/2019/12/11/region-inspector-float-in-logic-pro-x-2/",
    "destination": "https://www.garnishmusicproduction.com/region-inspector-float-in-logic-pro-x-2/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/category/diaries/",
    "destination": "https://www.garnishmusicproduction.com/category/diaries/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/courses/logic-course-london/",
    "destination": "https://www.garnishmusicproduction.com/courses/logic-pro-x-course-london/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/courses/nick-powell/",
    "destination": "https://www.garnishmusicproduction.com/courses/nick-powell/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "author/gmpldn/",
    "destination": "https://www.garnishmusicproduction.com/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "blog/courses/mixing-and-mastering-course-london/",
    "destination": "https://www.garnishmusicproduction.com/courses/mixing-and-mastering-course-london/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "logic/quantizing-multi-track-drums-in-logic-pro-x/",
    "destination": "https://mia.garnishmusicproduction.com/production/how-to-compress-drums/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "logic/logic-pro-naming-tracks-coloring/",
    "destination": "https://mia.garnishmusicproduction.com/courses/logic-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "uncategorized/business/",
    "destination": "https://mia.garnishmusicproduction.com/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "uncategorized/sub-synthesis/",
    "destination": "https://mia.garnishmusicproduction.com/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "uncategorized/instrument_basics/",
    "destination": "https://mia.garnishmusicproduction.com/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "online-logic-courses/",
    "destination": "https://la.garnishmusicproduction.com/courses/logic-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "los-angeles-la",
    "destination": "https://la.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "courses/mixing-sound-design-film-tv/",
    "destination": "https://la.garnishmusicproduction.com/courses/mixing-mastering-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "cart/",
    "destination": "https://la.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "uncategorized/intro-to-artists-recording-contacts/",
    "destination": "https://la.garnishmusicproduction.com/focushours/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "music-production-tutors/",
    "destination": "https://la.garnishmusicproduction.com/focushours/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "courses/summer-camp-week/",
    "destination": "https://la.garnishmusicproduction.com/courses/summer-camp-school/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "music-producer-course/",
    "destination": "https://la.garnishmusicproduction.com/courses/ableton-live-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "product/mac-os-essentials/",
    "destination": "https://la.garnishmusicproduction.com/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "courses/logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "pages-numbers-keynote-online-courses/",
    "destination": "https://la.garnishmusicproduction.com/courses/k-pop-hit-songwriting-class/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "courses/hk/",
    "destination": "https://hk.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "courses/ber/",
    "destination": "https://ber.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "courses/mia/",
    "destination": "https://mia.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "courses/ny/",
    "destination": "https://ny.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "courses/nsh/",
    "destination": "https://nsh.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "courses/la/",
    "destination": "https://la.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "courses/sf/",
    "destination": "https://sf.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "courses/ldn/",
    "destination": "https://garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "schedule",
    "destination": "https://docs.google.com/forms/d/e/1FAIpQLSd7XqCr9T2qcphZmiHlS_tlcaRqWfNUREOdaI5JXGMEBMFkfQ/viewform",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "courses/logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "courses/ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "/training/",
    "destination": "https://edu.garnishmusicproduction.com/courses/",
    "statusCode": 301,
    "comparison": "regex",
    "subdomain": "edu"
  },
  {
    "source": "online-final-cut-courses/",
    "destination": "https://la.garnishmusicproduction.com/training/final-cut",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "training/sound-design-synthesis/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-music-emp",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "feedback",
    "destination": "https://garnishmusicproduction.com/feedback",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "dip-pay/",
    "destination": "https://la.garnishmusicproduction.com/product/academy-payments/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "training/music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "training/how-to-dj-101/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-dj-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "programs/songwriting-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/songwriting-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "programs/emp-electronic-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/emp-electronic-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "mobile-music-making-apps/",
    "destination": "https://ny.garnishmusicproduction.com/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "pro-tools/",
    "destination": "https://ny.garnishmusicproduction.com/courses/pro-tools/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "courses/radio-podcast-course/",
    "destination": "https://sf.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "T5V6ZMAH-",
    "destination": "https://sf.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "training/underground-dj-course/",
    "destination": "https://sf.garnishmusicproduction.com/courses/electronic-dj-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/underground-dj-course/",
    "destination": "https://sf.garnishmusicproduction.com/courses/electronic-dj-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "private-tuition/",
    "destination": "https://sf.garnishmusicproduction.com/courses/private-instruction/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/turntablism-dj-course/",
    "destination": "https://sf.garnishmusicproduction.com/courses/electronic-dj-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  }
];

// Build optimized lookup maps for instant middleware execution
const exactRedirectMap = new Map<string, string>();
const subdomainRedirectMap = new Map<string, string>();

for (const rule of RANK_MATH_REDIRECTS) {
  const normalized = rule.source.replace(/^\//, '');
  const targetMap = (rule.subdomain && rule.subdomain !== 'www') ? subdomainRedirectMap : exactRedirectMap;
  const prefix = (rule.subdomain && rule.subdomain !== 'www') ? `${rule.subdomain}:` : '';

  targetMap.set(`${prefix}${normalized}`, rule.destination);
  targetMap.set(`${prefix}/${normalized}`, rule.destination);

  if (normalized.endsWith('/')) {
    const noTrailing = normalized.slice(0, -1);
    targetMap.set(`${prefix}${noTrailing}`, rule.destination);
    targetMap.set(`${prefix}/${noTrailing}`, rule.destination);
  } else {
    targetMap.set(`${prefix}${normalized}/`, rule.destination);
    targetMap.set(`${prefix}/${normalized}/`, rule.destination);
  }
}

/**
 * Checks if the given pathname, search query, and subdomain match any Rank Math 301 redirect.
 */
export function getRankMathRedirect(pathname: string, search: string = '', subdomain: string = 'www'): string | null {
  // Check Rank Math attachment / upload path redirects (e.g. ?attachment_id=... or /attachment/)
  if (search.includes('attachment_id=') || pathname.startsWith('/attachment/')) {
    const subSettings = RANK_MATH_SUBDOMAIN_SETTINGS[subdomain] || RANK_MATH_SUBDOMAIN_SETTINGS['www'];
    if (subSettings && subSettings.attachmentRedirectUrls) {
      return subSettings.attachmentRedirectDefault;
    }
  }

  const pathWithoutLeading = pathname.replace(/^\//, '');
  const pathWithQuery = `${pathWithoutLeading}${search}`;
  const fullPathWithQuery = `${pathname}${search}`;

  // 1. Check subdomain-specific rules first
  if (subdomain && subdomain !== 'www') {
    if (subdomainRedirectMap.has(`${subdomain}:${pathWithQuery}`)) {
      return subdomainRedirectMap.get(`${subdomain}:${pathWithQuery}`)!;
    }
    if (subdomainRedirectMap.has(`${subdomain}:${fullPathWithQuery}`)) {
      return subdomainRedirectMap.get(`${subdomain}:${fullPathWithQuery}`)!;
    }
    if (subdomainRedirectMap.has(`${subdomain}:${pathname}`)) {
      return subdomainRedirectMap.get(`${subdomain}:${pathname}`)!;
    }
    if (subdomainRedirectMap.has(`${subdomain}:${pathWithoutLeading}`)) {
      return subdomainRedirectMap.get(`${subdomain}:${pathWithoutLeading}`)!;
    }
  }

  // 2. Check global/www exact pathname variants
  if (exactRedirectMap.has(pathWithQuery)) {
    return exactRedirectMap.get(pathWithQuery)!;
  }
  if (exactRedirectMap.has(fullPathWithQuery)) {
    return exactRedirectMap.get(fullPathWithQuery)!;
  }
  if (exactRedirectMap.has(pathname)) {
    return exactRedirectMap.get(pathname)!;
  }
  if (exactRedirectMap.has(pathWithoutLeading)) {
    return exactRedirectMap.get(pathWithoutLeading)!;
  }

  return null;
}

/**
 * Returns Next.js config `redirects()` items.
 */
export function getNextConfigRedirects() {
  return RANK_MATH_REDIRECTS.map((rule) => {
    // If source contains query params, configure `has` matching
    if (rule.source.includes('?')) {
      const [pathPart, queryPart] = rule.source.split('?');
      const params = new URLSearchParams(queryPart);
      const has = Array.from(params.entries()).map(([key, value]) => ({
        type: 'query' as const,
        key,
        value,
      }));

      const sourcePath = pathPart.startsWith('/') ? pathPart : `/${pathPart}`;
      return {
        source: sourcePath,
        has,
        destination: rule.destination,
        permanent: rule.statusCode === 301,
      };
    }

    // Standard pathname redirect
    const cleanSource = rule.source.replace(/^\//, '');
    const cleanNoTrailing = cleanSource.replace(/\/$/, '');
    return {
      source: `/${cleanNoTrailing}`,
      destination: rule.destination,
      permanent: rule.statusCode === 301,
    };
  });
}
