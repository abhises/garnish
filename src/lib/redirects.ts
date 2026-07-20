// 301 Redirections imported across all 17 subdomains from Rank Math & WordPress Redirection plugin JSON exports
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
  },
  "hou": {
    "subdomain": "hou",
    "websiteName": "Garnish Music Production School | HOU",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://hou.garnishmusicproduction.com"
  },
  "pdx": {
    "subdomain": "pdx",
    "websiteName": "Garnish Music Production School | PDX",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://pdx.garnishmusicproduction.com"
  },
  "sf": {
    "subdomain": "sf",
    "websiteName": "Garnish Music Production School | SF",
    "attachmentRedirectUrls": true,
    "attachmentRedirectDefault": "https://sf.garnishmusicproduction.com"
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
    "source": "training/",
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
  },
  {
    "source": "training/ableton-course-london",
    "destination": "https://www.garnishmusicproduction.com/courses/ableton-course-london/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "training/songwriting-course-london",
    "destination": "https://www.garnishmusicproduction.com/courses/songwriting-course-london/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "training/summer-camp-school",
    "destination": "https://www.garnishmusicproduction.com/courses/summer-camp-school/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "training/sound-design-course",
    "destination": "https://www.garnishmusicproduction.com/courses/electronic-emp",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "training/logic-course-london",
    "destination": "https://www.garnishmusicproduction.com/courses/logic-course-london/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "training/mixing-and-mastering-course-london",
    "destination": "https://www.garnishmusicproduction.com/courses/mixing-and-mastering-course-london/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "music-production-school-contact",
    "destination": "https://www.garnishmusicproduction.com/contact-map/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "private-tuition-one-one",
    "destination": "https://www.garnishmusicproduction.com/private-tuition",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "ableton-course-london/",
    "destination": "https://www.garnishmusicproduction.com/courses/ableton-course-london/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/major-minor-and-extended-chords-on-the-keyboard-and-piano/#",
    "destination": "https://www.garnishmusicproduction.com/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/major-minor-and-extended-chords-on-the-keyboard-and-piano/",
    "destination": "https://www.garnishmusicproduction.com/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/electronic-music-production-sound-design-classes-in-london-1/",
    "destination": "https://www.garnishmusicproduction.com/programs/ableton-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/edm-electronic-dance-music-production-oscillator-waveforms/",
    "destination": "https://www.garnishmusicproduction.com/academy/electronic-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/logic-pro-training-logic-pro-training-london/",
    "destination": "https://www.garnishmusicproduction.com/courses/logic-course-london/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/complete-music-production-program/",
    "destination": "https://www.garnishmusicproduction.com/academy/songwriting-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/sound-engineering-courses-london/",
    "destination": "https://www.garnishmusicproduction.com/courses/electronic-emp/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/computer-games-a-new-era-for-sound-design-and-music/",
    "destination": "https://www.garnishmusicproduction.com/courses/electronic-emp/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/download-reaktor-5-synth-ensembles-from-edm-course-free/",
    "destination": "https://www.garnishmusicproduction.com/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/music-theory-practice-chord-progressions-keys-and-scales/",
    "destination": "https://www.garnishmusicproduction.com/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "test/",
    "destination": "https://www.garnishmusicproduction.com/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/music-production-schools-student-from-copenhagen-denmark/",
    "destination": "https://www.garnishmusicproduction.com/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/edm-electronic-dance-music-production-envelopes-and-adsr/",
    "destination": "https://www.garnishmusicproduction.com/academy/electronic-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/music-production-schools-student-from-copenhagen-denmark/ ",
    "destination": "https://www.garnishmusicproduction.com/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "contact-dg",
    "destination": "https://edu.garnishmusicproduction.com/contact-mgmt",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "online-school",
    "destination": "https://edu.garnishmusicproduction.com/live-online/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "feedback",
    "destination": "https://edu.garnishmusicproduction.com/feedback-new",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "schedule",
    "destination": "https://edu.garnishmusicproduction.com/connect/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "\" \\t \"_blank",
    "destination": "https://www.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "training/ableton-course-london/",
    "destination": "https://www.garnishmusicproduction.com/courses/ableton-live-course-london/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "training/logic-course-london/",
    "destination": "https://www.garnishmusicproduction.com/courses/logic-pro-x-course-london/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "training/summer-camp-school/",
    "destination": "https://www.garnishmusicproduction.com/courses/school-summer-camp/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "training/sound-design-course/",
    "destination": "https://www.garnishmusicproduction.com/courses/sound-design-and-synthesis/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "grades/",
    "destination": "https://www.garnishmusicproduction.com/music-production-grades/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "academy/electronic-music-producer/",
    "destination": "https://www.garnishmusicproduction.com/academy/electronic-music-production/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/music-production-school-contact/",
    "destination": "https://www.garnishmusicproduction.com/contact-map/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "wp-signup.php?new=la-1.garnishmusicproduction.com",
    "destination": "https://la.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "courses/underground-dj-course/",
    "destination": "https://ny.garnishmusicproduction.com/courses/electronic-dj-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "contact-dg/",
    "destination": "https://edu.garnishmusicproduction.com/contact-mgmt/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "music-production-private-tuition/",
    "destination": "https://www.garnishmusicproduction.com/bespoke-private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "contact-us-manhattan",
    "destination": "https://ny.garnishmusicproduction.com/contact-map/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "www"
  },
  {
    "source": "programs/emp-electronic-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/emp-electronic-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bcn"
  },
  {
    "source": "programs/songwriting-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/songwriting-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bcn"
  },
  {
    "source": "training/how-to-dj-101/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-dj-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bcn"
  },
  {
    "source": "ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bcn"
  },
  {
    "source": "logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bcn"
  },
  {
    "source": "music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bcn"
  },
  {
    "source": "training/music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bcn"
  },
  {
    "source": "dip-pay/",
    "destination": "https://la.garnishmusicproduction.com/product/academy-payments/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bcn"
  },
  {
    "source": "training/sound-design-synthesis/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-music-emp",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bcn"
  },
  {
    "source": "online-final-cut-courses/",
    "destination": "https://la.garnishmusicproduction.com/training/final-cut",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bcn"
  },
  {
    "source": "training/",
    "destination": "/courses/",
    "statusCode": 301,
    "comparison": "regex",
    "subdomain": "bcn"
  },
  {
    "source": "courses/ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bcn"
  },
  {
    "source": "courses/logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bcn"
  },
  {
    "source": "schedule",
    "destination": "https://edu.garnishmusicproduction.com/connect/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bcn"
  },
  {
    "source": "programs/emp-electronic-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/emp-electronic-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ber"
  },
  {
    "source": "programs/songwriting-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/songwriting-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ber"
  },
  {
    "source": "training/how-to-dj-101/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-dj-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ber"
  },
  {
    "source": "ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ber"
  },
  {
    "source": "logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ber"
  },
  {
    "source": "music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ber"
  },
  {
    "source": "training/music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ber"
  },
  {
    "source": "dip-pay/",
    "destination": "https://la.garnishmusicproduction.com/product/academy-payments/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ber"
  },
  {
    "source": "training/sound-design-synthesis/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-music-emp",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ber"
  },
  {
    "source": "online-final-cut-courses/",
    "destination": "https://la.garnishmusicproduction.com/training/final-cut",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ber"
  },
  {
    "source": "training/",
    "destination": "/courses/",
    "statusCode": 301,
    "comparison": "regex",
    "subdomain": "ber"
  },
  {
    "source": "courses/ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ber"
  },
  {
    "source": "courses/logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ber"
  },
  {
    "source": "schedule",
    "destination": "https://edu.garnishmusicproduction.com/connect/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ber"
  },
  {
    "source": "programs/ableton-producer-program/",
    "destination": "https://ber.garnishmusicproduction.com/ableton-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ber"
  },
  {
    "source": "programs/emp-electronic-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/emp-electronic-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bh"
  },
  {
    "source": "programs/songwriting-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/songwriting-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bh"
  },
  {
    "source": "training/how-to-dj-101/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-dj-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bh"
  },
  {
    "source": "ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bh"
  },
  {
    "source": "logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bh"
  },
  {
    "source": "music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bh"
  },
  {
    "source": "training/music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bh"
  },
  {
    "source": "dip-pay/",
    "destination": "https://la.garnishmusicproduction.com/product/academy-payments/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bh"
  },
  {
    "source": "training/sound-design-synthesis/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-music-emp",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bh"
  },
  {
    "source": "online-final-cut-courses/",
    "destination": "https://la.garnishmusicproduction.com/training/final-cut",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bh"
  },
  {
    "source": "training/",
    "destination": "/courses/",
    "statusCode": 301,
    "comparison": "regex",
    "subdomain": "bh"
  },
  {
    "source": "courses/ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bh"
  },
  {
    "source": "courses/logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bh"
  },
  {
    "source": "schedule",
    "destination": "https://edu.garnishmusicproduction.com/connect/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "bh"
  },
  {
    "source": "training/",
    "destination": "/courses/",
    "statusCode": 301,
    "comparison": "regex",
    "subdomain": "edu"
  },
  {
    "source": "music/ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "schedule",
    "destination": "https://edu.garnishmusicproduction.com/contact/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/ldn/",
    "destination": "https://garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/sf/",
    "destination": "https://sf.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/la/",
    "destination": "https://la.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/nsh/",
    "destination": "https://nsh.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/ny/",
    "destination": "https://ny.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/mia/",
    "destination": "https://mia.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/ber/",
    "destination": "https://ber.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/hk/",
    "destination": "https://hk.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/specials/",
    "destination": "https://edu.garnishmusicproduction.com/live-online/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "feedback",
    "destination": "https://www.google.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "schedule",
    "destination": "https://edu.garnishmusicproduction.com/connect/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "contact/",
    "destination": "https://edu.garnishmusicproduction.com/connect/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/electronic-essentials/",
    "destination": "https://edu.garnishmusicproduction.com/music/sound-art",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "live-online",
    "destination": "https://edu.garnishmusicproduction.com/online-music-production/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "uk-bachelors-degree/",
    "destination": "college-batchelors-degree",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/houston/",
    "destination": "https://hou.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/barcelona/",
    "destination": "https://bcn.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/lisbon/",
    "destination": "https://lis.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/tokyo/",
    "destination": "https://tyo.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "music/syd/",
    "destination": "https://syd.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "ba",
    "destination": "https://edu.garnishmusicproduction.com/connect",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "edu"
  },
  {
    "source": "programs/emp-electronic-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/emp-electronic-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hk"
  },
  {
    "source": "programs/songwriting-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/songwriting-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hk"
  },
  {
    "source": "training/how-to-dj-101/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-dj-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hk"
  },
  {
    "source": "ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hk"
  },
  {
    "source": "logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hk"
  },
  {
    "source": "music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hk"
  },
  {
    "source": "training/music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hk"
  },
  {
    "source": "dip-pay/",
    "destination": "https://la.garnishmusicproduction.com/product/academy-payments/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hk"
  },
  {
    "source": "training/sound-design-synthesis/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-music-emp",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hk"
  },
  {
    "source": "online-final-cut-courses/",
    "destination": "https://la.garnishmusicproduction.com/training/final-cut",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hk"
  },
  {
    "source": "training/",
    "destination": "/courses/",
    "statusCode": 301,
    "comparison": "regex",
    "subdomain": "hk"
  },
  {
    "source": "courses/ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hk"
  },
  {
    "source": "courses/logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hk"
  },
  {
    "source": "schedule",
    "destination": "https://edu.garnishmusicproduction.com/connect/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hk"
  },
  {
    "source": "programs/emp-electronic-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/emp-electronic-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hou"
  },
  {
    "source": "programs/songwriting-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/songwriting-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hou"
  },
  {
    "source": "training/how-to-dj-101/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-dj-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hou"
  },
  {
    "source": "ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hou"
  },
  {
    "source": "logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hou"
  },
  {
    "source": "music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hou"
  },
  {
    "source": "training/music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hou"
  },
  {
    "source": "dip-pay/",
    "destination": "https://la.garnishmusicproduction.com/product/academy-payments/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hou"
  },
  {
    "source": "training/sound-design-synthesis/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-music-emp",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hou"
  },
  {
    "source": "online-final-cut-courses/",
    "destination": "https://la.garnishmusicproduction.com/training/final-cut",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hou"
  },
  {
    "source": "training/",
    "destination": "/courses/",
    "statusCode": 301,
    "comparison": "regex",
    "subdomain": "hou"
  },
  {
    "source": "courses/ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hou"
  },
  {
    "source": "courses/logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hou"
  },
  {
    "source": "schedule",
    "destination": "https://edu.garnishmusicproduction.com/connect/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "hou"
  },
  {
    "source": "programs/emp-electronic-music-producer",
    "destination": "https://la.garnishmusicproduction.com/academy/emp-electronic-music-producer",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "programs/songwriting-music-producer",
    "destination": "https://la.garnishmusicproduction.com/academy/songwriting-music-producer",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "training/how-to-dj-101",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-dj-course",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "ableton-producer-program",
    "destination": "https://la.garnishmusicproduction.com/courses/ableton-producer-program",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "logic-producer-program",
    "destination": "https://la.garnishmusicproduction.com/courses/logic-producer-program",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-instruction",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "training/music-production-private-tuition",
    "destination": "https://la.garnishmusicproduction.com/private-instruction",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "dip-pay",
    "destination": "https://la.garnishmusicproduction.com/product/academy-payments/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "training/sound-design-synthesis",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-music-emp",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "online-final-cut-courses/",
    "destination": "https://la.garnishmusicproduction.com/training/final-cut",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "training/",
    "destination": "/courses/",
    "statusCode": 301,
    "comparison": "regex",
    "subdomain": "la"
  },
  {
    "source": "courses/ableton-producer-program",
    "destination": "https://la.garnishmusicproduction.com/programs/ableton-producer-program",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "courses/logic-producer-program",
    "destination": "https://la.garnishmusicproduction.com/programs/logic-producer-program",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "macos-support-essentials",
    "destination": "https://la.garnishmusicproduction.com/courses/macos-support-essentials",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "private-tuition",
    "destination": "https://la.garnishmusicproduction.com/private-instruction",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "courses/music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-instruction",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "interactive-live-streaming/",
    "destination": "https://la.garnishmusicproduction.com/remote-attendance/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "private-tuition/",
    "destination": "private-instruction",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "remote-attendance/",
    "destination": "https://edu.garnishmusicproduction.com/live-online/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "emp-electronic-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "songwriting-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "academy-payments",
    "destination": "https://edu.garnishmusicproduction.com/academy-payments/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "schedule",
    "destination": "https://la.garnishmusicproduction.com/los-angeles-la-contact-map/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "academy/emp-electronic-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "programs/emp-electronic-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "la"
  },
  {
    "source": "programs/emp-electronic-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/emp-electronic-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "lis"
  },
  {
    "source": "programs/songwriting-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/songwriting-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "lis"
  },
  {
    "source": "training/how-to-dj-101/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-dj-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "lis"
  },
  {
    "source": "ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "lis"
  },
  {
    "source": "logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "lis"
  },
  {
    "source": "music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "lis"
  },
  {
    "source": "training/music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "lis"
  },
  {
    "source": "dip-pay/",
    "destination": "https://la.garnishmusicproduction.com/product/academy-payments/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "lis"
  },
  {
    "source": "training/sound-design-synthesis/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-music-emp",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "lis"
  },
  {
    "source": "online-final-cut-courses/",
    "destination": "https://la.garnishmusicproduction.com/training/final-cut",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "lis"
  },
  {
    "source": "training/",
    "destination": "/courses/",
    "statusCode": 301,
    "comparison": "regex",
    "subdomain": "lis"
  },
  {
    "source": "courses/ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "lis"
  },
  {
    "source": "courses/logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "lis"
  },
  {
    "source": "schedule",
    "destination": "https://edu.garnishmusicproduction.com/connect/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "lis"
  },
  {
    "source": "programs/emp-electronic-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/emp-electronic-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "programs/songwriting-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/songwriting-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "training/how-to-dj-101/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-dj-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "training/music-production-private-tuition/",
    "destination": "https://mia.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "dip-pay/",
    "destination": "https://la.garnishmusicproduction.com/product/academy-payments/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "training/sound-design-synthesis/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-music-emp",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "online-final-cut-courses/",
    "destination": "https://la.garnishmusicproduction.com/training/final-cut",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "training/",
    "destination": "/courses/",
    "statusCode": 301,
    "comparison": "regex",
    "subdomain": "mia"
  },
  {
    "source": "courses/ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "courses/logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "schedule",
    "destination": "https://edu.garnishmusicproduction.com/connect/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "mia"
  },
  {
    "source": "training/",
    "destination": "/courses/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "nsh"
  },
  {
    "source": "courses/emp-electronic-music-production/",
    "destination": "https://nsh.garnishmusicproduction.com/courses/sound-design-synthesis/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "nsh"
  },
  {
    "source": "private-tuition",
    "destination": "https://nsh.garnishmusicproduction.com/private-instruction/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "nsh"
  },
  {
    "source": "schedule",
    "destination": "https://edu.garnishmusicproduction.com/connect/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "nsh"
  },
  {
    "source": "programs/emp-electronic-music-producer",
    "destination": "https://ny.garnishmusicproduction.com/academy/emp-electronic-music-producer",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "programs/songwriting-music-producer",
    "destination": "https://ny.garnishmusicproduction.com/academy/songwriting-music-producer",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "private-tuition",
    "destination": "https://ny.garnishmusicproduction.com/private-instruction",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "private-tuition/",
    "destination": "https://ny.garnishmusicproduction.com/private-instruction",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "interactive-streaming/",
    "destination": "https://ny.garnishmusicproduction.com/remote-attendance/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "online-school/",
    "destination": "https://ny.garnishmusicproduction.com/remote-attendance/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "contact-dg/",
    "destination": "https://edu.garnishmusicproduction.com/contact-mgmt",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "remote-attendance/",
    "destination": "https://edu.garnishmusicproduction.com/live-online/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "emp-electronic-music-producer/",
    "destination": "https://ny.garnishmusicproduction.com/music-production-academy/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "songwriting-music-producer/",
    "destination": "https://ny.garnishmusicproduction.com/music-production-academy/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "academy-payments",
    "destination": "https://edu.garnishmusicproduction.com/academy-payments/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "\" \\t \"_blank",
    "destination": "https://ny.garnishmusicproduction.com",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "schedule",
    "destination": "https://ny.garnishmusicproduction.com/contact-map/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "academy-program/",
    "destination": "https://ny.garnishmusicproduction.com/music-production-academy/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "free-beginners-music-production-class/",
    "destination": "https://ny.garnishmusicproduction.com/courses/free-beginners-music-production-open-house/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "product/logic-course/",
    "destination": "https://ny.garnishmusicproduction.com/courses/logic-pro/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "bkaug/",
    "destination": "https://ny.garnishmusicproduction.com/ableton-user-group-meeting-8-31/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "courses/electronic-dj-course/",
    "destination": "https://ny.garnishmusicproduction.com/product/electronic-dj-class/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "courses/underground-dj-course/",
    "destination": "https://ny.garnishmusicproduction.com/product/electronic-dj-class/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "ny"
  },
  {
    "source": "programs/emp-electronic-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/emp-electronic-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "pdx"
  },
  {
    "source": "programs/songwriting-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/songwriting-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "pdx"
  },
  {
    "source": "training/how-to-dj-101/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-dj-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "pdx"
  },
  {
    "source": "ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "pdx"
  },
  {
    "source": "logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "pdx"
  },
  {
    "source": "music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "pdx"
  },
  {
    "source": "training/music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "pdx"
  },
  {
    "source": "dip-pay/",
    "destination": "https://la.garnishmusicproduction.com/product/academy-payments/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "pdx"
  },
  {
    "source": "training/sound-design-synthesis/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-music-emp",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "pdx"
  },
  {
    "source": "online-final-cut-courses/",
    "destination": "https://la.garnishmusicproduction.com/training/final-cut",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "pdx"
  },
  {
    "source": "training/",
    "destination": "/courses/",
    "statusCode": 301,
    "comparison": "regex",
    "subdomain": "pdx"
  },
  {
    "source": "courses/ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "pdx"
  },
  {
    "source": "courses/logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "pdx"
  },
  {
    "source": "schedule",
    "destination": "https://edu.garnishmusicproduction.com/connect/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "pdx"
  },
  {
    "source": "programs/emp-electronic-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/emp-electronic-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sea"
  },
  {
    "source": "programs/songwriting-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/songwriting-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sea"
  },
  {
    "source": "training/how-to-dj-101/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-dj-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sea"
  },
  {
    "source": "ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sea"
  },
  {
    "source": "logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sea"
  },
  {
    "source": "music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sea"
  },
  {
    "source": "training/music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sea"
  },
  {
    "source": "dip-pay/",
    "destination": "https://la.garnishmusicproduction.com/product/academy-payments/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sea"
  },
  {
    "source": "training/sound-design-synthesis/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-music-emp",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sea"
  },
  {
    "source": "online-final-cut-courses/",
    "destination": "https://la.garnishmusicproduction.com/training/final-cut",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sea"
  },
  {
    "source": "training/",
    "destination": "/courses/",
    "statusCode": 301,
    "comparison": "regex",
    "subdomain": "sea"
  },
  {
    "source": "courses/ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sea"
  },
  {
    "source": "courses/logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sea"
  },
  {
    "source": "schedule",
    "destination": "https://edu.garnishmusicproduction.com/connect/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sea"
  },
  {
    "source": "music/ableton-live-course/",
    "destination": "https://sea.garnishmusicproduction.com/music/ableton-live/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sea"
  },
  {
    "source": "music/logic-course/",
    "destination": "https://sea.garnishmusicproduction.com/music/logic-pro/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sea"
  },
  {
    "source": "music/mixing-mastering-course/",
    "destination": "https://sea.garnishmusicproduction.com/music/mixing-mastering/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sea"
  },
  {
    "source": "workshops",
    "destination": "/special-workshops",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sf"
  },
  {
    "source": "schedule",
    "destination": "https://docs.google.com/forms/d/e/1FAIpQLSd7XqCr9T2qcphZmiHlS_tlcaRqWfNUREOdaI5JXGMEBMFkfQ/viewform?usp=pp_url&entry.1273755747=San+Francisco&entry.1966647463=SF&entry.777722302=sub%3DSF",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sf"
  },
  {
    "source": "training/",
    "destination": "/courses/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sg"
  },
  {
    "source": "courses/emp-electronic-music-production/",
    "destination": "https://sg.garnishmusicproduction.com/courses/sound-design-synthesis/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sg"
  },
  {
    "source": "private-tuition",
    "destination": "https://sg.garnishmusicproduction.com/private-instruction/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sg"
  },
  {
    "source": "schedule",
    "destination": "https://edu.garnishmusicproduction.com/connect/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "sg"
  },
  {
    "source": "programs/emp-electronic-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/emp-electronic-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "tyo"
  },
  {
    "source": "programs/songwriting-music-producer/",
    "destination": "https://la.garnishmusicproduction.com/academy/songwriting-music-producer/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "tyo"
  },
  {
    "source": "training/how-to-dj-101/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-dj-course/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "tyo"
  },
  {
    "source": "ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "tyo"
  },
  {
    "source": "logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/courses/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "tyo"
  },
  {
    "source": "music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "tyo"
  },
  {
    "source": "training/music-production-private-tuition/",
    "destination": "https://la.garnishmusicproduction.com/private-tuition/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "tyo"
  },
  {
    "source": "dip-pay/",
    "destination": "https://la.garnishmusicproduction.com/product/academy-payments/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "tyo"
  },
  {
    "source": "training/sound-design-synthesis/",
    "destination": "https://la.garnishmusicproduction.com/training/electronic-music-emp",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "tyo"
  },
  {
    "source": "online-final-cut-courses/",
    "destination": "https://la.garnishmusicproduction.com/training/final-cut",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "tyo"
  },
  {
    "source": "training/",
    "destination": "/courses/",
    "statusCode": 301,
    "comparison": "regex",
    "subdomain": "tyo"
  },
  {
    "source": "courses/ableton-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/ableton-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "tyo"
  },
  {
    "source": "courses/logic-producer-program/",
    "destination": "https://la.garnishmusicproduction.com/programs/logic-producer-program/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "tyo"
  },
  {
    "source": "schedule",
    "destination": "https://edu.garnishmusicproduction.com/connect/",
    "statusCode": 301,
    "comparison": "exact",
    "subdomain": "tyo"
  }
];



