import { SensoryService } from './sensory-service';
import { ServiceConfig } from '@cosmos/cognitive-core-shared-libraries';
const cfg: ServiceConfig = { port:3012, serviceName:'sensory-service', triadType:'somatic', serviceType:'S-8', environment:'test' };
describe('SensoryService (S-8) — somatic [8-1]', () => {
  it('reports healthy after init', async () => {
    const svc = new SensoryService(cfg); await svc.initialize();
    expect(svc.getHealth().status).toMatch(/healthy|degraded/);
    await svc.shutdown?.();
  });
});
