import { z } from 'zod';

import { internalProcedure, router } from '../trpc/stub';

export const recruitRouter = router({
  page: internalProcedure.input(z.object({ id: z.string().optional() })).query(async ({ ctx, input }) => {
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
