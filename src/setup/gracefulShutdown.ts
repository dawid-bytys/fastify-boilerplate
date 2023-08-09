import { SIGNALS } from '@/constants';
import type { Dependencies } from '@/types';
import type { FastifyInstance } from 'fastify';

export function setupGracefulShutdown(app: FastifyInstance) {
  return (deps: Dependencies) => {
    for (const signal of SIGNALS) {
      process.on(signal, () => {
        app.log.info(`Received ${signal}, shutting down...`);
        app.close().finally(() => {
          app.log.info('Server closed!');
          process.exit(0);
        });
      });
    }
  };
}
