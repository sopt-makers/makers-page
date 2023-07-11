import { ModifiedBlock } from '../notion';
import { internalProcedure, router } from '../trpc/stub';

export const recruitRouter = router({
  mainPage: internalProcedure.query(async ({ ctx }) => {
    const pageId = ctx.env.RECRUIT_NOTION_PAGE_ID;

    const { value: cachedBlocks } = await ctx.kv.getWithMetadata('cache:recruit:main', 'json');
    if (cachedBlocks) {
      return { cacheHit: true, blocks: cachedBlocks as ModifiedBlock[] };
    }
    const blocks = await ctx.recruitNotionClient.getBlocks(pageId);
    await ctx.kv.put('cache:recruit:main', JSON.stringify(blocks));

    return { cacheHit: false, blocks };
  }),
  invalidate: internalProcedure.mutation(async ({ ctx }) => {
    const { keys } = await ctx.kv.list({
      prefix: 'cache:recruit:',
    });

    await Promise.all(keys.map(async ({ name }) => ctx.kv.delete(name)));
  }),
});
