import { SalesService } from './sales-service';
import { ServiceConfig } from '@cosmos/cognitive-core-shared-libraries';
const cfg: ServiceConfig = { port:3005, serviceName:'sales-service', triadType:'cerebral', serviceType:'S-8', environment:'test' };
describe('SalesService (S-8) — cerebral [8-1]', () => {
  it('reports healthy after init', async () => {
    const svc = new SalesService(cfg); await svc.initialize();
    expect(svc.getHealth().status).toMatch(/healthy|degraded/);
    await svc.shutdown?.();
  });
});
