export type KnowledgeArticle = {
  id: string;
  title: string;
  domain: string;
  health: "healthy" | "watch" | "critical";
  freshnessDays: number;
  deflectionScore: number;
  escalationBoundary: string;
  articlePath: string;
  summary: string;
};

export type DeflectionCase = {
  ticket: string;
  customerType: string;
  promptType: string;
  outcome: "deflected" | "escalated" | "partial";
  health: "healthy" | "watch" | "critical";
  answer: string;
  boundaryReason: string;
  nextAction: string;
};

export type KnowledgeArtifact = {
  path: string;
  kind: string;
  description: string;
  tags: string[];
};

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: "KB-01",
    title: "Invoice download and billing history",
    domain: "Billing",
    health: "healthy",
    freshnessDays: 6,
    deflectionScore: 95,
    escalationBoundary: "Escalate only if invoice totals and ledger entries differ.",
    articlePath: "knowledge/billing/invoice-history.md",
    summary: "Covers where invoices live, how exports work, and when account specialists need to step in."
  },
  {
    id: "KB-02",
    title: "SSO login recovery",
    domain: "Auth",
    health: "watch",
    freshnessDays: 18,
    deflectionScore: 88,
    escalationBoundary: "Escalate when identity-provider metadata or domain claim mismatches are involved.",
    articlePath: "knowledge/auth/sso-login-recovery.md",
    summary: "Explains standard recovery flow for SSO users before support opens an access incident."
  },
  {
    id: "KB-03",
    title: "CRM sync troubleshooting",
    domain: "Integrations",
    health: "healthy",
    freshnessDays: 9,
    deflectionScore: 91,
    escalationBoundary: "Escalate when webhook replay fails or field mapping drift changes production data.",
    articlePath: "knowledge/integrations/crm-sync-troubleshooting.md",
    summary: "Guides support on mapping validation, sync health, and safe retry posture."
  },
  {
    id: "KB-04",
    title: "Workflow retry and job history",
    domain: "Workflows",
    health: "healthy",
    freshnessDays: 11,
    deflectionScore: 90,
    escalationBoundary: "Escalate when retries could duplicate customer-facing actions or billing events.",
    articlePath: "knowledge/workflows/retry-and-history.md",
    summary: "Shows how operators inspect job history and decide between retry, replay, or engineering escalation."
  }
];

export const deflectionCases: DeflectionCase[] = [
  {
    ticket: "How do I download last month's invoice PDF?",
    customerType: "Self-serve admin",
    promptType: "Billing retrieval",
    outcome: "deflected",
    health: "healthy",
    answer: "Point the user to Billing > History, explain PDF export steps, and confirm invoice dates are UTC.",
    boundaryReason: "No account discrepancy or payment failure was reported.",
    nextAction: "Close with article link and follow-up if totals look wrong."
  },
  {
    ticket: "Our SSO users are stuck in an Okta redirect loop.",
    customerType: "Enterprise admin",
    promptType: "Identity recovery",
    outcome: "partial",
    health: "watch",
    answer: "Guide through standard callback and browser checks, then collect IdP metadata revision if the loop persists.",
    boundaryReason: "Safe to deflect first, but tenant-specific SSO mismatch can require escalation.",
    nextAction: "Escalate if the second login attempt still loops after cache-cleared validation."
  },
  {
    ticket: "HubSpot contacts stopped syncing after we added a new field.",
    customerType: "Operations manager",
    promptType: "Integration health",
    outcome: "partial",
    health: "watch",
    answer: "Validate the field map, compare last successful sync timestamp, and inspect webhook replay posture.",
    boundaryReason: "Support can resolve mapping drift, but should not replay unsafe payloads without ops review.",
    nextAction: "Escalate if replay would mutate production records unexpectedly."
  },
  {
    ticket: "A workflow retried the same customer notice three times.",
    customerType: "Customer success lead",
    promptType: "Workflow replay",
    outcome: "escalated",
    health: "critical",
    answer: "Acknowledge the issue, stop self-serve retry guidance, and route to engineering with job history attached.",
    boundaryReason: "Further automated advice could increase duplicate customer impact.",
    nextAction: "Escalate immediately with replay IDs and outbound notification evidence."
  }
];

export const knowledgeArtifacts: KnowledgeArtifact[] = [
  {
    path: "knowledge/billing/invoice-history.md",
    kind: "Knowledge article",
    description: "Billing self-serve guide with invoice retrieval and escalation cues.",
    tags: ["Billing", "Deflection", "Support"]
  },
  {
    path: "knowledge/auth/sso-login-recovery.md",
    kind: "Knowledge article",
    description: "SSO recovery flow with identity escalation boundaries.",
    tags: ["Auth", "Enterprise", "Escalation"]
  },
  {
    path: "knowledge/integrations/crm-sync-troubleshooting.md",
    kind: "Knowledge article",
    description: "Integration repair flow for field mapping and sync health.",
    tags: ["Integrations", "CRM", "Ops"]
  },
  {
    path: "docs/evaluation-notes.md",
    kind: "Evaluation guide",
    description: "Criteria for deciding whether a reply should be deflected, partially deflected, or escalated.",
    tags: ["Evaluation", "RAG", "Support ops"]
  }
];

export const fileSamples: Record<string, string> = {
  "knowledge/billing/invoice-history.md": `# Invoice History

Use this article when a customer asks for:
- invoice PDF downloads
- billing-history exports
- invoice date confirmation

Escalate only when ledger totals do not match the visible invoice.`,
  "knowledge/auth/sso-login-recovery.md": `# SSO Login Recovery

Support can guide:
- callback URL checks
- browser/session reset
- domain-claim confirmation

Escalate if IdP metadata or certificate posture is unclear.`,
  "knowledge/integrations/crm-sync-troubleshooting.md": `# CRM Sync Troubleshooting

Verify:
- last successful sync
- field mapping changes
- webhook delivery posture

Do not replay unsafe payloads without approval.`,
  "docs/evaluation-notes.md": `# Evaluation Notes

- Deflect when the answer is documented and low-risk.
- Partially deflect when the customer can take the next safe step before escalation.
- Escalate when financial, identity, or duplication risk is present.`
};
