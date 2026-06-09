# RAG Deflection Bot

Retrieval-grounded support deflection control plane for billing, auth, integrations, and workflow questions. This repo treats support automation as an operator system with knowledge freshness, escalation boundaries, and case-by-case deflection posture.

- Live: `http://deflect.kineticgain.com/`
- Repo: `https://github.com/mizcausevic-dev/rag-deflection-bot`

## What it shows

- knowledge-lane modeling for support articles and retrieval readiness
- deflection-lab cases showing deflect, partial, and escalate outcomes
- concrete knowledge artifacts instead of vague bot claims
- operator verification for grounded support automation

## What this product does

RAG Deflection Bot turns support automation into a governed revenue-control surface. It shows which customer questions can be answered automatically, which questions need bounded guidance, and which questions should escalate before a bot creates billing, identity, integration, or duplicate-action risk.

For non-technical leaders, this is a support-margin and customer-trust product: reduce repetitive L1 load without letting automation improvise through sensitive account issues. For technical reviewers, it is an evidence model for retrieval quality, freshness posture, escalation boundaries, API payloads, and testable customer-support scenarios.

## What these repos have in common

This repo follows the Kinetic Gain pattern used across the current product estate:

- turn a messy operating problem into a named control plane
- expose the decision data as both UI and API-ready payloads
- connect business value, technical proof, and executive narrative in the same surface
- ship screenshots, docs, sample artifacts, and verification commands so the page is more than a static landing page

## Operating workflow

1. Model the knowledge lane with article health, freshness, deflection score, and escalation boundary.
2. Run support prompts through the deflection lab and classify each one as deflected, partial, or escalated.
3. Review the operator recommendation before launching or expanding automated support coverage.
4. Use the docs and API routes as a reusable packet for RevOps, support, product, and technical review.

## Screenshots

### Overview

![Overview proof](./screenshots/01-overview-proof.png)

### Knowledge Lane

![Knowledge lane proof](./screenshots/02-knowledge-lane-proof.png)

### Deflection Lab

![Deflection lab proof](./screenshots/03-deflection-lab-proof.png)

## Routes

- `/`
- `/knowledge-lane`
- `/deflection-lab`
- `/verification`
- `/docs`

## API

- `/api/dashboard/summary`
- `/api/knowledge-lane`
- `/api/deflection-lab`
- `/api/knowledge-artifacts`
- `/api/verification`
- `/api/sample`

## Local development

```powershell
cd rag-deflection-bot
npm install
npm run dev
```

Then open:

- `http://127.0.0.1:5466/`
- `http://127.0.0.1:5466/knowledge-lane`
- `http://127.0.0.1:5466/deflection-lab`
- `http://127.0.0.1:5466/verification`
- `http://127.0.0.1:5466/docs`

## Validation

```powershell
npm run verify
npm run prerender
npm run render:assets
```

## Documentation

- [docs/architecture.md](./docs/architecture.md)
- [docs/ORIGIN.md](./docs/ORIGIN.md)
