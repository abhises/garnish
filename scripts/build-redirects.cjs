const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const dataRedirectsDir = path.join(rootDir, "src/data/redirects");
const redirect301Dir = path.join(rootDir, "redirect301");

// Find JSON files in rootDir
const rootJsonFiles = fs.readdirSync(rootDir).filter(f => 
  (f.startsWith("rank-math-settings-") || f.startsWith("redirection-")) && f.endsWith(".json")
).map(f => path.join(rootDir, f));

// Find JSON files in src/data/redirects/
let dataJsonFiles = [];
if (fs.existsSync(dataRedirectsDir)) {
  dataJsonFiles = fs.readdirSync(dataRedirectsDir)
    .filter(f => f.endsWith(".json"))
    .map(f => path.join(dataRedirectsDir, f));
}

// Find JSON files in redirect301/
let redirect301Files = [];
if (fs.existsSync(redirect301Dir)) {
  redirect301Files = fs.readdirSync(redirect301Dir)
    .filter(f => f.endsWith(".json"))
    .map(f => path.join(redirect301Dir, f));
}

const allFiles = [...dataJsonFiles, ...redirect301Files, ...rootJsonFiles];
const subdomains = {};
const allRedirections = [];
const seen = new Set();

allFiles.forEach(filePath => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    console.error(`Failed to parse ${filePath}:`, e.message);
    return;
  }

  const fileName = path.basename(filePath);

  // 1. Process baseline or rank-math settings structure
  if (data.subdomains) {
    Object.assign(subdomains, data.subdomains);
  } else {
    const attachRedirect = data.general?.attachment_redirect_default || "";
    const name = data.titles?.knowledgegraph_name || data.titles?.website_name || "";
    if (attachRedirect || name) {
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
    }
  }

  // 2. Process redirects array
  if (Array.isArray(data.redirections || data.redirects)) {
    const list = data.redirections || data.redirects;
    
    // Check if it's WordPress Redirection plugin export vs Rank Math / baseline format
    if (list.length > 0 && ('action_code' in list[0] || 'match_type' in list[0] || 'url' in list[0])) {
      // WordPress Redirection plugin format
      let sub = "www";
      const subMatch = fileName.match(/^redirection-([a-z0-9]+)-garnish/i) || fileName.match(/redirection-([a-z0-9]+)-/i);
      if (subMatch && subMatch[1] !== "www") {
        sub = subMatch[1];
      }
      if (sub === "edu-1") sub = "edu";

      // Ensure subdomain exists in subdomains settings
      if (!subdomains[sub]) {
        subdomains[sub] = {
          subdomain: sub,
          websiteName: `Garnish Music Production School | ${sub.toUpperCase()}`,
          attachmentRedirectUrls: true,
          attachmentRedirectDefault: `https://${sub === "www" ? "www" : sub}.garnishmusicproduction.com`
        };
      }

      list.forEach(r => {
        if (r.enabled === false) return;
        const code = parseInt(r.action_code || "301", 10);
        if (code !== 301 && code !== 302) return;

        let destination = "";
        if (r.match_type === "server" && r.action_data?.url_from) {
          destination = r.action_data.url_from;
        } else if (r.action_data?.url) {
          destination = r.action_data.url;
        }

        if (!destination) return;
        let source = r.url || r.match_url || "";
        if (!source) return;

        const cleanSource = source.replace(/^\//, '');
        // Skip self-redirects
        if (destination === source || destination === `/${cleanSource}` || destination.replace(/^https?:\/\/[^\/]+/, '') === `/${cleanSource}`) {
          return;
        }

        const comparison = r.regex ? "regex" : "exact";
        const key = `${sub}:${cleanSource}:${destination}`;
        if (!seen.has(key)) {
          seen.add(key);
          allRedirections.push({
            source: cleanSource,
            destination,
            statusCode: code,
            comparison,
            subdomain: sub
          });
        }
      });
    } else {
      // Rank Math / baseline format (`source`, `destination`, etc.)
      list.forEach(r => {
        const pattern = r.source || (r.sources?.match(/s:7:"pattern";s:\d+:"([^"]+)";s:10:"comparison";s:\d+:"([^"]+)"/) ? r.sources.match(/s:7:"pattern";s:\d+:"([^"]+)";s:10:"comparison";s:\d+:"([^"]+)"/)[1] : r.sources);
        const destination = r.destination || r.url_to;
        const comparison = r.comparison || (r.sources?.match(/s:7:"pattern";s:\d+:"([^"]+)";s:10:"comparison";s:\d+:"([^"]+)"/) ? r.sources.match(/s:7:"pattern";s:\d+:"([^"]+)";s:10:"comparison";s:\d+:"([^"]+)"/)[2] : "exact");
        const sub = r.subdomain || "www";
        const code = parseInt(r.statusCode || r.header_code || "301", 10);

        if (!pattern || !destination) return;
        const cleanSource = pattern.replace(/^\//, '');
        const key = `${sub}:${cleanSource}:${destination}`;
        if (!seen.has(key)) {
          seen.add(key);
          allRedirections.push({
            source: cleanSource,
            destination,
            statusCode: code,
            comparison,
            subdomain: sub
          });
        }
      });
    }
  }
});

