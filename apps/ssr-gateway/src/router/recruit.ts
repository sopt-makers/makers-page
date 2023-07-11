import { internalProcedure, router } from '../trpc/stub';

export const recruitRouter = router({
  mainPage: internalProcedure.query(async ({ ctx }) => {
    const blocks = await ctx.recruitNotionClient.getBlocks(ctx.env.RECRUIT_NOTION_PAGE_ID);
    return blocks;
  }),
});
