import Fastify from 'fastify';
import { setupGracefulShutdown } from '@/setup/gracefulShutdown';
import type { Dependencies } from '@/types';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { FastifyServerOptions } from 'fastify';

export function createServer(deps: Dependencies) {
  return async (opts?: FastifyServerOptions) => {
    const app = Fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

    setupGracefulShutdown(app)(deps);

    return app;
  };
}
