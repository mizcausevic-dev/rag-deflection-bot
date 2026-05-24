import { deflectionCases, fileSamples, knowledgeArticles, knowledgeArtifacts } from "../data/sampleDeflection";

export function summary() {
  const healthy = knowledgeArticles.filter((item) => item.health === "healthy").length;
  const attention = knowledgeArticles.filter((item) => item.health !== "healthy").length;
  const deflected = deflectionCases.filter((item) => item.outcome === "deflected").length;

  return {
    articleCount: knowledgeArticles.length,
    healthy,
    attention,
    deflectionCount: deflectionCases.length,
    fullyDeflected: deflected,
    artifactCount: knowledgeArtifacts.length,
    recommendation:
      "Treat every support answer as a governed retrieval surface with an explicit escalation boundary, because the wrong RAG response can erase trust faster than a slow human escalation."
  };
}

export function knowledgeLane() {
  return knowledgeArticles;
}

export function deflectionLab() {
  return deflectionCases;
}

export function artifacts() {
  return knowledgeArtifacts.map((artifact) => ({
    ...artifact,
    sample: fileSamples[artifact.path]
  }));
}

export function verification() {
  return [
    "The repo treats support deflection as an operator system with escalation boundaries instead of a generic chatbot demo.",
    "Knowledge articles are modeled with freshness, health, and risk posture so retrieval quality stays visible.",
    "The deflection lab makes it obvious when support can safely answer, partially answer, or escalate immediately."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    knowledgeLane: knowledgeLane(),
    deflectionLab: deflectionLab(),
    artifacts: artifacts(),
    verification: verification()
  };
}
