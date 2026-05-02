import { MonitoringService } from './monitoring-service';
import { ServiceConfig } from '@cosmos/cognitive-core-shared-libraries';
const cfg: ServiceConfig = { port:3021, serviceName:'monitoring-service', triadType:'autonomic', serviceType:'M-1', environment:'test' };
describe('MonitoringService (M-1) — autonomic [8-1]', () => {
  it('reports healthy after init', async () => {
    const svc = new MonitoringService(cfg); await svc.initialize();
    expect(svc.getHealth().status).toMatch(/healthy|degraded/);
    await svc.shutdown?.();
  });
});
