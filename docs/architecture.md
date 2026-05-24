# RAG Deflection Bot Architecture

`rag-deflection-bot` models retrieval-grounded support deflection as an operator control surface rather than a generic chatbot demo. It turns knowledge articles, deflection cases, artifact samples, and escalation posture into one support-oriented system.

## Core surfaces

- `src/app.ts`
  - Express application that serves both HTML routes and JSON payloads.
- `src/data/sampleDeflection.ts`
  - Knowledge articles, deflection cases, artifact references, and sample article text.
- `src/services/ragDeflectionService.ts`
  - Summary metrics and API-ready projections over the modeled support data.
- `src/services/render.ts`
  - Operator shell and the route-specific HTML views.

## Route model

- `/`
  - overview metrics and support-case snapshot
- `/knowledge-lane`
  - knowledge catalog plus artifact samples
- `/deflection-lab`
  - support cases with deflection and escalation outcomes
- `/verification`
  - operator validation statements
- `/docs`
  - architecture framing and role classification

## Design goal

The repo is designed to show that support automation needs:

- grounded knowledge assets
- freshness and health posture
- explicit escalation boundaries
- review of risky reply scenarios

That makes the RAG layer feel like support infrastructure rather than chatbot theater.
