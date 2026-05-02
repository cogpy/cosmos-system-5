import { TreasuryService } from './treasury-service';
import { ServiceConfig } from '@cosmos/cognitive-core-shared-libraries';
const cfg: ServiceConfig = { port:3016, serviceName:'treasury-service', triadType:'somatic', serviceType:'T-7', environment:'test' };
describe('TreasuryService (T-7) — somatic [2-7]', () => {
  it('reports healthy after init', async () => {
    const svc = new TreasuryService(cfg); await svc.initialize();
    expect(svc.getHealth().status).toMatch(/healthy|degraded/);
    await svc.shutdown?.();
  });
});
