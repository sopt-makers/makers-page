import { z } from 'zod';

import { internalProcedure, publicProcedure, router } from '../trpc/stub';

export const recruitRouter = router({
  page: internalProcedure.input(z.object({ id: z.string().optional() })).query(async ({ ctx, input }) => {
    const pageId = input.id ?? ctx.env.RECRUIT_NOTION_PAGE_ID;

    const page = await ctx.recruit.notionClient.getPage(pageId);

    return page;
  }),
  refresh: publicProcedure.mutation(async ({}) => {
    return 'refresh!';
  }),
});
