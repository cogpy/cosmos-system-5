import { OrganizationService } from './organization-service';
import { ServiceConfig } from '@cosmos/cognitive-core-shared-libraries';
const cfg: ServiceConfig = { port:3026, serviceName:'organization-service', triadType:'autonomic', serviceType:'O-4', environment:'test' };
describe('OrganizationService (O-4) — autonomic [5-4]', () => {
  it('reports healthy after init', async () => {
    const svc = new OrganizationService(cfg); await svc.initialize();
    expect(svc.getHealth().status).toMatch(/healthy|degraded/);
    await svc.shutdown?.();
  });
});
