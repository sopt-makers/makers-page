import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';

import { Context } from './context';

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

const isInternalRequest = middleware(async (opts) => {
  const { ctx } = opts;
  const apiKey = ctx.req.headers.get('X-Api-Key');

  if (!apiKey) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Internal API Key is not properly set.' });
  }
  if (!ctx.checkApiKey(apiKey)) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid Internal API key.' });
  }

  return opts.next();
});
export const internalProcedure = publicProcedure.use(isInternalRequest);
