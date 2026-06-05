import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { payload } from "../src/services/ragDeflectionService";
import { renderDeflectionLab, renderDocs, renderKnowledgeLane, renderOverview, renderVerification } from "../src/services/render";

const siteDir = join(process.cwd(), "site");
const baseUrl = "http://deflect.kineticgain.com";

const pages = [
  { path: "/", html: renderOverview() },
  { path: "/knowledge-lane", html: renderKnowledgeLane() },
  { path: "/deflection-lab", html: renderDeflectionLab() },
  { path: "/verification", html: renderVerification() },
  { path: "/docs", html: renderDocs() }
];

const apiPayloads = [
  { path: "/api/sample/index.json", body: payload() },
  { path: "/api/dashboard/summary/index.json", body: payload().dashboard },
  { path: "/api/knowledge-lane/index.json", body: payload().knowledgeLane },
  { path: "/api/deflection-lab/index.json", body: payload().deflectionLab },
  { path: "/api/knowledge-artifacts/index.json", body: payload().artifacts },
  { path: "/api/verification/index.json", body: payload().verification }
];

function writeSiteFile(relativePath: string, content: string) {
  const target = join(siteDir, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content, "utf8");
}

rmSync(siteDir, { recursive: true, force: true });

for (const page of pages) {
  const relativePath = page.path === "/" ? "index.html" : `${page.path.slice(1)}/index.html`;
  writeSiteFile(relativePath, page.html);
}

for (const api of apiPayloads) {
  writeSiteFile(api.path.slice(1), `${JSON.stringify(api.body, null, 2)}\n`);
}

writeSiteFile("CNAME", "deflect.kineticgain.com\n");
writeSiteFile(
  "robots.txt",
  ["User-agent: *", "Allow: /", `Sitemap: ${baseUrl}/sitemap.xml`, ""].join("\n")
);
writeSiteFile(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((page) => `  <url><loc>${baseUrl}${page.path}</loc></url>`)
    .join("\n")}\n</urlset>\n`
);

console.log(`Prerendered ${pages.length} pages and ${apiPayloads.length} JSON endpoints to ${siteDir}`);
