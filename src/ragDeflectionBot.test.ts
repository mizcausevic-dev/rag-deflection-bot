import { describe, expect, it } from "vitest";

import { artifacts, deflectionLab, knowledgeLane, payload, summary } from "./services/ragDeflectionService";

describe("rag-deflection-bot", () => {
  it("summary exposes knowledge and deflection posture", () => {
    const result = summary();

    expect(result.articleCount).toBeGreaterThanOrEqual(4);
    expect(result.deflectionCount).toBeGreaterThanOrEqual(4);
    expect(result.recommendation).toContain("escalation boundary");
  });

  it("knowledge lane and deflection lab stay support-specific", () => {
    expect(knowledgeLane().some((item) => item.domain.toLowerCase().includes("billing"))).toBe(true);
    expect(deflectionLab().some((item) => item.ticket.toLowerCase().includes("sso"))).toBe(true);
    expect(artifacts().some((artifact) => artifact.path.includes("knowledge"))).toBe(true);
  });

  it("payload bundles the support operating surface", () => {
    const result = payload();

    expect(result.dashboard.articleCount).toBe(result.knowledgeLane.length);
    expect(result.deflectionLab.length).toBeGreaterThan(0);
    expect(result.artifacts.length).toBeGreaterThan(0);
    expect(result.verification.length).toBe(3);
  });
});
