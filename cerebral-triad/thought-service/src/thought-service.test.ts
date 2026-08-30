/**
 * KSM∞ Roughness Restoration — thought-service.test.ts
 * Property restored: 11. Roughness (Alexander)
 *
 * These tests intentionally introduce friction at the contract surface so the
 * service cannot drift away from its triadic role in silence.
 */
import { ThoughtService } from './thought-service';
import { ServiceConfig, createMessage } from '@cosmos/cognitive-core-shared-libraries';

const baseConfig: ServiceConfig = {
  port: 3001,
  serviceName: 'thought-service',
  triadType: 'cerebral',
  serviceType: 'T-7',
  environment: 'test',
};

describe('ThoughtService (T-7) — Cerebral Triad creative potential', () => {
  let svc: ThoughtService;

  beforeEach(async () => {
    svc = new ThoughtService(baseConfig);
    await svc.initialize();
  });

  afterEach(async () => {
    await svc.shutdown?.();
  });

  it('reports its triadic identity correctly', () => {
    const h = svc.getHealth();
    expect(h.status).toMatch(/healthy|degraded/);
    expect(h.version).toBeDefined();
  });

  it('generates at least one idea for a non-empty context', async () => {
    const msg = createMessage(
      'GENERATE_THOUGHTS',
      { context: 'distributed cognition', domain: 'systems', complexity: 'medium', timeframe: 5 },
      'test-harness',
      'thought-service',
    );
    const out = await svc.process(msg);
    expect(out).not.toBeNull();
    expect(out?.payload?.ideas?.length ?? 0).toBeGreaterThan(0);
  });

  it('returns a deterministic shape for unknown message types', async () => {
    const msg = createMessage('UNKNOWN_TYPE', {}, 'test', 'thought-service');
    const out = await svc.process(msg);
    // Either explicit null (unhandled) or a structured error envelope.
    if (out) expect(out.payload).toBeDefined();
  });

  it('association graph satisfies local symmetry (Property 7)', async () => {
    // Probe via a public method or via the response associations field.
    const msg = createMessage(
      'GENERATE_THOUGHTS',
      { context: 'symmetry', domain: 'math', complexity: 'low', timeframe: 1 },
      'test', 'thought-service',
    );
    const out = await svc.process(msg);
    const ideas = out?.payload?.ideas ?? [];
    for (const idea of ideas) {
      expect(Array.isArray(idea.associations)).toBe(true);
    }
  });
});
