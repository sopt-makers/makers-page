import { Block } from 'notion-types';
import { parsePageId } from 'notion-utils';
import { z } from 'zod';

import { Context } from '../trpc/context';
import { internalProcedure, publicProcedure, router } from '../trpc/stub';

export const recruitRouter = router({
  page: internalProcedure.input(z.object({ id: z.string().optional() })).query(async ({ ctx, input }) => {
    const pageId = parsePageId(input.id ?? ctx.recruit.rootPageId);
    if (!pageId) {
      return { status: 'NOT_FOUND' } as const;
    }

    const allowedPages = (await ctx.kv.get(kvKeys.allowedPages(), 'json')) as string[] | null;
    if (!allowedPages) {
      return { status: 'NEED_REFRESH' } as const;
    }

    if (!allowedPages.includes(pageId)) {
      return { status: 'NOT_FOUND' } as const;
    }

    const validated = pageRecordValidator.safeParse(await ctx.kv.get(kvKeys.page(pageId), 'json'));
    if (!validated.success) {
      return { status: 'NEED_REFRESH' } as const;
    }

    const { blockMap, ...pageData } = validated.data;

    const blockMapSigned = await ctx.recruit.notionClient.SignFileUrls(blockMap);

    return { status: 'SUCCESS', ...pageData, blockMap: blockMapSigned } as const;
  }),
  refresh: publicProcedure.mutation(async ({ ctx }) => {
    console.log('Start Refetching...');

    await refetchPages(ctx);
    return 'refresh!';
  }),
});

type PathFragment = {
  id: string;
  title: string;
};

const pageRecordValidator = z.object({
  version: z.literal(1),
  id: z.string(),
  title: z.string().nullable(),
  path: z.array(z.custom<PathFragment>()),
  blockMap: z.custom<Record<string, Block>>(),
});
type PageRecord = z.infer<typeof pageRecordValidator>;

const kvKeys = {
  page: (pageId: string) => `recruit:page:${pageId}`,
  allowedPages: () => 'recruit:allowdPages',
};

async function refetchPages(ctx: Context) {
  const allowedPages: string[] = [];

  async function traverse(pageId: string, path: PathFragment[] = []) {
    const { blockMap, title, pageBlock } = await ctx.recruit.notionClient.getPage(pageId);

    const childPageIds: string[] = [];
    function findChildPages(block: Block) {
      for (const childId of block.content ?? []) {
        const child = blockMap[childId];
        if (!child || childId === pageId) {
          continue;
        }
        if (child.type === 'page') {
          childPageIds.push(child.id);
          continue;
        }
        findChildPages(child);
      }
    }
    findChildPages(pageBlock);

    console.log('Refetching:', pageId, '->', childPageIds);

    const newPath: PathFragment[] = [...path, { id: pageId, title: title ?? '' }];

    const childTraversePromises = childPageIds.map(async (id) => traverse(id, newPath));
    await Promise.all(childTraversePromises);

    const record: PageRecord = {
      version: 1,
      id: pageId,
      title,
      path: newPath,
      blockMap,
    };
    await ctx.kv.put(kvKeys.page(pageId), JSON.stringify(record));

    allowedPages.push(pageId);
  }

  await traverse(parsePageId(ctx.recruit.rootPageId));
  await ctx.kv.put(kvKeys.allowedPages(), JSON.stringify(allowedPages));
}
