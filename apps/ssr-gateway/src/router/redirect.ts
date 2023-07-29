import { z } from 'zod';

import { internalProcedure, router } from '../trpc/stub';

export const redirectRouter = router({
  redirectLink: internalProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const target = await ctx.kv.get(`redirect:${input}`, 'text');

    return target;
  }),
});
