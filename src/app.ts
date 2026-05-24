import express from "express";

import { artifacts, deflectionLab, knowledgeLane, payload, summary, verification } from "./services/ragDeflectionService";
import { renderDeflectionLab, renderDocs, renderKnowledgeLane, renderOverview, renderVerification } from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5466);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/knowledge-lane", (_req, res) => res.type("html").send(renderKnowledgeLane()));
app.get("/deflection-lab", (_req, res) => res.type("html").send(renderDeflectionLab()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/knowledge-lane", (_req, res) => res.json(knowledgeLane()));
app.get("/api/deflection-lab", (_req, res) => res.json(deflectionLab()));
app.get("/api/knowledge-artifacts", (_req, res) => res.json(artifacts()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`RAG Deflection Bot listening on http://127.0.0.1:${port}`);
  });
}

export default app;
