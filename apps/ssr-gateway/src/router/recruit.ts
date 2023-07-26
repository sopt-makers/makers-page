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

      const { value: cachedBlocks } = await ctx.kv.getWithMetadata(`recruit:cache:page:${pageId}`, 'json');
      if (cachedBlocks) {
        return { cacheHit: true, blocks: cachedBlocks as ModifiedBlock[] };
      }
      const { blocks, savedImageKeys } = await ctx.recruit.legacyNotionClient.getBlocks(pageId);

      await Promise.all([
        ctx.kv.put(`recruit:cache:page:${pageId}`, JSON.stringify(blocks)),
        ctx.kv.put(`recruit:image:${pageId}`, JSON.stringify(savedImageKeys)),
      ]);

      return { cacheHit: false, blocks };
    }),
  pageUnofficial: internalProcedure.input(z.object({ id: z.string().optional() })).query(async ({ ctx, input }) => {
    const pageId = input.id ?? ctx.env.RECRUIT_NOTION_PAGE_ID;

    const page = await ctx.recruit.notionClient.getPage(pageId);

    return page;
  }),
  invalidate: internalProcedure.mutation(async ({ ctx }) => {
    const { keys: cacheKeys } = await ctx.kv.list({ prefix: 'recruit:cache:' });
    const removeCachePromises = cacheKeys.map(async ({ name }) => ctx.kv.delete(name));

    const { keys: imageMetaKeys } = await ctx.kv.list({ prefix: 'recruit:image:' });
    const removeImagePromises = imageMetaKeys.map(async (kvKey) => {
      const imageKeys = (await ctx.kv.get(kvKey.name, 'json')) as string[];
      await ctx.image.delete(imageKeys ?? []);
      await ctx.kv.delete(kvKey.name);
    });
    await Promise.all([...removeCachePromises, ...removeImagePromises]);
  }),
});
