import { OutputService } from './output-service';
import { ServiceConfig } from '@cosmos/cognitive-core-shared-libraries';
const cfg: ServiceConfig = { port:3014, serviceName:'output-service', triadType:'somatic', serviceType:'O-4', environment:'test' };
describe('OutputService (O-4) — somatic [5-4]', () => {
  it('reports healthy after init', async () => {
    const svc = new OutputService(cfg); await svc.initialize();
    expect(svc.getHealth().status).toMatch(/healthy|degraded/);
    await svc.shutdown?.();
  });
});
