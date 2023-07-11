import { setTimeout } from '@cloudflare/workers-types';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { middleware, publicProcedure, router } from '../trpc/stub';

const isInternalRequest = middleware(async (opts) => {
  const { ctx } = opts;
  const apiKey = ctx.req.headers.get('X-Api-Key');

  if (!apiKey) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Notion API Key is not properly set.' });
  }
  if (!ctx.checkApiKey(apiKey)) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid Notion API key.' });
  }

  return opts.next();
});

const internalProcedure = publicProcedure.use(isInternalRequest);

export const internalRouter = router({
  ping: internalProcedure.input(z.string()).query(async ({ input }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return `pong to ${input}! (Timestamp: ${new Date().toISOString()})`;
  }),
});
