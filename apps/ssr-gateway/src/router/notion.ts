import { z } from 'zod';

import { internalProcedure, router } from '../trpc/stub';

export const notionRouter = router({
  getPage: internalProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const { getBlocks } = ctx.customPageNotionClient;

    const blocks = await getBlocks(input.id);

    return {
      blocks,
    };
  }),
});
