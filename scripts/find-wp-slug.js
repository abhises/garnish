const subdomains = [
  'www', 'la', 'ny', 'nsh', 'ber', 'hk', 'mia', 'edu',
  'tyo', 'sea', 'bcn', 'mrb', 'hou', 'syd', 'av', 'lis', 'sf', 'sg', 'bh', 'pdx'
];

async function checkSubdomain(subdomain) {
  const baseDomain = 'garnishmusicproduction.com';
  const apiUrl = subdomain === 'www' || subdomain === ''
    ? `https://www.${baseDomain}/wp-json`
    : `https://${subdomain}.${baseDomain}/wp-json`;

  const endpoints = ['pages', 'posts', 'product'];

  for (const endpoint of endpoints) {
    try {
      const url = `${apiUrl}/wp/v2/${endpoint}?slug=school-summer-camp`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          console.log(`Found on subdomain: "${subdomain}", endpoint: "${endpoint}"`);
          console.log(`ID: ${data[0].id}, Title: ${data[0].title?.rendered || data[0].title}`);
          return true;
        }
      }
    } catch (e) {
      // Ignore errors
    }
  }
  return false;
}

async function main() {
  console.log('Searching for slug "school-summer-camp" across all subdomains in parallel...');
  const promises = subdomains.map(sub => checkSubdomain(sub));
  const results = await Promise.all(promises);
  const found = results.some(r => r === true);
  if (!found) {
    console.log('Slug "school-summer-camp" not found in any subdomain.');
  }
}

main().catch(console.error);