// Ensure default www subdomain exists
if (!subdomains["www"]) {
  subdomains["www"] = {
    subdomain: "www",
    websiteName: "Garnish Music Production School | San Francisco Bay",
    attachmentRedirectUrls: true,
    attachmentRedirectDefault: "https://www.garnishmusicproduction.com"
  };
}

const code = `// 301 Redirections imported across all 17 subdomains from Rank Math & WordPress Redirection plugin JSON exports
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

  // Higher priority rules (earlier in list) take precedence
  if (!targetMap.has(\`\${prefix}\${normalized}\`)) targetMap.set(\`\${prefix}\${normalized}\`, rule.destination);
  if (!targetMap.has(\`\${prefix}/\${normalized}\`)) targetMap.set(\`\${prefix}/\${normalized}\`, rule.destination);

  if (normalized.endsWith('/')) {
    const noTrailing = normalized.slice(0, -1);
    if (!targetMap.has(\`\${prefix}\${noTrailing}\`)) targetMap.set(\`\${prefix}\${noTrailing}\`, rule.destination);
    if (!targetMap.has(\`\${prefix}/\${noTrailing}\`)) targetMap.set(\`\${prefix}/\${noTrailing}\`, rule.destination);
  } else {
    if (!targetMap.has(\`\${prefix}\${normalized}/\`)) targetMap.set(\`\${prefix}\${normalized}/\`, rule.destination);
    if (!targetMap.has(\`\${prefix}/\${normalized}/\`)) targetMap.set(\`\${prefix}/\${normalized}/\`, rule.destination);
  }
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

  const pathWithoutLeading = pathname.replace(/^\\//, '');
  const pathWithQuery = \`\${pathWithoutLeading}\${search}\`;
  const fullPathWithQuery = \`\${pathname}\${search}\`;

  // 1. Check subdomain-specific exact rules first
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

  // 3. Fallback check for regex and contains rules across subdomains
  for (const rule of RANK_MATH_REDIRECTS) {
    if (rule.comparison === 'regex' || rule.comparison === 'contains') {
      if (rule.subdomain && rule.subdomain !== 'www' && rule.subdomain !== subdomain) {
        continue;
      }
      try {
        const pattern = rule.source.replace(/^\\//, '');
        if (rule.comparison === 'contains' && (fullPathWithQuery.includes(pattern) || pathWithoutLeading.includes(pattern))) {
          return rule.destination;
        }
        if (rule.comparison === 'regex') {
          const regex = new RegExp(rule.source.replace(/^\\//, ''), 'i');
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
 * Returns deduplicated Next.js config \`redirects()\` items so edge routing and builds never break.
 */
export function getNextConfigRedirects() {
  const seenSources = new Set<string>();
  const results: any[] = [];

  for (const rule of RANK_MATH_REDIRECTS) {
    // Skip regex rules in static config (middleware handles regex dynamically across subdomains)
    if (rule.comparison === 'regex') continue;

    if (rule.source.includes('?')) {
      const [pathPart, queryPart] = rule.source.split('?');
      const params = new URLSearchParams(queryPart);
      const has = Array.from(params.entries()).map(([key, value]) => ({
        type: 'query' as const,
        key,
        value,
      }));

      const sourcePath = pathPart.startsWith('/') ? pathPart : \`/\${pathPart}\`;
      const cleanSourcePath = sourcePath.endsWith('/') && sourcePath !== '/' ? sourcePath.slice(0, -1) : sourcePath;
      const dedupeKey = \`\${cleanSourcePath}?\${queryPart}\`;
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
      const cleanSource = rule.source.replace(/^\\//, '');
      const cleanNoTrailing = cleanSource.replace(/\\/$/, '');
      const sourcePath = \`/\${cleanNoTrailing}\`;
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
`;

const outputPath = path.join(rootDir, "src/lib/redirects.ts");
fs.writeFileSync(outputPath, code, "utf8");
console.log(`Successfully generated src/lib/redirects.ts with ${Object.keys(subdomains).length} subdomains and ${allRedirections.length} redirections.`);
