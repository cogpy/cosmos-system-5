import { MotorControlService } from './motor-control-service';
import { ServiceConfig } from '@cosmos/cognitive-core-shared-libraries';
const cfg: ServiceConfig = { port:3011, serviceName:'motor-control-service', triadType:'somatic', serviceType:'M-1', environment:'test' };
describe('MotorControlService (M-1) — somatic [8-1]', () => {
  it('reports healthy after init', async () => {
    const svc = new MotorControlService(cfg); await svc.initialize();
    expect(svc.getHealth().status).toMatch(/healthy|degraded/);
    await svc.shutdown?.();
  });
});
