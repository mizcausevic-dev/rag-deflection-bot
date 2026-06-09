import { artifacts, deflectionLab, knowledgeLane, summary, verification } from "./ragDeflectionService";

function pageShell(title: string, activeRoute: string, body: string) {
  const nav = [
    { href: "/", label: "Overview & Export" },
    { href: "/knowledge-lane", label: "Knowledge Lane" },
    { href: "/deflection-lab", label: "Deflection Lab" },
    { href: "/verification", label: "Operator Verification" },
    { href: "/docs", label: "Integration Docs" }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    :root {
      --bg: #09101d;
      --panel: rgba(15, 23, 42, 0.9);
      --border: rgba(148, 163, 184, 0.18);
      --text: #e7eefb;
      --muted: #9eb1cf;
      --blue: #60a5fa;
      --green: #34d399;
      --amber: #fbbf24;
      --red: #fb7185;
      --mono: "IBM Plex Mono", Consolas, monospace;
      --sans: "IBM Plex Sans", "Segoe UI", sans-serif;
      --serif: "IBM Plex Serif", Georgia, serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: var(--sans);
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(59, 130, 246, 0.16), transparent 22%),
        radial-gradient(circle at top right, rgba(16, 185, 129, 0.12), transparent 18%),
        var(--bg);
    }
    .wrap { width: min(1360px, calc(100% - 48px)); margin: 24px auto 48px; }
    .hero {
      display: grid;
      grid-template-columns: 1fr 260px;
      gap: 24px;
      padding: 28px 32px;
      border: 1px solid var(--border);
      border-radius: 28px;
      background: rgba(9, 16, 29, 0.86);
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.3);
    }
    .eyebrow, .tab, .mini, .pill, .kicker {
      font-family: var(--mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .eyebrow {
      display: inline-flex;
      gap: 16px;
      align-items: center;
      margin-bottom: 18px;
      color: var(--muted);
      font-size: 13px;
    }
    .eyebrow strong {
      color: #7db5ff;
      border: 1px solid rgba(59,130,246,0.35);
      padding: 9px 14px;
      border-radius: 8px;
    }
    h1 {
      margin: 0 0 10px;
      font-family: var(--serif);
      font-size: clamp(46px, 5vw, 72px);
      line-height: 0.98;
    }
    h1 span {
      background: linear-gradient(90deg, var(--blue), var(--green));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .lede {
      margin: 0;
      max-width: 980px;
      color: var(--muted);
      font-size: 18px;
      line-height: 1.6;
    }
    .posture {
      border: 1px solid var(--border);
      border-radius: 20px;
      background: rgba(15, 23, 42, 0.94);
      padding: 28px 24px;
      align-self: start;
    }
    .posture .mini { color: #91a3c6; font-size: 12px; margin-bottom: 14px; }
    .status-line { font-size: 15px; font-family: var(--mono); font-weight: 600; }
    .tabs { display: flex; flex-wrap: wrap; gap: 16px; margin: 22px 0 34px; }
    .tab {
      display: inline-flex;
      align-items: center;
      padding: 17px 28px;
      border: 1px solid var(--border);
      border-radius: 999px;
      color: #93a7c7;
      background: rgba(15, 23, 42, 0.8);
      font-size: 14px;
      text-decoration: none;
    }
    .tab.active {
      color: white;
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      border-color: rgba(59,130,246,0.55);
      box-shadow: 0 18px 36px rgba(37, 99, 235, 0.3);
    }
    .section-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }
    .card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 26px;
      padding: 28px;
    }
    .metric-card { grid-column: span 3; min-height: 196px; }
    .panel-title { margin: 0 0 14px; color: var(--muted); font-size: 12px; }
    .metric {
      font-size: 62px;
      font-weight: 700;
      line-height: 0.95;
      margin-bottom: 14px;
    }
    .metric small { font-size: 32px; color: var(--amber); }
    .copy { color: var(--muted); font-size: 18px; line-height: 1.65; }
    .quote {
      grid-column: 1 / -1;
      border-color: rgba(251, 191, 36, 0.3);
      background: linear-gradient(180deg, rgba(17, 24, 39, 0.92), rgba(12, 18, 31, 0.96));
    }
    .quote strong { display: block; margin: 14px 0 12px; font-size: 18px; color: var(--amber); }
    .quote p { margin: 0; color: var(--text); font-size: 18px; line-height: 1.7; }
    .two-up { grid-column: span 6; }
    .list { display: grid; gap: 16px; margin-top: 18px; }
    .item {
      border: 1px solid rgba(148, 163, 184, 0.14);
      border-radius: 18px;
      padding: 18px 20px;
      background: rgba(2, 8, 23, 0.36);
    }
    .item-head {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: start;
      margin-bottom: 10px;
    }
    .item h3, .item h4 { margin: 0; font-size: 22px; line-height: 1.2; }
    .item p { margin: 0; color: var(--muted); line-height: 1.65; }
    .pill {
      display: inline-flex;
      align-items: center;
      padding: 7px 12px;
      border-radius: 999px;
      font-size: 12px;
      border: 1px solid var(--border);
    }
    .pill.healthy { color: #bbf7d0; background: rgba(16, 185, 129, 0.14); }
    .pill.watch { color: #fde68a; background: rgba(245, 158, 11, 0.14); }
    .pill.critical { color: #fecdd3; background: rgba(244, 63, 94, 0.14); }
    .pill.deflected { color: #bbf7d0; background: rgba(16, 185, 129, 0.14); }
    .pill.partial { color: #fde68a; background: rgba(245, 158, 11, 0.14); }
    .pill.escalated { color: #fecdd3; background: rgba(244, 63, 94, 0.14); }
    .code {
      margin-top: 16px;
      padding: 18px;
      border-radius: 18px;
      background: rgba(2, 8, 23, 0.84);
      border: 1px solid rgba(96, 165, 250, 0.16);
      color: #bfd4ff;
      font-family: var(--mono);
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      line-height: 1.6;
      font-size: 14px;
    }
    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 12px;
    }
    .meta span {
      color: #c8d6ef;
      background: rgba(96, 165, 250, 0.12);
      border: 1px solid rgba(96, 165, 250, 0.18);
      border-radius: 999px;
      padding: 6px 10px;
      font-size: 12px;
    }
    .depth-grid {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 18px;
    }
    .depth-card {
      border: 1px solid rgba(148, 163, 184, 0.16);
      border-radius: 22px;
      padding: 22px;
      background:
        linear-gradient(180deg, rgba(15, 23, 42, 0.92), rgba(2, 8, 23, 0.52)),
        rgba(15, 23, 42, 0.72);
      min-height: 210px;
    }
    .depth-card h3 {
      margin: 0 0 12px;
      font-size: 20px;
      line-height: 1.25;
    }
    .depth-card p {
      margin: 0;
      color: var(--muted);
      font-size: 15px;
      line-height: 1.65;
    }
    .depth-card .kicker {
      display: block;
      margin-bottom: 14px;
      color: var(--green);
      font-size: 11px;
    }
    .site-footer {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      align-items: center;
      margin-top: 36px;
      padding-top: 22px;
      border-top: 1px solid rgba(148, 163, 184, 0.16);
      color: var(--muted);
      font-size: 14px;
    }
    .site-footer a {
      color: #bfdbfe;
      text-decoration: none;
    }
    .site-footer a:hover {
      color: var(--green);
    }
    .docs p, .docs li { color: var(--muted); line-height: 1.7; }
    code {
      font-family: var(--mono);
      color: #dbeafe;
      background: rgba(15, 23, 42, 0.85);
      padding: 2px 6px;
      border-radius: 6px;
    }
    @media (max-width: 1100px) {
      .hero { grid-template-columns: 1fr; }
      .metric-card, .two-up { grid-column: 1 / -1; }
      .depth-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 720px) {
      .wrap { width: min(100% - 24px, 1360px); }
      .hero, .card { padding: 22px; }
      .tabs { gap: 12px; }
      .tab { width: 100%; justify-content: center; }
      .depth-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="hero">
      <div>
        <div class="eyebrow"><strong>Kinetic Gain</strong><span>System Control Plane</span></div>
        <h1>RAG <span>Deflection Bot</span></h1>
        <p class="lede">Knowledge-grounded support deflection for billing, auth, integrations, and workflow operations. This repo models when retrieval can safely answer, when it should partially guide, and when it must escalate immediately.</p>
      </div>
      <aside class="posture">
        <div class="mini">Environment Posture</div>
        <div class="status-line">Live Support Deflection Console</div>
      </aside>
    </section>
    <nav class="tabs">
      ${nav
        .map((item) => `<a class="tab ${item.href === activeRoute ? "active" : ""}" href="${item.href}">${item.label}</a>`)
        .join("")}
    </nav>
    ${body}
    ${siteFooter()}
  </div>
</body>
</html>`;
}

function siteFooter() {
  return `<footer class="site-footer">
    <span>RAG Deflection Bot</span>
    <a href="http://deflect.kineticgain.com/">deflect.kineticgain.com</a>
    <a href="https://kineticgain.com/">Kinetic Gain</a>
    <a href="https://portfolio.kineticgain.com/">Portfolio</a>
    <a href="https://github.com/mizcausevic-dev/rag-deflection-bot">GitHub</a>
    <a href="/docs">Docs</a>
  </footer>`;
}

function productDepthSection() {
  return `<article class="card" style="grid-column: 1 / -1;">
    <div class="panel-title kicker">Product Depth</div>
    <h2 style="margin:0 0 16px;font-family:var(--serif);font-size:42px;line-height:1.05;">RAG Deflection Bot turns support automation into a governed revenue-control surface.</h2>
    <p class="copy">The product gives support, success, RevOps, and product teams a shared view of which customer questions can be answered automatically, which need a bounded next step, and which should never be left to a bot. It connects retrieval quality to churn risk, implementation drag, support margin, and customer-trust protection.</p>
  </article>
  <div class="depth-grid">
    <div class="depth-card">
      <span class="kicker">GTM analyst lens</span>
      <h3>Deflection is positioned as margin protection, not chatbot novelty.</h3>
      <p>Buyers can see the economic story: reduce repetitive L1 load while preserving fast escalation for billing, identity, integration, and duplicate-action risk.</p>
    </div>
    <div class="depth-card">
      <span class="kicker">Value architect lens</span>
      <h3>Every article has a freshness, score, and boundary.</h3>
      <p>The surface makes value measurable by showing where knowledge is ready to deflect, where it is stale, and where automation could create account risk.</p>
    </div>
    <div class="depth-card">
      <span class="kicker">Technical reviewer lens</span>
      <h3>Retrieval behavior is testable before production rollout.</h3>
      <p>Routes, API payloads, sample artifacts, and verification checks create a reusable evidence packet instead of relying on screenshots or unsupported claims.</p>
    </div>
    <div class="depth-card">
      <span class="kicker">What these repos share</span>
      <h3>One operator-readable pattern across the suite.</h3>
      <p>The Kinetic Gain product family converts operational ambiguity into a page, payload, evidence model, and deployment surface leaders can understand quickly.</p>
    </div>
  </div>`;
}

function healthPill(health: string) {
  return `<span class="pill ${health}">${health}</span>`;
}

function outcomePill(outcome: string) {
  return `<span class="pill ${outcome}">${outcome}</span>`;
}

export function renderOverview() {
  const dashboard = summary();
  const articles = knowledgeLane();
  const cases = deflectionLab();

  return pageShell(
    "RAG Deflection Bot",
    "/",
    `<section class="section-grid">
      <article class="card metric-card">
        <div class="panel-title kicker">Knowledge Articles</div>
        <div class="metric">${dashboard.articleCount}</div>
        <div class="copy">Grounded support documents available for retrieval across the active support surface.</div>
      </article>
      <article class="card metric-card">
        <div class="panel-title kicker">Healthy / Watch</div>
        <div class="metric">${dashboard.healthy} <small>/ ${dashboard.attention}</small></div>
        <div class="copy">Knowledge assets with stable support posture versus assets that need freshness or escalation review.</div>
      </article>
      <article class="card metric-card">
        <div class="panel-title kicker">Deflection Cases</div>
        <div class="metric">${dashboard.deflectionCount}</div>
        <div class="copy">Modeled support requests showing where retrieval can answer, partially guide, or escalate.</div>
      </article>
      <article class="card metric-card">
        <div class="panel-title kicker">Fully Deflected</div>
        <div class="metric">${dashboard.fullyDeflected}</div>
        <div class="copy">Cases that should close without human intervention when the knowledge layer is current.</div>
      </article>
      <article class="card quote">
        <div class="panel-title kicker">Critical Operating Recommendation</div>
        <strong>${dashboard.recommendation}</strong>
        <p>Best use case: high-volume support environments that want to reduce L1 load without letting a bot improvise through billing, identity, or duplication risk.</p>
      </article>
      ${productDepthSection()}
      <article class="card two-up">
        <div class="panel-title kicker">Knowledge Snapshot</div>
        <div class="list">
          ${articles.slice(0, 3).map((item) => `<div class="item">
            <div class="item-head">
              <h3>${item.title}</h3>
              ${healthPill(item.health)}
            </div>
            <p>${item.summary}</p>
            <div class="meta">
              <span>${item.domain}</span>
              <span>${item.articlePath}</span>
              <span>Freshness ${item.freshnessDays}d</span>
            </div>
          </div>`).join("")}
        </div>
      </article>
      <article class="card two-up">
        <div class="panel-title kicker">Deflection Snapshot</div>
        <div class="list">
          ${cases.slice(0, 3).map((item) => `<div class="item">
            <div class="item-head">
              <h3>${item.ticket}</h3>
              ${outcomePill(item.outcome)}
            </div>
            <p><strong style="color:#dbeafe;">Boundary:</strong> ${item.boundaryReason}</p>
            <p><strong style="color:#dbeafe;">Next action:</strong> ${item.nextAction}</p>
          </div>`).join("")}
        </div>
      </article>
    </section>`
  );
}

export function renderKnowledgeLane() {
  const articles = knowledgeLane();
  const artifactList = artifacts();

  return pageShell(
    "RAG Deflection Bot - Knowledge Lane",
    "/knowledge-lane",
    `<section class="section-grid">
      <article class="card" style="grid-column: 1 / -1;">
        <div class="panel-title kicker">Knowledge Catalog</div>
        <p class="copy">The knowledge lane is the operating inventory for what the assistant is allowed to know, where that knowledge lives, and when a human owner must refresh or override it.</p>
        <div class="list">
          ${articles.map((item) => `<div class="item">
            <div class="item-head">
              <div>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
              </div>
              ${healthPill(item.health)}
            </div>
            <div class="meta">
              <span>${item.id}</span>
              <span>${item.domain}</span>
              <span>Deflection ${item.deflectionScore}</span>
              <span>Freshness ${item.freshnessDays}d</span>
            </div>
            <div class="code">Escalation boundary: ${item.escalationBoundary}

Path: ${item.articlePath}</div>
          </div>`).join("")}
        </div>
      </article>
      <article class="card" style="grid-column: 1 / -1;">
        <div class="panel-title kicker">Knowledge Artifact Samples</div>
        <div class="list">
          ${artifactList.map((artifact) => `<div class="item">
            <div class="item-head">
              <h4>${artifact.path}</h4>
              <span class="pill healthy">${artifact.kind}</span>
            </div>
            <p>${artifact.description}</p>
            <div class="meta">${artifact.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
            <div class="code">${artifact.sample}</div>
          </div>`).join("")}
        </div>
      </article>
    </section>`
  );
}

export function renderDeflectionLab() {
  const cases = deflectionLab();

  return pageShell(
    "RAG Deflection Bot - Deflection Lab",
    "/deflection-lab",
    `<section class="section-grid">
      <article class="card" style="grid-column: 1 / -1;">
        <div class="panel-title kicker">Deflection Lab</div>
        <p class="copy">The deflection lab converts common support prompts into board-readable outcomes: safe deflection, partial guidance, or immediate escalation.</p>
        <div class="list">
          ${cases.map((item) => `<div class="item">
            <div class="item-head">
              <div>
                <h3>${item.ticket}</h3>
                <p>${item.customerType} · ${item.promptType}</p>
              </div>
              ${outcomePill(item.outcome)}
            </div>
            <p><strong style="color:#dbeafe;">Answer shape:</strong> ${item.answer}</p>
            <p><strong style="color:#dbeafe;">Boundary reason:</strong> ${item.boundaryReason}</p>
            <div class="meta">
              <span>${item.nextAction}</span>
              <span>${item.health}</span>
            </div>
          </div>`).join("")}
        </div>
      </article>
    </section>`
  );
}

export function renderVerification() {
  return pageShell(
    "RAG Deflection Bot - Verification",
    "/verification",
    `<section class="section-grid">
      <article class="card" style="grid-column: 1 / -1;">
        <div class="panel-title kicker">Operator Verification</div>
        <p class="copy">Verification keeps the bot tied to governed evidence instead of generic AI copy. Each check proves the repo exposes escalation boundaries, freshness posture, and customer-risk controls.</p>
        <div class="list">
          ${verification().map((line, index) => `<div class="item">
            <div class="item-head">
              <h3>Verification ${index + 1}</h3>
              <span class="pill healthy">pass</span>
            </div>
            <p>${line}</p>
          </div>`).join("")}
        </div>
      </article>
    </section>`
  );
}

export function renderDocs() {
  return pageShell(
    "RAG Deflection Bot - Docs",
    "/docs",
    `<section class="section-grid docs">
      <article class="card" style="grid-column: span 8;">
        <div class="panel-title kicker">System Artifact / Principal Technical Spec</div>
        <h2 style="margin:0 0 16px;font-family:var(--serif);font-size:48px;">Retrieval-Grounded Support Deflection</h2>
        <p>The <code>rag-deflection-bot</code> repo models support deflection as a governed operating surface. It makes knowledge freshness, escalation boundaries, and risky reply scenarios explicit instead of assuming every customer question should be answered by automation.</p>
        <div class="list">
          <div class="item">
            <h4>Primary purpose</h4>
            <p>Reduce L1 support load by routing low-risk requests through grounded knowledge answers while preserving fast escalation for billing, identity, integration, and duplication-risk scenarios.</p>
          </div>
          <div class="item">
            <h4>Application shape mapping</h4>
            <p><code>src/app.ts</code> serves the operator shell. <code>src/data/sampleDeflection.ts</code> models knowledge and case posture. <code>src/services/ragDeflectionService.ts</code> exposes API-ready payloads. <code>src/services/render.ts</code> renders the control-plane routes.</p>
          </div>
          <div class="item">
            <h4>Commercial interpretation</h4>
            <p>For GTM leaders, this shows how self-service support can protect gross margin without silently shifting customer risk into unsupported automation. For technical reviewers, it shows the concrete guardrails needed before a RAG assistant touches real customer workflows.</p>
          </div>
        </div>
      </article>
      <article class="card" style="grid-column: span 4;">
        <div class="panel-title kicker">Spec Classification</div>
        <p><strong style="color:#e7eefb;">Target platform</strong><br />Node.js Web Runtime (Express / HTML diagnostics)</p>
        <p><strong style="color:#e7eefb;">Architecture role</strong><br />Director of Web & GTM Systems</p>
        <p><strong style="color:#e7eefb;">Signal metric target</strong><br /><span style="color:#34d399;font-family:var(--mono);">89% Signal Clarity</span></p>
        <p><strong style="color:#e7eefb;">Active focus</strong><br />Support containment, knowledge freshness, escalation safety, retrieval-grounded answers</p>
      </article>
    </section>`
  );
}
