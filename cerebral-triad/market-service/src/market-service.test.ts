import { MarketService } from './market-service';
import { ServiceConfig } from '@cosmos/cognitive-core-shared-libraries';
const cfg: ServiceConfig = { port:3006, serviceName:'market-service', triadType:'cerebral', serviceType:'M-1', environment:'test' };
describe('MarketService (M-1) — cerebral [8-1]', () => {
  it('reports healthy after init', async () => {
    const svc = new MarketService(cfg); await svc.initialize();
    expect(svc.getHealth().status).toMatch(/healthy|degraded/);
    await svc.shutdown?.();
  });
});
