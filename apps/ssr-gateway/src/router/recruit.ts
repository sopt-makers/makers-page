import { z } from 'zod';

import { ModifiedBlock } from '../notion';
import { internalProcedure, router } from '../trpc/stub';

export const recruitRouter = router({
  page: internalProcedure
    .input(
      z.object({
        id: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const pageId = input.id ?? ctx.env.RECRUIT_NOTION_PAGE_ID;

      const { value: cachedBlocks } = await ctx.kv.getWithMetadata(`cache:recruit:page:${pageId}`, 'json');
      if (cachedBlocks) {
        return { cacheHit: true, blocks: cachedBlocks as ModifiedBlock[] };
      }
      const blocks = await ctx.recruitNotionClient.getBlocks(pageId);
      await ctx.kv.put(`cache:recruit:page:${pageId}`, JSON.stringify(blocks));

      return { cacheHit: false, blocks };
    }),
  invalidate: internalProcedure.mutation(async ({ ctx }) => {
    const { keys } = await ctx.kv.list({
      prefix: 'cache:recruit:',
    });

    await Promise.all(keys.map(async ({ name }) => ctx.kv.delete(name)));
  }),
});
