# Thought Service (T-7) · Cerebral Triad

> **Neurological mapping**: Right Hemisphere — intuitive idea generation, pattern recognition, creative potential.
> **Polarity**: Sympathetic (event-driven, fight-or-flight cadence).
> **Dimension**: `[2-7]` — Potential / Treasury position in the `[[D-T]-[P-O]-[S-M]]` topology.

This service is the **creative-potential generator** of the Cosmos System 5 cognitive ennead. It receives `GENERATE_THOUGHTS` messages, traverses an internal idea-template + association graph, and emits ranked candidate ideas to the Processing Director (PD-2) for executive vetting.

## Endpoints

| Method | Path | Purpose | Consumer |
|--------|------|---------|----------|
| `GET`  | `/health`   | Real readiness (event-bus + KB load + uptime) | k8s/Docker, autonomic-monitoring |
| `GET`  | `/metrics`  | Prometheus exposition format | autonomic-monitoring (M-1) |
| `POST` | `/generate` | Generate ideas. Body: `{context, domain, complexity, timeframe}` | api-gateway, processing-director |

## Position in the Triadic Topology

```
              Cerebral Triad ([3] level)
              ─────────────────────────
                       │
   [2-7] Potential ────┤ ◀── this service (T-7, treasury position)
                       │     paired with PD-2 (development position)
                       │
   [5-4] Commitment ───┤
                       │
   [8-1] Performance ──┘
```

T-7 is the *treasury* of ideas — it stores potential. PD-2 is the *development* counterpart that draws from this treasury and routes to P-5.

## Local Development

```bash
npm --workspace cerebral-triad/thought-service install
npm --workspace cerebral-triad/thought-service run build
npm --workspace cerebral-triad/thought-service run start:dev
```

## Tests

```bash
npm --workspace cerebral-triad/thought-service test
```

Test invariants enforced (Alexander Property 11 — Roughness):

- Health endpoint returns `degraded` when Redis is unreachable.
- `/generate` returns at least one idea for any non-empty `context`.
- The idea-association graph is symmetric: if `A → B`, then `B` lists `A`.

## Container

```bash
docker build -f cerebral-triad/thought-service/Dockerfile -t cosmos/thought-service:dev .
docker run --rm -p 3001:3001 -e REDIS_URL=redis://event-bus:6379 cosmos/thought-service:dev
```

## Provenance

Generated and continuously evolved by `/ksm-infinity` (object-level `nn` cycle).
See `artifacts/nn-object/01_cycle_narrative_thought_T7.md` in the KSM∞ workspace
for the 12-step Alexander transformation log that produced this README.
