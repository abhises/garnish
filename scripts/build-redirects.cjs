const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const files = fs.readdirSync(rootDir).filter(f => f.startsWith("rank-math-settings-") && f.endsWith(".json"));
files.sort();

const subdomains = {};
const allRedirections = [];
const seen = new Set();

files.forEach(f => {
  const filePath = path.join(rootDir, f);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const attachRedirect = data.general?.attachment_redirect_default || "";
  const name = data.titles?.knowledgegraph_name || data.titles?.website_name || "";
  
  let sub = "www";
  if (attachRedirect) {
    try {
      const u = new URL(attachRedirect);
      const hostParts = u.hostname.split(".");
      if (hostParts.length > 2 && hostParts[0] !== "www") {
        sub = hostParts[0];
      }
    } catch (e) {}
  }
  if (sub === "edu-1") sub = "edu";
  
  subdomains[sub] = {
    subdomain: sub,
    websiteName: name || `Garnish Music Production School (${sub})`,
    attachmentRedirectUrls: data.general?.attachment_redirect_urls === "on",
    attachmentRedirectDefault: attachRedirect || `https://${sub === "www" ? "www" : sub}.garnishmusicproduction.com`,
  };

  if (Array.isArray(data.redirections)) {
    data.redirections.forEach(r => {
      const match = r.sources?.match(/s:7:"pattern";s:\d+:"([^"]+)";s:10:"comparison";s:\d+:"([^"]+)"/);
      const pattern = match ? match[1] : r.sources;
      const comparison = match ? match[2] : "exact";
      const key = `${sub}:${pattern}:${r.url_to}`;
      if (!seen.has(key)) {
        seen.add(key);
        allRedirections.push({
          source: pattern,
          destination: r.url_to,
          statusCode: parseInt(r.header_code || "301", 10),
          comparison,
          subdomain: sub
        });
      }
    });
  }
});

const code = `// 301 Redirections imported from all Rank Math settings JSON exports across subdomains
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

export const RANK_MATH_SUBDOMAIN_SETTINGS: Record<string, SubdomainRankMathSettings> = ${JSON.stringify(subdomains, null, 2)};

export const RANK_MATH_REDIRECTS: RedirectRule[] = ${JSON.stringify(allRedirections, null, 2)};

// Build optimized lookup maps for instant middleware execution
const exactRedirectMap = new Map<string, string>();
const subdomainRedirectMap = new Map<string, string>();

for (const rule of RANK_MATH_REDIRECTS) {
  const normalized = rule.source.replace(/^\\//, '');
  const targetMap = (rule.subdomain && rule.subdomain !== 'www') ? subdomainRedirectMap : exactRedirectMap;
  const prefix = (rule.subdomain && rule.subdomain !== 'www') ? \`\${rule.subdomain}:\` : '';

  targetMap.set(\`\${prefix}\${normalized}\`, rule.destination);
  targetMap.set(\`\${prefix}/\${normalized}\`, rule.destination);

  if (normalized.endsWith('/')) {
    const noTrailing = normalized.slice(0, -1);
    targetMap.set(\`\${prefix}\${noTrailing}\`, rule.destination);
    targetMap.set(\`\${prefix}/\${noTrailing}\`, rule.destination);
  } else {
    targetMap.set(\`\${prefix}\${normalized}/\`, rule.destination);
    targetMap.set(\`\${prefix}/\${normalized}/\`, rule.destination);
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

  const pathWithoutLeading = pathname.replace(/^\\//, '');
  const pathWithQuery = \`\${pathWithoutLeading}\${search}\`;
  const fullPathWithQuery = \`\${pathname}\${search}\`;

  // 1. Check subdomain-specific rules first
  if (subdomain && subdomain !== 'www') {
    if (subdomainRedirectMap.has(\`\${subdomain}:\${pathWithQuery}\`)) {
      return subdomainRedirectMap.get(\`\${subdomain}:\${pathWithQuery}\`)!;
    }
    if (subdomainRedirectMap.has(\`\${subdomain}:\${fullPathWithQuery}\`)) {
      return subdomainRedirectMap.get(\`\${subdomain}:\${fullPathWithQuery}\`)!;
    }
    if (subdomainRedirectMap.has(\`\${subdomain}:\${pathname}\`)) {
      return subdomainRedirectMap.get(\`\${subdomain}:\${pathname}\`)!;
    }
    if (subdomainRedirectMap.has(\`\${subdomain}:\${pathWithoutLeading}\`)) {
      return subdomainRedirectMap.get(\`\${subdomain}:\${pathWithoutLeading}\`)!;
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
 * Returns Next.js config \`redirects()\` items.
 */
export function getNextConfigRedirects() {
  return RANK_MATH_REDIRECTS.map((rule) => {
    // If source contains query params, configure \`has\` matching
    if (rule.source.includes('?')) {
      const [pathPart, queryPart] = rule.source.split('?');
      const params = new URLSearchParams(queryPart);
      const has = Array.from(params.entries()).map(([key, value]) => ({
        type: 'query' as const,
        key,
        value,
      }));

      const sourcePath = pathPart.startsWith('/') ? pathPart : \`/\${pathPart}\`;
      return {
        source: sourcePath,
        has,
        destination: rule.destination,
        permanent: rule.statusCode === 301,
      };
    }

    // Standard pathname redirect
    const cleanSource = rule.source.replace(/^\\//, '');
    const cleanNoTrailing = cleanSource.replace(/\\/$/, '');
    return {
      source: \`/\${cleanNoTrailing}\`,
      destination: rule.destination,
      permanent: rule.statusCode === 301,
    };
  });
}
`;

const outputPath = path.join(rootDir, "src/lib/redirects.ts");
fs.writeFileSync(outputPath, code, "utf8");
console.log(`Successfully generated src/lib/redirects.ts with ${Object.keys(subdomains).length} subdomains and ${allRedirections.length} redirections.`);
