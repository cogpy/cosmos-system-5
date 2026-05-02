# KSM∞ Meta-Level Cycle (nn²) — Evolving Cosmos's Weakness-Detection

> Domain: `cosmos-system-5` · Iteration 2 · Meta-level: **nn²** · Temporal scale: `meso`
>
> At `nn²` the 12-step cycle is no longer applied to *services*; it is applied to **the cycle itself**. Each STEP becomes a center.

## The Defect Discovered at nn

The `nn` cycle revealed that all 18 services scored uniformly **0.40**. A uniform reading is a **detection failure**, not an environmental fact. A healthy system has variance; `0.40 ± 0.00` means the metric is **insensitive**, not that the system is flat.

This is the canonical `nn²` finding: **DETECT (Step 3) is operating with too coarse a probe.** Five binary properties (skeleton, depth, dockerfile, tests, readme) mask the real differentiation between, e.g., `Autonomic-StateManagement-S8` (868 LOC, complex) and `Cerebral-Thought-T7` (221 LOC, sparse).

## The 12 Steps Applied to the Steps

| Meta-Step | Object-Step Targeted | Defect | Mutation |
|-----------|----------------------|--------|----------|
| M-01 OBSERVE | Step 1 (Observe whole) | Only counts files; ignores commit cadence, branch sprawl, CI history. | Add **temporal observation**: weeks-since-last-commit per service. |
| M-02 DISCOVER | Step 2 (Strong Centres) | Centre = "service exists". Too cheap. | Centre = service + its event subscribers + its consumers (graph closure). |
| M-03 DETECT | Step 3 (Find weakness) | Five binary properties → 32 buckets, but only 1 is realised (uniform 0.40). | Replace with **8-dimension vector**: `[skeleton, impl_depth_log, doc_density, test_coverage_pct, prom_metrics, event_handlers, consumer_count, healthcheck_truth]`. Coherence = geometric mean. |
| M-04 THINK | Step 4 (Interlock) | Only inspects siblings within triad. Misses cross-triad coupling (T-7 → M-1 metrics). | Use the **API-gateway service registry** as the interlock graph. |
| M-05 DISCOVER | Step 5 (Roughness vs pathology) | Cannot distinguish "missing on purpose" from "missing by neglect". | Annotate each absent property with `intent: defer | wontfix | bug | lib`. |
| M-06 INSPECT | Step 6 (Metrics) | No baseline drift detection. | Persist `state.json` history; compute Δscore per cycle. |
| M-07 MUTATE | Step 7 (Apply transformation) | Hand-written patches per service. | Promote patches to a **scaffold generator** (`tools/scaffold-service.ts`) that emits Dockerfile + README + test from a service-manifest YAML. |
| M-08 CREATE | Step 8 (Echoes) | Patches not echoed across siblings automatically. | Add a `cosmos-doctor` CLI that walks all 18 services and applies missing template artefacts. |
| M-09 OBSERVE | Step 9 (Not-Separateness) | No verification the patch landed. | Add an **invariant check**: `cosmos-doctor verify` re-runs `validate-polarity-structure.js` plus `check-service-grip` (test count > 0, Dockerfile present, /metrics responds). |
| M-10 OBSERVE | Step 10 (Re-observe whole) | Single snapshot. | Schedule weekly snapshot, store under `.ksm-infinity/cosmos-snapshots/YYYY-WW.json`. |
| M-11 CREATE | Step 11 (Memory echo) | Memory is local to one operator. | Persist iteration history to a `KSM_HISTORY.md` in the repo. |
| M-12 ORCHESTRATE | Step 12 (Cycle reconnects) | Manual re-run. | Wire `meta-cycle` into the `production-pipeline.yml` GitHub Actions on a `cron: '0 4 * * 1'` schedule (weekly Monday 04:00). |

## The New Detection Vector (Mutation M-03 made concrete)

```python
# Replaces compute_coherence(center_data) for cosmos-system-5
def cosmos_coherence(center):
    dims = {
        "skeleton":         1.0 if center["skeleton"]            else 0.0,
        "impl_depth":       min(1.0, math.log2(center["loc"]+1) / 10),
        "doc_density":      min(1.0, center["readme_kb"] / 4.0),
        "test_coverage":    center["coverage_pct"] / 100.0,
        "prom_metrics":     1.0 if center["metrics_endpoint"]    else 0.0,
        "event_handlers":   min(1.0, center["event_handlers"]/3),
        "consumer_count":   min(1.0, center["consumers"]/3),
        "healthcheck_truth":1.0 if center["health_real"]         else 0.0,
    }
    # Geometric mean penalises any zero dimension hard.
    nonzero = [v for v in dims.values() if v > 0]
    if len(nonzero) < len(dims):  # any zero → coherence ≤ floor
        return min(0.40, sum(dims.values())/len(dims))
    import functools, operator
    return functools.reduce(operator.mul, dims.values()) ** (1/len(dims))
```

This vector explains *why* uniform 0.40 was not a true reading: under the binary scheme, every service that lacked metrics+tests+docs collapses to the same value. Under the geometric-mean scheme, T-7 (221 LOC) and Autonomic-StateManagement-S8 (868 LOC) land at distinguishably different scores even before patches.

## Result of nn² Cycle

The Python engine's `meta-cycle` symbolic step records:
- `meta_level: nn → nn²` ✓
- `temporal_scale: meso` (unchanged at this iteration)

The substantive mutation is the new `cosmos_coherence` function and the `cosmos-doctor` CLI sketch (see `../patches/tools/cosmos-doctor.ts`). The next-level (nn⁴) target is to evolve **the mechanism that decides when meta-evolution is needed** — i.e., a meta-detector that watches Δscore for stagnation.