// Build optimized lookup maps for instant middleware execution
const rawExactMap = new Map<string, string>();
const rawSubdomainMap = new Map<string, string>();

for (const rule of RANK_MATH_REDIRECTS) {
  const normalized = rule.source.replace(/^\//, '');
  const targetMap = (rule.subdomain && rule.subdomain !== 'www') ? rawSubdomainMap : rawExactMap;
  const prefix = (rule.subdomain && rule.subdomain !== 'www') ? `${rule.subdomain}:` : '';

  // Higher priority rules (earlier in list) take precedence
  if (!targetMap.has(`${prefix}${normalized}`)) targetMap.set(`${prefix}${normalized}`, rule.destination);
  if (!targetMap.has(`${prefix}/${normalized}`)) targetMap.set(`${prefix}/${normalized}`, rule.destination);

  if (normalized.endsWith('/')) {
    const noTrailing = normalized.slice(0, -1);
    if (!targetMap.has(`${prefix}${noTrailing}`)) targetMap.set(`${prefix}${noTrailing}`, rule.destination);
    if (!targetMap.has(`${prefix}/${noTrailing}`)) targetMap.set(`${prefix}/${noTrailing}`, rule.destination);
  } else {
    if (!targetMap.has(`${prefix}${normalized}/`)) targetMap.set(`${prefix}${normalized}/`, rule.destination);
    if (!targetMap.has(`${prefix}/${normalized}/`)) targetMap.set(`${prefix}/${normalized}/`, rule.destination);
  }
}

// Intelligent Cycle Detector & Chain Flattener
function resolveRedirect(source: string, map: Map<string, string>, visited = new Set<string>()): string | null {
  if (visited.has(source)) return null; // CYCLE DETECTED!
  visited.add(source);
  const dest = map.get(source);
  if (!dest) return null; // End of chain

  // If destination is absolute, we treat it as an endpoint
  if (dest.startsWith('http')) return dest;

  // Otherwise, follow the chain
  const nextDest = resolveRedirect(dest, map, visited) || resolveRedirect(dest.replace(/^\//, ''), map, visited);
  return nextDest || dest;
}

export const exactRedirectMap = new Map<string, string>();
export const subdomainRedirectMap = new Map<string, string>();

for (const [key, value] of rawExactMap.entries()) {
  const resolved = resolveRedirect(key, rawExactMap);
  if (resolved) exactRedirectMap.set(key, resolved);
}

for (const [key, value] of rawSubdomainMap.entries()) {
  const resolved = resolveRedirect(key, rawSubdomainMap);
  if (resolved) subdomainRedirectMap.set(key, resolved);
}
/**
 * Checks if the given pathname, search query, and subdomain match any 301 redirect rule.
 */
export function getRankMathRedirect(pathname: string, search: string = '', subdomain: string = 'www'): string | null {
  // Check attachment / upload path redirects (e.g. ?attachment_id=... or /attachment/)
  if (search.includes('attachment_id=') || pathname.startsWith('/attachment/')) {
    const subSettings = RANK_MATH_SUBDOMAIN_SETTINGS[subdomain] || RANK_MATH_SUBDOMAIN_SETTINGS['www'];
    if (subSettings && subSettings.attachmentRedirectUrls) {
      return subSettings.attachmentRedirectDefault;
    }
  }

  const pathWithoutLeading = pathname.replace(/^\//, '');
  const pathWithQuery = `${pathWithoutLeading}${search}`;
  const fullPathWithQuery = `${pathname}${search}`;

  // 1. Check subdomain-specific exact rules first
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

  // 3. Fallback check for regex and contains rules across subdomains
  for (const rule of RANK_MATH_REDIRECTS) {
    if (rule.comparison === 'regex' || rule.comparison === 'contains') {
      if (rule.subdomain && rule.subdomain !== 'www' && rule.subdomain !== subdomain) {
        continue;
      }
      try {
        const pattern = rule.source.replace(/^\//, '');
        if (rule.comparison === 'contains' && (fullPathWithQuery.includes(pattern) || pathWithoutLeading.includes(pattern))) {
          return rule.destination;
        }
        if (rule.comparison === 'regex') {
          const regex = new RegExp(rule.source.replace(/^\//, ''), 'i');
          if (regex.test(pathWithoutLeading) || regex.test(pathname) || regex.test(pathWithQuery)) {
            return rule.destination;
          }
        }
      } catch (e) {
        // ignore invalid regex patterns
      }
    }
  }

  return null;
}

/**
 * Returns deduplicated Next.js config `redirects()` items so edge routing and builds never break.
 */
export function getNextConfigRedirects() {
  const seenSources = new Set<string>();
  const results: any[] = [];

  for (const rule of RANK_MATH_REDIRECTS) {
    // Skip regex rules in static config (middleware handles regex dynamically across subdomains)
    if (rule.comparison === 'regex') continue;

    // Skip cross-domain redirects in static config so middleware can translate them for localhost
    if (rule.destination.includes('garnishmusicproduction.com')) continue;

    if (rule.source.includes('?')) {
      const [pathPart, queryPart] = rule.source.split('?');
      const params = new URLSearchParams(queryPart);
      const has = Array.from(params.entries()).map(([key, value]) => ({
        type: 'query' as const,
        key,
        value,
      }));

      const sourcePath = pathPart.startsWith('/') ? pathPart : `/${pathPart}`;
      const cleanSourcePath = sourcePath.endsWith('/') && sourcePath !== '/' ? sourcePath.slice(0, -1) : sourcePath;
      const dedupeKey = `${cleanSourcePath}?${queryPart}`;
      if (!seenSources.has(dedupeKey)) {
        seenSources.add(dedupeKey);
        results.push({
          source: cleanSourcePath,
          has,
          destination: rule.destination,
          permanent: rule.statusCode === 301,
        });
      }
    } else {
      const cleanSource = rule.source.replace(/^\//, '');
      const cleanNoTrailing = cleanSource.replace(/\/$/, '');
      const sourcePath = `/${cleanNoTrailing}`;
      if (!seenSources.has(sourcePath) && sourcePath !== '/') {
        seenSources.add(sourcePath);
        results.push({
          source: sourcePath,
          destination: rule.destination,
          permanent: rule.statusCode === 301,
        });
      }
    }
  }

  return results;
}
